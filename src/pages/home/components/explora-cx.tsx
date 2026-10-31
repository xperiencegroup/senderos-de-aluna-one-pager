import FillButton from "@/components/fill-button";

// images
import imageBackground from "@/assets/images/explora-cx-background.jpg";
import logoDecoration from "@/assets/icons/logo-decoration-explora.svg";

// icons
import AlunaIcon from "@/assets/icons/components/aluna-icon";
import ClickIcon from "@/assets/icons/components/click-icon";
import { useSearchParams } from "react-router";
import { track } from "@/lib/track";

export default function ExploraCX() {
  const [, setSearchParams] = useSearchParams();
  return (
    <div id="xperiencia" className="relative w-full min-h-svh overflow-hidden">
      {/* bg image */}
      <img
        src={imageBackground}
        alt="Parque Senderos de Aluna"
        className="absolute inset-0 w-full h-full object-cover"
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
            <span className="font-extrabold italic text-beige">
              Click and Xperience
            </span>
          </h2>

          {/* divider */}
          <div className="w-full max-w-[397px] bg-impulso h-[2.5px]" />

          {/* description */}
          <p className="regular text-beige max-lg:[text-shadow:0_1px_6px_rgba(0,0,0,0.45)]">
            Explora Senderos de ALUNA de forma integral desde donde estés.
            <br />
            Con Click and Xperience podrás ubicar el proyecto, conocer el plano
            de conjunto, recorrer los modelos de casa, revisar disponibilidades
            y descubrir sus amenidades a través de una experiencia mucho más
            inmersiva.
            <br />
            <br />
            Más que ver imágenes, podrás vivir el proyecto mediante recorridos
            virtuales y una navegación interactiva que te permitirá entender
            cada espacio y tomar una mejor decisión.
          </p>

          {/* button */}
          <div>
            <FillButton
              Icon={ClickIcon}
              gap={15}
              onClick={() => {
                track("iniciar_recorrido", { origen: "explora" });
                setSearchParams({ form: "xperience" });
              }}
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