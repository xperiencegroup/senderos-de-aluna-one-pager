import DownloadIcon from "@/assets/icons/components/download-icon";
import heroBg from "@/assets/images/hero-background.jpg";
// import formaAluna from "@/assets/icons/forma-aluna-hero.svg";
import formaAluna from "@/assets/images/fondo-forma-hero.svg";

import senderosLogo from "@/assets/logos/main/logo_and_name.svg";

export default function Hero() {
  return (
    <section id="nosotros" className="relative flex h-full min-h-[768px] h-svh">
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

          <button
            className="group relative self-start flex items-center cursor-pointer
            overflow-hidden
            [--icon-area:60px]
            rounded-[30px] border-2 border-impulso bg-beige drop-shadow
            transition-colors duration-300
            active:border-beige
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-impulso focus-visible:ring-offset-2 focus-visible:ring-offset-beige"
          >
            {/* Capa de relleno: crece de izquierda a derecha */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-0 rounded-full bg-impulso
              transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:w-[calc(100%-var(--icon-area))]
              group-active:w-full
              motion-reduce:transition-none"
            />

            {/* Texto */}
            <span
              className="button relative z-10 px-[20px] py-[10px] font-medium text-impulso
              transition-colors duration-300
              group-hover:text-beige group-active:text-beige"
            >
              Descargar Brochure
            </span>

            {/* Icono */}
            <span className="relative z-10 px-[20px]">
              <DownloadIcon
                className="size-[20px] text-impulso transition-colors duration-200
              group-active:text-beige group-active:delay-150"
              />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
