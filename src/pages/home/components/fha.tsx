import FHALogo from "@/assets/logos/fha.svg";
import imageDecoration from "@/assets/images/fha-image-decoration.png";

export default function FHA() {
  return (
    <div className="flex w-full justify-center portrait:min-h-[max(100svh,800px)] bg-impulso overflow-hidden max-lg:rounded-tr-[120px]">
      {/* El alto de la sección lo define la figura */}
      <div
        className="flex w-full max-w-[1366px] min-[1440px]:max-w-[1700px] min-[1920px]:max-w-[88vw]
        lg:h-[max(50svh,380px)]
        items-center gap-[30px] lg:gap-[60px] min-[1920px]:gap-[100px] px-[84px]
        max-lg:flex-col max-lg:min-h-svh max-lg:px-[20px] max-lg:py-[48px] md:max-lg:px-[48px]"
      >
        {/* image */}
        <img
          src={imageDecoration}
          alt=""
          aria-hidden="true"
          className="block shrink-0 w-[224px] h-auto lg:h-[125%] lg:w-auto lg:max-w-none"
        />

        <div className="flex flex-1 flex-col justify-center items-center gap-[20px] lg:gap-[24px] py-[40px] max-lg:py-0">
          {/* fha */}
          <img
            src={FHALogo}
            alt="FHA - Cumple el sueño de tu casa propia"
            className="max-md:w-[220px] min-[1920px]:w-[340px]"
          />

          {/* text */}
          <p className="w-full max-w-[766px] min-[1440px]:max-w-[1000px] min-[1920px]:max-w-[1150px] subtitle text-center text-beige max-md:text-[16px]">
            La calidad de urbanización y construcción de{" "}
            <span className="font-bold italic">Senderos de ALUNA</span> está{" "}
            <span className="font-bold italic">respaldada</span> por el sello de
            confianza de FHA
            <br className="max-lg:hidden" />
            (Instituto de Fomento de Hipotecas Aseguradas).
            <br />
            <br />
            Con este respaldo,{" "}
            <span className="font-bold italic">garantizamos</span> una gestión
            responsable y una oportunidad real de acceso a la vivienda para más
            familias guatemaltecas.
          </p>
        </div>
      </div>
    </div>
  );
}
