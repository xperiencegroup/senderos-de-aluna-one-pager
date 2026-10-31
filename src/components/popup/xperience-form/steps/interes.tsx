import FillButton from "@/components/fill-button";
import PillButton from "@/components/pill-button";
import ArrowIcon from "@/assets/icons/components/arrow-icon";
import { CheckIcon } from "@/components/forms/fields";
import type { SVGProps } from "react";

const ArrowBack = (p: SVGProps<SVGSVGElement>) => (
  <ArrowIcon {...p} className={`${p.className ?? ""} rotate-180`} />
);

type Props = {
  enviando: boolean;
  onBack: () => void;
  /** interes = true (Confirmar) | false (Por ahora no, gracias) */
  onSubmit: (interes: boolean) => void;
};

const BENEFICIOS = [
  <>
    Recomendación del modelo que mejor te queda:{" "}
    <span className="font-semibold italic">
      Aluna 75, Aluna 88, Aluna 96, Aluna 105
    </span>
  </>,
  <>
    Cálculo de cuota mensual estimada con{" "}
    <span className="font-semibold italic">FHA y LIP</span>
  </>,
  <>Tu asesor llega preparado a la cita — no empiezas de cero</>,
];

export default function Interes({ enviando, onBack, onSubmit }: Props) {
  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-[16px]">
        <h3 className="subtitle text-impulso">Empecemos por conocerte</h3>
        <p className="regular text-origen">
          Si nos cuentas un poco más,{" "}
          <span className="font-semibold italic">Senderos de Aluna</span> se
          adapta: te sugeriremos el modelo que mejor encaja y abrimos planes de
          financiamiento pre-evaluados para ti. Son solo 2 pasos más.
        </p>
      </div>

      {/* checks informativos */}
      <ul className="flex flex-col gap-[14px]">
        {BENEFICIOS.map((b, i) => (
          <li key={i} className="flex items-start gap-[14px] regular text-origen">
            <CheckIcon />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-[16px] pt-[8px] max-md:flex-col max-md:items-stretch">
        <PillButton
          onClick={onBack}
          disabled={enviando}
          Icon={ArrowBack}
        >
          Atrás
        </PillButton>

        <PillButton
          onClick={() => onSubmit(false)}
          disabled={enviando}
          base="border-origen text-origen focus-visible:ring-origen"
          pressed="active:bg-origen active:text-beige active:border-origen"
        >
          Por ahora no, gracias
        </PillButton>

        <FillButton
          onClick={() => onSubmit(true)}
          disabled={enviando}
          variant="impulso"
          Icon={ArrowIcon}
          iconSize={16}
          className="max-md:self-stretch max-md:justify-between"
        >
          {enviando ? "Enviando..." : "Confirmar"}
        </FillButton>
      </div>
    </div>
  );
}
