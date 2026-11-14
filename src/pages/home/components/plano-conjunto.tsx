import FillButton from "@/components/fill-button";
import { useSearchParams } from "react-router";
import { track } from "@/lib/track";

// horizontal
import masterplanImageH from "@/assets/images/materplan-background.jpg";
// vertical
import masterplanImageV from "@/assets/images/materplan-background-v.jpg";

import formaBackground from "@/assets/images/forma-plano-conjunto.svg";
import ClickIcon from "@/assets/icons/components/click-icon";
import AlunaIcon from "@/assets/icons/components/aluna-icon";
import { TRACK } from "@/analytics/track.constants";

/*
 * Móvil (< lg): el masterplan va completo arriba (sin recorte) y abajo
 * un bloque naranja con esquinas redondeadas que lo enmarca.
 * La forma SVG solo se usa en desktop.
 */
export default function PlanoConjunto() {
  const [, setSearchParams] = useSearchParams();

  const onRecorrido = () => {
    track(TRACK.xperience.click, { origen: "plano" });

    // Siempre por el onboarding: con lead guardado se envía solo (asigna folio si falta) y entra a CX

    setSearchParams({ form: "xperience" }, { state: { origen: "plano" } });
  };

  return (
    <div
      id="plano"
      className="relative flex w-full items-end overflow-hidden lg:bg-[#1e2b1a]
    h-[max(100svh,800px)] max-md:h-auto max-md:min-h-[max(100svh,800px)]
    max-lg:flex-col max-lg:items-stretch max-lg:justify-end"
    >
      <div className="max-md:hidden absolute inset-x-0 top-0 bottom-[240px]">
        {/* imagen horizontal */}
        <img
          src={masterplanImageH}
          alt="Masterplan de Senderos de Aluna"
          className="hidden md:block size-full object-cover object-center max-md:h-auto"
        />
      </div>

      {/* imagen vertical, aparece < 1024px */}
      <div className="md:hidden relative grow w-full min-h-[115vw] overflow-hidden">
        <img
          src={masterplanImageV}
          alt="Masterplan de Senderos de Aluna"
          className="absolute inset-0 size-full object-cover object-center"
        />
      </div>

      <div className="relative flex flex-col w-full h-[513px] justify-end items-center overflow-visible max-lg:h-auto max-lg:-mt-[32px] max-lg:bg-impulso">
        {/* fondo con forma (solo desktop) */}
        <img
          src={formaBackground}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-full w-full select-none max-lg:hidden"
        />

        {/* forma curva */}
        <div className="lg:hidden absolute size-[70px] bg-impulso top-0 left-0 -translate-y-[100%] curva" />

        <div className="flex flex-col relative min-h-[270px] justify-center items-center gap-[24px] px-[20px] py-[30px] max-lg:min-h-0 max-lg:pt-[30px] max-lg:pb-[56px]">
          <h2 className="hero-2 text-center text-beige uppercase max-md:text-[24px]">
            <span className="font-semibold">Regístrate y conoce</span>
            <br />
            <span className="font-bold italic">
              los detalles del plano de conjunto
            </span>
          </h2>

          <div>
            <FillButton Icon={ClickIcon} gap={15} onClick={onRecorrido}>
              <span className="flex items-center justify-center gap-[15px]">
                <AlunaIcon className="size-[20px]" aria-hidden="true" />
                <span>Iniciar Recorrido Virtual</span>
              </span>
            </FillButton>
          </div>
        </div>
      </div>
    </div>
  );
}