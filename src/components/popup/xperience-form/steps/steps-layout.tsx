import type { ReactNode } from "react";
import Stepper from "../stepper";

import bgImage from "@/assets/images/amenidades/salon-social.jpg";

import formaAluna from "@/assets/images/fondo-forma-hero.svg";
import isotipo from "@/assets/logos/main/isotipo.svg";

type StepsLayoutProps = {
  step: number;
  children: ReactNode;
};

export default function StepsLayout({ step, children }: StepsLayoutProps) {
  return (
    <div className="flex w-full h-full max-lg:flex-col max-lg:min-h-svh">
      {/* cuadro fijo */}
      <div className="relative flex-1 shrink-0 rounded-br-[200px] overflow-hidden max-lg:flex-none max-lg:h-[240px] max-lg:rounded-br-[100px]">
        {/* fondo */}
        <div className="absolute inset-y-0 left-0 top-0 w-full h-full">
          <div className="relative w-full h-full">
            <img
              src={bgImage}
              className="absolute w-full h-full inset-0 object-cover"
            />

            <img
              src={formaAluna}
              alt=""
              aria-hidden="true"
              className="absolute h-full w-full pr-[40px] object-fill"
            />
          </div>
        </div>

        {/* contenido */}
        <div className="relative flex flex-col w-full h-full justify-end pl-[80px] pb-[60px] gap-[78px] max-lg:pl-[20px] max-lg:pb-[24px] max-lg:gap-[12px] md:max-lg:pl-[48px]">
          {/* logo */}
          <img
            src={isotipo}
            alt="Isotipo principal"
            className="absolute top-[55px] w-[38px] h-[75px] max-lg:top-[20px] max-lg:w-[26px] max-lg:h-auto"
          />

          <p className="regular text-impulso max-lg:hidden">
            Un proyecto de <br />{" "}
            <span className="font-semibold italic">Grupo MR2</span>
          </p>

          <div className="flex flex-col w-full max-w-[320px] gap-[25px] max-lg:gap-[10px]">
            <h3 className="hero font-extrabold italic text-proposito max-md:text-[34px]">
              Bienvenido
            </h3>

            {/* divider */}
            <div className="w-full h-[2px] bg-impulso" />

            <p className="subtitle text-impulso max-lg:hidden">
              Cuéntanos un poco de ti y{" "}
              <span className="font-bold italic">Senderos de Aluna</span> se
              adapta; modelos, planes y espacios pensados para tu familia
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 shrink-0 bg-beige max-lg:flex-none">
        <div className="flex flex-col h-full justify-between px-[53px] pt-[41px] pb-[56px] max-lg:justify-start max-lg:gap-[28px] max-lg:px-[20px] max-lg:pt-[28px] max-lg:pb-[48px] md:max-lg:px-[48px]">
          {/* STEPPER */}
          <Stepper step={step} />

          {/* form */}
          <div className="w-[578px] h-[510px] bg-green-600 max-lg:w-full max-lg:h-auto max-lg:min-h-[320px]">{children}</div>
        </div>
      </div>
    </div>
  );
}