import backgroundImage from "@/assets/images/cotiza-casa-background.jpg";
import logoDecoration from "@/assets/icons/logo-decoration-cotiza.svg";

// icons
import FormularioCotiza from "@/components/formulario-cotiza";

export default function CotizaTuCasa() {
  return (
    <div id="cotizador" className="relative w-full min-h-svh overflow-hidden max-lg:min-h-0">
      {/* decoration */}
      <img
        src={logoDecoration}
        alt=""
        aria-hidden="true"
        className="absolute -bottom-4 -left-24 scale-115 max-lg:hidden"
      />

      {/* conoce el proyecto */}
      <div className="flex gap-[80px] bg-beige max-lg:flex-col-reverse max-lg:gap-0">
        <div className="flex flex-col justify-center items-center w-full min-h-svh py-[34px] px-[30px] max-lg:min-h-0 max-lg:px-[20px] max-lg:pt-[40px] max-lg:pb-[56px] md:max-lg:px-[48px]">
          <div className="flex flex-col justify-between w-full max-w-[620px] min-[1440px]:max-w-[700px] h-full max-h-[660px] pt-[24px] bg-beige max-lg:max-h-none max-lg:justify-start max-lg:gap-[24px] max-lg:pt-0">
            {/* title */}
            <h2 className="hero-2 text-center text-impulso max-md:text-[30px]">
              <span className="font-semibold">Cotiza</span>{" "}
              <span className="font-bold italic">tu casa</span>
            </h2>

            {/* subtitle */}
            <p className="subtitle text-center text-impulso max-md:text-[17px]">
              Déjanos tus datos y un asesor te compartirá precios, <br />{" "}
              modelos y disponibilidad.
            </p>

            {/* form */}
            <FormularioCotiza />
          </div>
        </div>

        {/* image */}
        <div className="relative shrink-0 w-full min-h-[50svh] max-xl:max-w-[580px] max-w-[42vw] rounded-tl-[200px] overflow-hidden max-lg:max-w-none max-lg:min-h-0 max-lg:h-[240px] md:max-lg:h-[360px] max-lg:rounded-tl-[120px]">
          <img
            src={backgroundImage}
            alt="Familia jugando futbol"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}