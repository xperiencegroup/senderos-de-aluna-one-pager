import FHALogo from "@/assets/logos/fha.svg";
import imageDecoration from "@/assets/images/fha-image-decoration.png";

export default function FHA() {
  return (
    <div className="flex w-full min-h-[50svh] justify-center bg-impulso overflow-hidden">
      <div className="flex w-full max-w-[1366px] h-[400px] justify-center">
        {/* image */}
        <div className="relative w-full max-w-[276px] min-h-[50svh]">
          <img src={imageDecoration} className="w-full" />
        </div>

        <div className="w-full max-w-[923px] flex flex-col justify-center items-center gap-[24px]">
          {/* fha */}
          <img src={FHALogo} alt="FHA - Cumple el sueño de tu casa propia" />

          {/* text */}
          <p className="w-full max-w-[766px] subtitle text-center text-beige">
            La calidad de urbanización y construcción de{" "}
            <span className="font-bold italic">Senderos de ALUNA</span> está{" "}
            <span className="font-bold italic">respaldada</span> por el sello de
            confianza de FHA
            <br />
            (lnstituto de Fomento de Hipotecas Aseguradas).
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
