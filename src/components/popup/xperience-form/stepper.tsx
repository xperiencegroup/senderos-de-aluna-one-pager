import { STEPS } from "@/types/xperience-form";

type StepperProps = {
  step: number; // 1, 2 o 3
};

export default function Stepper({ step }: StepperProps) {
  return (
    <ol className="flex w-[330px] max-lg:w-full max-lg:max-w-[420px] max-lg:self-center">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const isActive = n <= step;
        const isLast = n === STEPS.length;

        return (
          <li
            key={label}
            aria-current={n === step ? "step" : undefined}
            className="relative flex flex-1 flex-col items-center gap-[14px]"
          >
            {/* Línea hacia el siguiente paso */}
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute top-[22px] left-1/2 h-px w-full bg-impulso"
              />
            )}

            {/* Círculo */}
            <span
              className={`relative z-10 flex size-[44px] items-center justify-center rounded-full
                border border-impulso font-semibold transition-colors duration-300
                ${isActive ? "bg-impulso text-beige" : "bg-beige text-impulso"}`}
            >
              {n}
            </span>

            {/* Etiqueta */}
            <span className="regular text-impulso whitespace-nowrap max-md:text-[13px]">
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}