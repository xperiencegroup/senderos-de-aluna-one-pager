import ArrowIcon from "@/assets/icons/components/arrow-icon";
import backgroundLocation from "@/assets/images/ubicacion-background.jpg";
import MR2Logo from "@/assets/logos/main/mr2.svg";
import FillButton from "@/components/fill-button";

export default function Ubicacion() {
  return (
    <div>
      {/* vive en la comunidad de aluna */}
      <div className="relative flex w-full min-h-[384px] h-[50svh] justify-center items-center overflow-hidden">
        {/* bg image */}
        <img
          src={backgroundLocation}
          alt="Imágen satelital"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative flex justify-start items-center w-full max-w-[1366px] h-full">
          <div className="relative -translate-x-[228px] w-[848px] h-[692px] flex flex-col justify-center items-end rounded-full p-[10px]">
            {/* circulo */}
            <div className="absolute inset-0 w-full h-full rounded-full bg-radial from-proposito to-proposito/20 blur-xl" />

            {/* texto */}
            <div className="relative flex flex-col gap-[24px]">
              {/* title */}
              <h2 className="hero">
                <span className="font-semibold text-impulso">Vive en la</span>
                <br />
                <span className="font-extrabold italic text-beige">
                  Comunidad de Aluna
                </span>
              </h2>

              {/* description */}
              <p className="w-full max-w-[401px] subtitle text-beige">
                Aldea el calvario, zona 8 del municipio de Villa Nueva,
                departamento de Guatemala
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* desarrollado por MR2 */}
      <div className="relative flex w-full min-h-[384px] h-[50svh] justify-center">
        <div className="w-full max-w-[1366px] h-full flex justify-between items-center px-[83px]">
          {/* title */}
          <h2 className="w-full max-w-[320px] hero-2">
            <span className="font-semibold text-impulso">
              Respaldo <br /> con décadas
            </span>{" "}
            <br />
            <span className="font-extrabold italic text-origen">
              de experiencia y visión urbana
            </span>
          </h2>

          {/* description */}
          <p className="w-full max-w-[422px] regular text-origen">
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
          <div className="h-[276px] flex flex-col justify-between items-center">
            <p className="regular font-semibold italic text-impulso">
              Desarrollado por:
            </p>

            {/* logo */}
            <img src={MR2Logo} alt="Logo de MR2" />

            {/* button */}
            <FillButton Icon={ArrowIcon}>Visitar Sitio Web</FillButton>
          </div>
        </div>
      </div>
    </div>
  );
}
