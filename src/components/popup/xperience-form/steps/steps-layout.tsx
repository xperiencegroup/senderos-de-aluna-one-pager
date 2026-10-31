import type { ReactNode } from "react";
import Stepper from "../stepper";

import formaAluna from "@/assets/images/fondo-forma-hero.svg";
import isotipo from "@/assets/logos/main/isotipo.svg";

// Una foto por paso (Figma)
import fotoPaso1 from "@/assets/images/forms/onboarding/step1_image.jpg";
import fotoPaso2 from "@/assets/images/forms/onboarding/step2_image.jpg";
import fotoPaso3 from "@/assets/images/forms/onboarding/step3_image.jpg";

const FOTOS: Record<number, string> = { 1: fotoPaso1, 2: fotoPaso2, 3: fotoPaso3 };

type StepsLayoutProps = {
  step: number;
  children: ReactNode;
};

export default function StepsLayout({ step, children }: StepsLayoutProps) {
  return (
    <div className="flex flex-1 w-full max-lg:flex-col max-lg:min-h-svh">
      {/* cuadro fijo */}
      <div className="relative flex-1 shrink-0 rounded-br-[200px] overflow-hidden max-lg:flex-none max-lg:h-[240px] max-lg:rounded-br-[100px]">
        {/* fondo */}
        <div className="absolute inset-0">
          <img
            src={FOTOS[step] ?? fotoPaso1}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <img
            src={formaAluna}
            alt=""
            aria-hidden="true"
            className="absolute h-full w-full pr-[40px] object-fill max-lg:hidden"
          />
          {/* velo para legibilidad en móvil (sin la forma) */}
          <div className="absolute inset-0 bg-gradient-to-t from-beige via-beige/70 to-transparent lg:hidden" />
        </div>

        {/* contenido */}
        <div className="relative flex flex-col w-full h-full justify-end pl-[80px] pb-[60px] gap-[78px] short:pb-[32px] short:gap-[32px] max-lg:pl-[20px] max-lg:pb-[24px] max-lg:gap-[12px] md:max-lg:pl-[48px]">
          <img
            src={isotipo}
            alt="Isotipo Senderos de Aluna"
            className="absolute top-[55px] w-[38px] h-[75px] max-lg:top-[20px] max-lg:w-[26px] max-lg:h-auto"
          />

          <p className="regular text-impulso max-lg:hidden">
            Un proyecto de <br />
            <span className="font-semibold italic">Grupo MR2</span>
          </p>

          <div className="flex flex-col w-full max-w-[320px] gap-[25px] max-lg:gap-[10px]">
            <h2 className="hero font-extrabold italic text-proposito max-md:text-[34px]">
              Bienvenido
            </h2>

            <div className="w-full h-[2px] bg-impulso" />

            <p className="subtitle text-impulso max-lg:hidden">
              Cuéntanos un poco de ti y{" "}
              <span className="font-bold italic">Senderos de Aluna</span> se
              adapta; modelos, planes y espacios pensados para tu familia
            </p>
          </div>
        </div>
      </div>

      {/* panel del formulario */}
      <div className="flex-1 shrink-0 bg-beige max-lg:flex-none">
        <div className="flex flex-col h-full px-[53px] pt-[41px] pb-[56px] gap-[40px] short:pt-[24px] short:pb-[24px] short:gap-[16px] max-lg:gap-[28px] max-lg:px-[20px] max-lg:pt-[28px] max-lg:pb-[48px] md:max-lg:px-[48px]">
          <Stepper step={step} />

          <div className="flex flex-1 flex-col justify-center w-full max-w-[640px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}