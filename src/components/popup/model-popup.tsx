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

type Caracteristica = Modelo["caracteristicas"]["nivel1"][number];

/* Tamaños escalables (1280 → 1440 → 1920) */
const levelCol =
  "flex flex-col w-[280px] min-[1440px]:w-[320px] min-[1920px]:w-[360px] h-fit items-center gap-[15px] min-[1440px]:gap-[20px]";
const planoBox =
  "relative flex justify-center items-center w-[210px] h-[349px] min-[1440px]:w-[250px] min-[1440px]:h-[415px] min-[1920px]:w-[290px] min-[1920px]:h-[480px]";

function Caracteristicas({ items }: { items: Caracteristica[] }) {
  return (
    <ul className="flex flex-col w-full gap-[5px] min-[1440px]:gap-[8px]">
      {items.map((c, index) => (
        <li
          key={index}
          className="flex items-center gap-[10px] text-icon min-[1440px]:text-[16px] min-[1920px]:text-[18px] text-origen font-medium"
        >
          <span className="flex shrink-0 size-[25px] min-[1440px]:size-[28px] min-[1920px]:size-[32px] justify-center items-center p-[6px] bg-proposito rounded-full">
            <img src={c.icon} alt="" aria-hidden="true" className="size-full" />
          </span>
          <span className="whitespace-pre-line">{c.label}</span>
        </li>
      ))}
    </ul>
  );
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
      className="fixed inset-0 z-[100] flex justify-center overflow-y-auto overscroll-contain bg-beige"
    >
      {/* close button: esquina superior derecha de la pantalla */}
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Cerrar"
        className="group fixed right-[30px] top-[30px] z-10 flex size-[44px] min-[1440px]:size-[52px] justify-center items-center bg-proposito border-2 border-horizonte drop-shadow rounded-full transition-colors duration-100 hover:cursor-pointer hover:opacity-60 active:opacity-100 active:bg-horizonte active:border-proposito"
      >
        <CloseIcon className="size-[20px] min-[1440px]:size-[24px] text-horizonte group-active:text-proposito" />
      </button>

      <div className="relative flex items-center min-h-full w-full max-w-[1366px] min-[1440px]:max-w-[1600px] min-[1920px]:max-w-[1800px] px-[83px] min-[1440px]:px-[100px] py-[54px]">
        {/* content */}
        <div className="flex w-full justify-between items-start gap-[40px]">
          {/* title, description and carrusel */}
          <div className="flex flex-col w-[584px] min-[1440px]:w-[680px] min-[1920px]:w-[800px] shrink-0 gap-[16px] min-[1440px]:gap-[20px]">
            {/* title */}
            <h2
              id="model-popup-title"
              className="hero font-semibold text-impulso"
            >
              {modelo.nombre} {modelo.numero}
            </h2>

            {/* description */}
            <p className="regular text-origen">{modelo.description}</p>

            {/* carrusel */}
            <div className="flex flex-col w-full gap-[16px] min-[1440px]:gap-[20px]">
              <div className="h-[351px] min-[1440px]:h-[420px] min-[1920px]:h-[500px] w-full shrink-0">
                <ModelCarousel
                  key={modelo.id}
                  ref={carouselRef}
                  slides={modelo.images}
                  onSlideChange={setIndex}
                />
              </div>

              <div className="w-full h-[138px] min-[1440px]:h-[158px] min-[1920px]:h-[178px]">
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
          <div className={levelCol}>
            <h3 className="subtitle font-bold italic text-impulso">
              Primer Nivel:
            </h3>

            <div className={planoBox}>
              <img
                src={modelo.planos.nivel1.src}
                alt={modelo.planos.nivel1.alt}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>

            <Caracteristicas items={modelo.caracteristicas.nivel1} />
          </div>

          {/* Segundo Nivel */}
          <div className={levelCol}>
            <h3 className="subtitle font-bold italic text-impulso">
              Segundo Nivel:
            </h3>

            <div className={planoBox}>
              <img
                src={modelo.planos.nivel2.src}
                alt={modelo.planos.nivel2.alt}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>

            <Caracteristicas items={modelo.caracteristicas.nivel2} />

            <div className="flex h-[78px] justify-center items-center">
              <FillButton
                Icon={DownloadIcon}
                variant="proposito"
                className="whitespace-nowrap text-proposito border-proposito"
              >
                Descargar Ficha Técnica
              </FillButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}