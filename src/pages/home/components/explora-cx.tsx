import FillButton from "@/components/fill-button";

// images
import imageBackground from "@/assets/images/explora-cx-background.jpg";
import logoDecoration from "@/assets/icons/logo-decoration-explora.svg";

// icons
import AlunaIcon from "@/assets/icons/components/aluna-icon";
import ClickIcon from "@/assets/icons/components/click-icon";
import { useSearchParams } from "react-router";
import { track } from "@/lib/track";
import { getLeadGuardado } from "@/lib/leads";
import {
  CLICK_AND_XPERIENCE_URL,
  CX_DISPONIBLE,
} from "@/const/click-and-xperience";
import { TRACK } from "@/analytics/track.constants";

export default function ExploraCX() {
  const [, setSearchParams] = useSearchParams();

  const ORIGEN = "explora";

  const onRecorrido = () => {
    track(TRACK.xperience.click, { origen: ORIGEN });

    // Cuando la app esté lista y ya hay lead, va directo al recorrido
    if (getLeadGuardado() && CX_DISPONIBLE) {
      window.location.assign(CLICK_AND_XPERIENCE_URL);
      return;
    }

    setSearchParams({ form: "xperience" }, { state: { origen: ORIGEN } });
  };
  return (
    <div
      id="xperiencia"
      className="relative w-full portrait:min-h-[max(100svh,800px)] min-h-svh overflow-hidden"
    >
      {/* bg image */}
      <img
        src={imageBackground}
        alt="Parque Senderos de Aluna"
        className="absolute inset-0 w-full h-full object-cover object-top-left origin-top-left"
      />

      {/* logo decoration */}
      <img
        src={logoDecoration}
        alt="Decoración"
        className="absolute -right-40 -top-40 max-lg:hidden"
      />

      {/* content */}
      <div className="relative z-10 w-full h-full px-[84px] max-lg:px-[20px] md:max-lg:px-[48px]">
        <div className="flex flex-col w-full max-w-[800px] h-[408px] py-[52px] gap-[12px] max-lg:h-auto max-lg:py-[56px] max-lg:gap-[16px]">
          {/* title */}
          <h2 className="hero max-md:text-[34px]">
            <span className="font-semibold text-impulso">Explora</span>{" "}
            <br className="sm:hidden" />
            <span className="font-extrabold italic text-beige">
              Click and Xperience
            </span>
          </h2>

          {/* divider */}
          <div className="w-full max-w-[397px] bg-impulso h-[2.5px]" />

          {/* description */}
          <p className="regular text-beige max-lg:[text-shadow:0_1px_6px_rgba(0,0,0,0.45)]">
            Explora <span className="font-semibold">Senderos de ALUNA</span> de
            forma integral desde donde estés.
            <br />
            <br />
            Con <span className="font-semibold">Click and Xperience</span>{" "}
            podrás ubicar el proyecto, conocer el plano de conjunto, recorrer
            los modelos de casa y descubrir sus amenidades a través de una
            experiencia mucho más inmersiva.
            <br />
            <br />
            Más que ver imágenes, podrás vivir el proyecto mediante{" "}
            <span className="font-semibold">
              recorridos virtuales y una navegación interactiva
            </span>{" "}
            que te permitirá entender cada espacio y tomar una mejor decisión.
          </p>

          {/* button */}
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
