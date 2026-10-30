import backgroundImage from "@/assets/images/cotiza-casa-background.jpg";
import logoDecoration from "@/assets/icons/logo-decoration-cotiza.svg";

// icons
import FormularioCotiza from "@/components/formulario-cotiza";

export default function CotizaTuCasa() {
  return (
    <div id="cotizador" className="relative w-full min-h-svh overflow-hidden">
      {/* decoration */}
      <img
        src={logoDecoration}
        className="absolute -bottom-4 -left-24 scale-115"
      />

      {/* conoce el proyecto */}
      <div className="flex gap-[80px] bg-beige">
        <div className="flex flex-col justify-center items-center w-full min-h-svh py-[34px] px-[30px]">
          <div className="flex flex-col justify-between w-full max-w-[620px] min-[1440px]:max-w-[700px] h-full max-h-[660px] pt-[24px] bg-beige">
            {/* title */}
            <h2 className="hero-2 text-center text-impulso">
              <span className="font-semibold">Cotiza</span>{" "}
              <span className="font-bold italic">tu casa</span>
            </h2>

            {/* subtitle */}
            <p className="subtitle text-center text-impulso">
              Déjanos tus datos y un asesor te compartirá precios, <br />{" "}
              modelos y disponibilidad.
            </p>

            {/* form */}
            <FormularioCotiza />
          </div>
        </div>

        {/* image */}
        <div className="relative shrink-0 w-full min-h-[50svh] max-xl:max-w-[580px] max-w-[42vw] rounded-tl-[200px] overflow-hidden">
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