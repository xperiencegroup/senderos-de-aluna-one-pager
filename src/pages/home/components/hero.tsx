import heroBg from "@/assets/images/hero-background.jpg";
import formaAluna from "@/assets/images/fondo-forma-hero.svg";
import senderosLogo from "@/assets/logos/main/logo_and_name.svg";

import FillButton from "@/components/fill-button";
import DownloadIcon from "@/assets/icons/components/download-icon";

export default function Hero() {
  return (
    <section id="inicio" className="relative flex h-full min-h-[768px] h-svh">
      {/* Fondo */}
      <img
        src={heroBg}
        alt="Imagen de Senderos de Aluna"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* Forma: ancho fijo, alto siempre 100% */}
      <div className="absolute inset-y-0 left-0 top-0 z-10 w-[927px] max-w-full">
        <img
          src={formaAluna}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-fill"
        />
      </div>

      {/* content */}
      <div className="absolute z-10 left-[5%] top-1/2 -translate-y-1/2 flex flex-col gap-[50px]">
        <img
          src={senderosLogo}
          alt="Logo Senderos de Aluna"
          className="w-full max-w-[237px]"
        />

        <div className="flex flex-col gap-[30px]">
          <h1 className="hero">
            <span className="text-proposito font-semibold">El camino</span>
            <br />
            <span className="text-impulso font-extrabold italic">
              donde se escribe
            </span>
            <br />
            <span className="text-proposito font-semibold">tu historia</span>
          </h1>

          {/* divider */}
          <div className="w-full max-w-[397px] h-[2.5px] bg-impulso" />

          <p className="subtitle text-impulso">
            Un espacio para echar raíces,
            <br />
            crear recuerdos y disfrutar cada
            <br />
            etapa de la vida.
          </p>

          <FillButton Icon={DownloadIcon} className="self-start">
            Descargar Brochure
          </FillButton>
        </div>
      </div>
    </section>
  );
}
