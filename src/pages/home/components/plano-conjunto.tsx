import masterplanImage from "@/assets/images/materplan-background.jpg";
import formaBackground from "@/assets/images/forma-plano-conjunto.svg";
import FillButton from "@/components/fill-button";
import ClickIcon from "@/assets/icons/components/click-icon";
import AlunaIcon from "@/assets/icons/components/aluna-icon";
import { useSearchParams } from "react-router";

export default function PlanoConjunto() {
  const [, setSearchParams] = useSearchParams();

  return (
    <div id="plano" className="flex relative w-full min-h-svh items-end">
      <img
        src={masterplanImage}
        alt="Masterplan de Senderos de Aluna"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative flex flex-col w-full h-[513px] justify-end items-center overflow-visible">
        {/* fondo con forma */}
        <img
          src={formaBackground}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-full w-full select-none"
        />

        <div className="flex flex-col relative h-[270px] justify-center items-center gap-[24px]">
          <p className="hero-2 text-center text-beige uppercase">
            <span className="font-semibold">Regístrate y conoce</span>
            <br />
            <span className="font-bold italic">
              los detalles del plano de conjunto
            </span>
          </p>

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
