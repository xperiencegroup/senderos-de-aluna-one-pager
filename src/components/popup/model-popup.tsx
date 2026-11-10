import { useEffect, useRef, useState } from "react";
import { ModelCarousel } from "./model-carousel";

import FillButton from "../fill-button";
import ModelThumbnails from "./model-thumbnail";

import type { Modelo } from "@/data/modelos";
import type { EmblaCarouselType } from "embla-carousel";

import DownloadIcon from "@/assets/icons/components/download-icon";
import CloseIcon from "@/assets/icons/components/close-icon";
import { track } from "@/lib/track";

import { FICHAS_ACTIVAS } from "@/lib/leads";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { TRACK } from "@/analytics/track.constants";

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
  "flex flex-col w-[280px] min-[1440px]:w-[320px] min-[1920px]:w-[360px] h-fit items-center gap-[15px] min-[1440px]:gap-[20px] max-lg:w-full max-lg:max-w-[420px] max-lg:self-center";
const planoBox =
  "relative flex justify-center items-center aspect-[210/349] h-[min(349px,40svh)] min-[1440px]:h-[min(415px,42svh)] min-[1920px]:h-[min(480px,44svh)] max-lg:h-[349px] max-md:h-[300px]";

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
  useLockBodyScroll();

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

  const onFicha = () =>
    track(TRACK.modelos.fichaDownload, {
      id: modelo.id,
      origen: "modelo_popup",
    });

  return (
    /* overlay: clic fuera del panel cierra. En < lg el panel ocupa toda la pantalla */
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="model-popup-title"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex justify-center items-center p-[32px] min-[1920px]:p-[48px] bg-black/50 backdrop-blur-[2px] max-lg:p-0"
    >
      {/* close button < 1024px: esquina superior derecha del panel */}
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Cerrar"
        className="lg:hidden group absolute right-[24px] top-[24px] max-md:fixed max-md:right-[16px] max-md:top-[16px] z-10 flex size-[44px] min-[1440px]:size-[52px] justify-center items-center bg-proposito border-2 border-horizonte drop-shadow rounded-full transition-colors duration-100 hover:cursor-pointer hover:opacity-60 active:opacity-100 active:bg-horizonte active:border-proposito"
      >
        <CloseIcon className="size-[20px] min-[1440px]:size-[24px] text-horizonte group-active:text-proposito" />
      </button>

      {/* panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex items-center w-full max-w-[1366px] min-[1440px]:max-w-[1500px] min-[1920px]:max-w-[1700px] max-h-full max-lg:overflow-y-auto max-lg:overscroll-contain bg-beige px-[56px] min-[1440px]:px-[72px] py-[min(48px,5svh)] drop-shadow-xl max-lg:h-full max-lg:max-h-none max-lg:items-start max-lg:px-[20px] max-lg:pt-[72px] max-lg:pb-[48px] md:max-lg:px-[48px]"
      >
        {/* close button > 1024px: esquina superior derecha del panel */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Cerrar"
          className="max-lg:hidden group absolute right-[24px] top-[24px] max-md:fixed max-md:right-[16px] max-md:top-[16px] z-10 flex size-[44px] min-[1440px]:size-[52px] justify-center items-center bg-proposito border-2 border-horizonte drop-shadow rounded-full transition-colors duration-100 hover:cursor-pointer hover:opacity-60 active:opacity-100 active:bg-horizonte active:border-proposito"
        >
          <CloseIcon className="size-[20px] min-[1440px]:size-[24px] text-horizonte group-active:text-proposito" />
        </button>

        {/* content */}
        <div className="flex w-full justify-between items-start gap-[20px] lg:gap-[40px] max-lg:flex-col max-lg:items-stretch">
          {/* title, description and carrusel (cede ancho si el panel es angosto) */}
          <div className="flex flex-col w-[584px] min-[1440px]:w-[680px] min-[1920px]:w-[800px] max-lg:w-full min-w-0 shrink gap-[16px] min-[1440px]:gap-[20px]">
            {/* title */}
            <h2
              id="model-popup-title"
              className="hero font-semibold text-impulso max-md:text-[34px]"
            >
              {modelo.nombre} {modelo.numero}
            </h2>

            {/* description */}
            <p className="regular text-origen">{modelo.description}</p>

            {/* carrusel */}
            <div className="flex flex-col w-full gap-[16px] min-[1440px]:gap-[20px]">
              <div className="h-[min(351px,36svh)] min-[1440px]:h-[min(420px,38svh)] min-[1920px]:h-[min(500px,40svh)] max-lg:h-[351px] max-md:h-[240px] md:max-lg:h-[380px] w-full shrink-0">
                <ModelCarousel
                  key={modelo.id}
                  ref={carouselRef}
                  slides={modelo.images}
                  onSlideChange={setIndex}
                />
              </div>

              <div className="w-full h-[min(138px,14svh)] min-[1440px]:h-[min(158px,14svh)] min-[1920px]:h-[min(178px,15svh)] max-lg:h-[138px] max-md:h-[96px]">
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

          {/* botón descargar ficha cuando < 1024px */}
          {FICHAS_ACTIVAS && (
            <div className="lg:hidden flex h-[78px] justify-center items-center">
              <FillButton
                href={modelo.ficha}
                download={`Ficha técnica Aluna ${modelo.numero}.pdf`}
                onClick={onFicha}
                Icon={DownloadIcon}
                variant="proposito"
                className="whitespace-nowrap text-proposito border-proposito"
              >
                Descargar Ficha Técnica
              </FillButton>
            </div>
          )}

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

            {/* botón descargar ficha cuando > 1024px */}
            {FICHAS_ACTIVAS && (
              <div className="max-lg:hidden flex h-[78px] justify-center items-center">
                <FillButton
                  href={modelo.ficha}
                  download={`Ficha técnica Aluna ${modelo.numero}.pdf`}
                  onClick={onFicha}
                  Icon={DownloadIcon}
                  variant="proposito"
                  className="whitespace-nowrap text-proposito border-proposito"
                >
                  Descargar Ficha Técnica
                </FillButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
