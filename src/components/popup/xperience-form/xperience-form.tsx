import { useEffect, useRef, useState } from "react";
import CloseIcon from "@/assets/icons/components/close-icon";
import InitialStep from "./steps/initial-step";
import StepsLayout from "./steps/steps-layout";
import TusDatos from "./steps/tus-datos";
import Interes from "./steps/interes";
import Confirmacion from "./steps/confirmacion";
import { getLeadGuardado, registrarOnboarding } from "@/lib/leads";
import { track } from "@/lib/track";
import type { DatosLead, ResultadoRegistro } from "@/types/xperience-form";

type Props = {
  onClose: () => void;
};

export default function XperienceForm({ onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [step, setStep] = useState(0);
  const [datos, setDatos] = useState<DatosLead | null>(null);
  const [resultado, setResultado] = useState<ResultadoRegistro | null>(null);
  const [enviando, setEnviando] = useState(false);

  // Bloquea el scroll del body mientras el popup está abierto
  useEffect(() => {
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, []);

  // Escape cierra; el foco entra al popup y regresa al cerrar
  useEffect(() => {
    const previo = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previo?.focus();
    };
  }, [onClose]);

  // Tracking por paso
  useEffect(() => {
    track("onboarding_paso", { paso: step });
  }, [step]);

  const enviar = async (interes: boolean) => {
    if (!datos) return;
    setEnviando(true);
    try {
      const r = await registrarOnboarding({ ...datos, interes });
      track("onboarding_completo", { interes });
      setResultado(r);
      setStep(3);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Click and Xperience"
      className="fixed inset-0 z-[100] flex justify-center overflow-y-auto overscroll-contain bg-origen/70"
    >
      <div className="relative flex w-full max-w-[1366px] min-[1440px]:max-w-[1600px] my-auto lg:min-h-[min(768px,100svh)] bg-beige max-lg:min-h-full">
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Cerrar"
          className="group absolute z-50 right-[44px] top-[31px] max-md:right-[16px] max-md:top-[16px] flex size-[44px] justify-center items-center bg-proposito border-2 border-horizonte drop-shadow rounded-full transition-colors duration-100 hover:cursor-pointer hover:opacity-60 active:opacity-100 active:bg-horizonte active:border-proposito"
        >
          <CloseIcon className="size-[20px] text-horizonte group-active:text-proposito" />
        </button>

        {step === 0 ? (
          <InitialStep nextStep={() => setStep(1)} />
        ) : (
          <StepsLayout step={step}>
            {step === 1 && (
              <TusDatos
                defaults={datos ?? getLeadGuardado() ?? undefined}
                onNext={(d) => {
                  setDatos(d);
                  setStep(2);
                }}
              />
            )}
            {step === 2 && (
              <Interes enviando={enviando} onBack={() => setStep(1)} onSubmit={enviar} />
            )}
            {step === 3 && datos && resultado && (
              <Confirmacion nombre={datos.nombre} resultado={resultado} />
            )}
          </StepsLayout>
        )}
      </div>
    </div>
  );
}