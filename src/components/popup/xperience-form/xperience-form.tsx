import { useEffect, useState } from "react";
import CloseIcon from "@/assets/icons/components/close-icon";
import InitialStep from "./steps/initial-step";

type Props = {
  onClose: () => void;
};

const LAST_SLIDE = 3; // 3

export default function XperienceForm({ onClose }: Props) {
  const [step, setStep] = useState<number>(0);

  // Bloquea el scroll del body mientras el popup está abierto
  useEffect(() => {
    const { overflow, paddingRight } = document.body.style;
    // evita el "salto" del layout al desaparecer la barra de scroll
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, []);

  const nextStep = () => setStep((s) => Math.min(s + 1, LAST_SLIDE));
  // const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex justify-center overflow-y-auto overscroll-contain bg-cyan-800"
    >
      <div className="relative w-full max-w-[1366px] min-h-full max-h-[768px] h-[268px] bg-beige">
        {/* close button */}
        <button
          onClick={onClose}
          className="group absolute z-50 right-[44px] top-[31px] flex size-[44px] justify-center items-center bg-proposito border-2 border-horizonte drop-shadow rounded-full transition-colors duration-100 hover:cursor-pointer hover:opacity-60 active:opacity-100 active:bg-horizonte active:border-proposito"
        >
          <CloseIcon className="size-[20px] text-horizonte group-active:text-proposito" />
        </button>

        {step === 0 && <InitialStep nextStep={nextStep} />}
        {step === 1 && <InitialStep nextStep={nextStep} />}
      </div>
    </div>
  );
}
