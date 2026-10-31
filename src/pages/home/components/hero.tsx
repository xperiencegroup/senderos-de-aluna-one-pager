import heroBg from "@/assets/images/hero-background.jpg";
import formaAluna from "@/assets/images/fondo-forma-hero.svg";
import senderosLogo from "@/assets/logos/main/logo_and_name.svg";

import FillButton from "@/components/fill-button";
import DownloadIcon from "@/assets/icons/components/download-icon";
import folleto from "@/assets/fichas/Senderos de Aluna _ Brochure comercial.pdf";
import { track } from "@/lib/track";

/*
 * Móvil (< lg): la foto pasa a ser un banner arriba (con esquina
 * redondeada, eco de la forma) y el contenido va abajo sobre beige.
 * Todas las clases móviles usan max-lg: / max-md:, desktop no cambia.
 */
export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex h-full min-h-[768px] h-svh max-lg:flex-col max-lg:h-auto max-lg:min-h-0"
    >
      {/* Fondo */}
      <img
        src={heroBg}
        alt="Imagen de Senderos de Aluna"
        className="absolute inset-0 z-0 h-full w-full object-cover max-lg:relative max-lg:inset-auto max-lg:mt-[74px] max-lg:h-[42svh] max-lg:min-h-[260px] max-lg:rounded-br-[100px]"
      />

      {/* Forma: ancho fijo, alto siempre 100% (solo desktop) */}
      <div className="absolute inset-y-0 left-0 top-0 z-10 w-[927px] min-[1440px]:w-[max(927px,60vw)] max-w-full max-lg:hidden">
        <img
          src={formaAluna}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-fill"
        />
      </div>

      {/* content */}
      <div className="absolute z-10 left-[5%] top-1/2 -translate-y-1/2 flex flex-col gap-[50px] max-lg:static max-lg:translate-y-0 max-lg:gap-[32px] max-lg:px-[20px] max-lg:pt-[40px] max-lg:pb-[56px] md:max-lg:px-[48px]">
        <img
          src={senderosLogo}
          alt="Logo Senderos de Aluna"
          className="w-full max-w-[237px] max-md:max-w-[180px]"
        />

        <div className="flex flex-col gap-[30px] max-md:gap-[24px]">
          <h1 className="hero min-[1440px]:text-[52px] min-[1920px]:text-[58px] max-md:text-[34px]">
            <span className="text-proposito font-semibold">El camino</span>
            <br />
            <span className="text-impulso font-bold italic">
              donde se escribe
            </span>
            <br />
            <span className="text-proposito font-semibold">tu historia</span>
          </h1>

          {/* divider */}
          <div className="w-full max-w-[397px] h-[2.5px] bg-impulso" />

          <p className="subtitle text-impulso max-md:text-[18px]">
            Un espacio para echar raíces,
            <br />
            crear recuerdos y disfrutar cada
            <br />
            etapa de la vida.
          </p>

          <FillButton
            href={folleto}
            download="Folleto comercial Senderos de Aluna.pdf"
            onClick={() => track("descargar_folleto")}
            Icon={DownloadIcon}
            className="self-start"
          >
            Descargar Folleto Comercial
          </FillButton>
        </div>
      </div>
    </section>
  );
}