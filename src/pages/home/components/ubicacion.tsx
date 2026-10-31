import ArrowIcon from "@/assets/icons/components/arrow-icon";
import backgroundLocation from "@/assets/images/ubicacion-background.jpg";
import MR2Logo from "@/assets/logos/main/mr2.svg";
import FillButton from "@/components/fill-button";

export default function Ubicacion() {
  return (
    <div id="ubicacion">
      {/* vive en la comunidad de aluna */}
      <div className="relative flex w-full min-h-[384px] h-[50svh] justify-center items-center overflow-hidden max-lg:h-auto max-lg:min-h-[420px]">
        {/* bg image */}
        <img
          src={backgroundLocation}
          alt="Imágen satelital"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative flex justify-start items-center w-full max-w-[1366px] h-full">
          <div className="relative -translate-x-[228px] w-[848px] h-[692px] flex flex-col justify-center items-end rounded-full p-[10px] max-lg:translate-x-0 max-lg:w-full max-lg:h-full max-lg:min-h-[420px] max-lg:items-start max-lg:rounded-none max-lg:px-[20px] max-lg:py-[48px] md:max-lg:px-[48px]">
            {/* circulo */}
            <div className="absolute inset-0 w-full h-full rounded-full bg-radial from-proposito to-proposito/20 blur-xl" />

            {/* texto */}
            <div className="relative flex flex-col gap-[24px]">
              {/* title */}
              <h2 className="hero max-md:text-[34px]">
                <span className="font-semibold text-impulso">Vive en la</span>
                <br />
                <span className="font-extrabold italic text-beige">
                  Comunidad de Aluna
                </span>
              </h2>

              {/* description */}
              <p className="w-full max-w-[401px] subtitle text-beige max-md:text-[17px]">
                Macrolote 1, zona 8, Aldea El Calvario, Villa Nueva, Guatemala.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* desarrollado por MR2 */}
      <div className="relative flex w-full min-h-[384px] h-[50svh] justify-center max-lg:h-auto max-lg:min-h-0">
        <div className="w-full max-w-[1366px] min-[1440px]:max-w-[1700px] h-full flex justify-between items-center gap-[40px] px-[83px] max-lg:flex-col max-lg:items-start max-lg:gap-[28px] max-lg:px-[20px] max-lg:py-[56px] md:max-lg:px-[48px] min-[1440px]:px-[60px] 2xl:px-[84px]">
          {/* title */}
          <h2 className="shrink-0 hero-2 whitespace-nowrap max-md:text-[30px]">
            <span className="font-semibold text-impulso">
              Respaldo
              <br />
              con décadas
            </span>
            <br />
            <span className="font-extrabold italic text-origen">
              de experiencia
              <br />y visión urbana
            </span>
          </h2>

          {/* description */}
          <p className="w-full max-w-[422px] min-[1440px]:max-w-[560px] max-lg:max-w-none regular text-origen">
            <span className="font-semibold italic">Senderos de ALUNA</span> es
            un proyecto de{" "}
            <span className="font-semibold italic">Grupo MR2,</span> una empresa
            familiar consolidada con más de 50 años de trayectoria en el sector
            inmobiliario guatemalteco.
            <br />
            <br />
            Su experiencia se refleja en desarrollos urbanos innovadores,
            respaldados por valores como la confianza, la planeación y la
            cercanía, y ejecutados con tecnología y mejores prácticas.
          </p>

          {/* logo and button */}
          <div className="shrink-0 h-[276px] min-[1440px]:h-[340px] max-lg:h-auto max-lg:self-center max-lg:gap-[20px] flex flex-col justify-between items-center">
            <p className="regular font-semibold italic text-impulso">
              Desarrollado por:
            </p>

            {/* logo */}
            <img
              src={MR2Logo}
              alt="Logo de MR2"
              className="w-auto min-[1440px]:w-[380px] max-md:w-[200px]"
            />

            {/* button */}
            <FillButton Icon={ArrowIcon}>Visitar Sitio Web</FillButton>
          </div>
        </div>
      </div>
    </div>
  );
}