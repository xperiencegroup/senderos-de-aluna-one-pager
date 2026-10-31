import masterplanImage from "@/assets/images/materplan-background.jpg";
import formaBackground from "@/assets/images/forma-plano-conjunto.svg";
import FillButton from "@/components/fill-button";
import ClickIcon from "@/assets/icons/components/click-icon";
import AlunaIcon from "@/assets/icons/components/aluna-icon";
import { useSearchParams } from "react-router";

/*
 * Móvil (< lg): el masterplan va completo arriba (sin recorte) y abajo
 * un bloque naranja con esquinas redondeadas que lo enmarca.
 * La forma SVG solo se usa en desktop.
 */
export default function PlanoConjunto() {
  const [, setSearchParams] = useSearchParams();

  return (
    <div
      id="plano"
      className="flex relative w-full h-[min(100svh,56vw)] min-h-[620px] items-end max-lg:flex-col max-lg:items-stretch max-lg:h-auto max-lg:min-h-0 max-lg:bg-impulso"
    >
      <img
        src={masterplanImage}
        alt="Masterplan de Senderos de Aluna"
        className="absolute inset-0 w-full h-full object-cover object-top max-lg:relative max-lg:inset-auto max-lg:h-[calc(31vw+32px)]"
      />

      <div className="relative flex flex-col w-full h-[513px] justify-end items-center overflow-visible max-lg:h-auto max-lg:-mt-[32px] max-lg:rounded-t-[32px] max-lg:bg-impulso">
        {/* fondo con forma (solo desktop) */}
        <img
          src={formaBackground}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-full w-full select-none max-lg:hidden"
        />

        <div className="flex flex-col relative min-h-[270px] justify-center items-center gap-[24px] px-[20px] py-[30px] max-lg:min-h-0 max-lg:pt-[40px] max-lg:pb-[56px]">
          <h2 className="hero-2 text-center text-beige uppercase max-md:text-[24px]">
            <span className="font-semibold">Regístrate y conoce</span>
            <br />
            <span className="font-bold italic">
              los detalles del plano de conjunto
            </span>
          </h2>

          <div>
            <FillButton
              Icon={ClickIcon}
              gap={15}
              onClick={() => setSearchParams({ form: "xperience" })}
            >
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