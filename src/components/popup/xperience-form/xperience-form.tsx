import { useEffect, useRef, useState } from "react";
import CloseIcon from "@/assets/icons/components/close-icon";
import InitialStep from "./steps/initial-step";
import StepsLayout from "./steps/steps-layout";
import TusDatos from "./steps/tus-datos";
import Confirmacion from "./steps/confirmacion";
import { enviarLead, getLeadGuardado, mensajeError, urlCX } from "@/lib/leads";
import { track } from "@/lib/track";
import type { DatosLead } from "@/types/xperience-form";

// Onboarding del one pager, mismo flujo que el registro de CX:
// Tus datos → (contacto existente) entra directo a CX
//           → (contacto nuevo) Confirmación con folio → CX.
// La sesión pasa a CX con #lead=<token>. Interés y perfil quedan para la app de asesores.

type Props = {
  onClose: () => void;
};

type Paso = "inicio" | "datos" | "confirmacion" | "entrando";
const PASO_NUM: Record<Paso, number> = { inicio: 0, datos: 1, confirmacion: 2, entrando: 1 };

export default function XperienceForm({ onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  // Lead ya guardado en este navegador: no se le piden datos otra vez, se envían solos
  const [guardado] = useState(() => getLeadGuardado());
  const [paso, setPaso] = useState<Paso>(guardado ? "entrando" : "inicio");
  const automatico = useRef(false);
  const [confirmacion, setConfirmacion] = useState<{
    nombre: string;
    folio: string | null;
    token: string;
  } | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    track("onboarding_paso", { paso: PASO_NUM[paso] });
  }, [paso]);

  const enviar = async (datos: DatosLead) => {
    setError(null);
    setEnviando(true);
    try {
      const r = await enviarLead(datos, { canal: "op_onboarding" });
      track("onboarding_completo", { existente: r.existente });
      // Sin folio nuevo (ya lo tenía): entra directo a CX con su sesión, igual que en CX.
      // Con folio (contacto nuevo o primer onboarding de quien llegó por un formulario): confirmación.
      if (!r.folio) {
        window.location.assign(urlCX(r.token));
        return;
      }
      setConfirmacion({ nombre: datos.nombre, folio: r.folio, token: r.token });
      setPaso("confirmacion");
    } catch (e) {
      setError(mensajeError(e));
      setPaso("datos"); // si el envío automático falla, se muestra el formulario con el error
    } finally {
      setEnviando(false);
    }
  };

  useEffect(() => {
    if (!guardado || automatico.current) return;
    automatico.current = true;
    enviar(guardado);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        {paso === "entrando" ? (
          <div className="flex flex-1 min-h-[50svh] items-center justify-center">
            <p className="subtitle text-proposito" role="status">
              Abriendo Click and Xperience…
            </p>
          </div>
        ) : paso === "inicio" ? (
          <InitialStep nextStep={() => setPaso("datos")} />
        ) : (
          <StepsLayout step={paso === "datos" ? 1 : 3}>
            {paso === "datos" && (
              <TusDatos
                defaults={guardado ?? undefined}
                enviando={enviando}
                error={error}
                onEnviar={enviar}
              />
            )}
            {paso === "confirmacion" && confirmacion && (
              <Confirmacion
                nombre={confirmacion.nombre}
                folio={confirmacion.folio}
                token={confirmacion.token}
              />
            )}
          </StepsLayout>
        )}
      </div>
    </div>
  );
}