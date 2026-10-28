import { useEffect, useRef, useState } from "react";
import { ModelCarousel } from "./model-carousel";

import FillButton from "../fill-button";
import ModelThumbnails from "./model-thumbnail";

import type { Modelo } from "@/data/modelos";
import type { EmblaCarouselType } from "embla-carousel";

import DownloadIcon from "@/assets/icons/components/download-icon";
import CloseIcon from "@/assets/icons/components/close-icon";

type Props = {
  modelo: Modelo;
  onClose: () => void;
};

interface ModelCarouselHandle {
  scrollTo: (index: number, jump?: boolean) => void;
  scrollNext: () => void;
  scrollPrev: () => void;
  emblaApi: EmblaCarouselType | undefined;
}

export default function ModelPopup({ modelo, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const carouselRef = useRef<ModelCarouselHandle>(null);
  const [index, setIndex] = useState(0);

  // Bloquea el scroll del body mientras el popup está abierto
  useEffect(() => {
    const { overflow, paddingRight } = document.body.style;
    // evita el "salto" del layout al desaparecer la barra de scroll
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, []);

  // Escape cierra + el foco entra al popup y vuelve al elemento previo al cerrar
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="model-popup-title"
      className="fixed inset-0 z-[100] flex justify-center overflow-y-auto overscroll-contain bg-beige scale-90"
    >
      <div className="relative min-h-full w-full max-w-[1366px] px-[83px] py-[54px]">
        {/* close button */}
        <button
          onClick={onClose}
          className="group absolute right-[44px] top-[31px] flex size-[44px] justify-center items-center bg-proposito border-2 border-horizonte drop-shadow rounded-full transition-colors duration-100 hover:cursor-pointer hover:opacity-60 active:opacity-100 active:bg-horizonte active:border-proposito"
        >
          <CloseIcon className="size-[20px] text-horizonte group-active:text-proposito" />
        </button>

        {/* content */}
        <div className="flex w-full h-full items-center">
          <div className="flex w-full justify-between">
            {/* title, description and carrusel */}
            <div className="flex flex-col justify-between w-[584px] h-[655px] gap-[7px]">
              {/* title */}
              <h2 className="hero font-semibold text-impulso">
                {modelo.nombre} {modelo.numero}
              </h2>

              {/* descriotion */}
              <p className="regular text-origen">{modelo.description}</p>

              {/* carrusel */}
              <div className="flex flex-col w-full justify-between h-[505px]">
                <div className="h-[351px] w-full shrink-0">
                  <ModelCarousel
                    key={modelo.id}
                    ref={carouselRef}
                    slides={modelo.images}
                    onSlideChange={setIndex}
                  />
                </div>

                <div className="w-full h-[130px]">
                  <ModelThumbnails
                    key={modelo.id}
                    images={modelo.images}
                    selectedIndex={index}
                    onSelect={(i) => carouselRef.current?.scrollTo(i)}
                    onPrev={() => carouselRef.current?.scrollPrev()}
                    onNext={() => carouselRef.current?.scrollNext()}
                  />
                </div>
              </div>
            </div>

            {/* Primer nivel */}
            <div className="flex flex-col w-[280px] h-fit items-center gap-[15px]">
              <h3 className="subtitle font-bold italic text-impulso">
                Primer Nivel:
              </h3>

              <div className="relative flex justify-center items-center w-[210px] h-[349px]">
                <img
                  src={modelo.planos.nivel1.src}
                  alt={modelo.planos.nivel1.alt}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>

              {/* lista de características */}
              <ul className="flex flex-col w-full gap-[5px]">
                {modelo.caracteristicas.nivel1.map((c, index) => {
                  return (
                    <li
                      key={index}
                      className="flex items-center gap-[10px] text-icon text-origen font-medium"
                    >
                      <span className="flex size-[25px] justify-center items-center p-[6px] bg-proposito rounded-full">
                        <img src={c.icon} className="size-full" />
                      </span>
                      <span className="whitespace-pre-line">{c.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Segundo Nivel */}
            <div className="flex flex-col w-[280px] h-fit items-center gap-[15px]">
              <h3 className="subtitle font-bold italic text-impulso">
                Segundo Nivel:
              </h3>

              <div className="relative flex justify-center items-center w-[210px] h-[349px]">
                <img
                  src={modelo.planos.nivel2.src}
                  alt={modelo.planos.nivel2.alt}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>

              {/* lista de características */}
              <ul className="flex flex-col w-full gap-[5px]">
                {modelo.caracteristicas.nivel2.map((c, index) => {
                  return (
                    <li
                      key={index}
                      className="flex items-center gap-[10px] text-icon text-origen font-medium"
                    >
                      <span className="flex size-[25px] justify-center items-center p-[6px] bg-proposito rounded-full">
                        <img src={c.icon} className="size-full" />
                      </span>
                      <span className="whitespace-pre-line">{c.label}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="flex h-[78px] justify-center items-center">
                <FillButton
                  Icon={DownloadIcon}
                  variant="proposito"
                  className="w-full text-proposito border-proposito"
                >
                  Descargar Ficha Técnica
                </FillButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
