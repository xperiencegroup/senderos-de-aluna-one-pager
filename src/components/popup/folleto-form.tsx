import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import PillButton from "@/components/pill-button";
import CloseIcon from "@/assets/icons/components/close-icon";
import ArrowIcon from "@/assets/icons/components/arrow-icon";
import userIcon from "@/assets/icons/form/user-icon.svg";
import mailIcon from "@/assets/icons/form/mail-icon.svg";
import modelIcon from "@/assets/icons/form/model-icon.svg";
import imagen from "@/assets/images/forms/form_brochure/form_brochure_image.webp";
import logo from "@/assets/logos/main/logo_and_name.svg";
import {
  Field,
  PhoneField,
  correoRules,
  inputClass,
  nombreRules,
  ErrorText,
} from "@/components/forms/fields";
import {
  AVISO_PRIVACIDAD_URL,
  FOLLETO_URL,
  NOMBRE_FOLLETO,
  descargar,
  getLeadGuardado,
  solicitarFolleto,
} from "@/lib/leads";
import { track } from "@/lib/track";

const modelos = ["ALUNA 75", "ALUNA 88", "ALUNA 96", "ALUNA 105"];

type Values = {
  nombre: string;
  correo: string;
  telefono: string;
  modelo: string;
  privacidad: boolean;
};

export default function FolletoForm({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [error, setError] = useState(false);
  const guardado = getLeadGuardado();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    mode: "onTouched",
    defaultValues: {
      nombre: guardado?.nombre ?? "",
      correo: guardado?.correo ?? "",
      telefono: "",
      modelo: guardado?.modelo ?? "",
      privacidad: false,
    },
  });

  // Bloqueo de scroll + Escape + foco
  useEffect(() => {
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const previo = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      document.removeEventListener("keydown", onKeyDown);
      previo?.focus();
    };
  }, [onClose]);

  const onSubmit = async (v: Values) => {
    try {
      setError(false);
      await solicitarFolleto({
        nombre: v.nombre.trim(),
        correo: v.correo.trim(),
        telefono: v.telefono,
        modelo: v.modelo,
      });
      track("solicitar_folleto", { modelo: v.modelo });
      track("descargar_folleto");
      descargar(FOLLETO_URL, NOMBRE_FOLLETO);
      onClose();
    } catch {
      setError(true);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="folleto-title"
      className="fixed inset-0 z-[100] flex justify-center overflow-y-auto overscroll-contain bg-origen/70"
    >
      <div className="relative flex w-full max-w-[1366px] min-[1440px]:max-w-[1600px] my-auto lg:min-h-[min(768px,100svh)] bg-beige max-lg:flex-col max-lg:min-h-full">
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Cerrar"
          className="group absolute z-50 right-[44px] top-[31px] max-md:right-[16px] max-md:top-[16px] flex size-[44px] justify-center items-center bg-proposito border-2 border-horizonte drop-shadow rounded-full transition-colors duration-100 hover:cursor-pointer hover:opacity-60 active:opacity-100 active:bg-horizonte active:border-proposito"
        >
          <CloseIcon className="size-[20px] text-horizonte group-active:text-proposito" />
        </button>

        {/* imagen */}
        <div className="relative w-[44%] shrink-0 rounded-tr-[200px] overflow-hidden max-lg:w-full max-lg:h-[240px] max-lg:rounded-tr-[100px]">
          <img src={imagen} alt="Familia cocinando en una casa de Senderos de Aluna" className="absolute inset-0 w-full h-full object-cover" />
          <img src={logo} alt="Senderos de Aluna" className="absolute left-[60px] top-[48px] w-[280px] max-lg:left-[20px] max-lg:top-[20px] max-lg:w-[150px]" />
        </div>

        {/* formulario */}
        <div className="flex flex-1 items-center px-[80px] py-[48px] short:py-[24px] max-lg:px-[20px] max-lg:pt-[32px] max-lg:pb-[48px] md:max-lg:px-[48px]">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col w-full max-w-[640px] gap-[24px] short:gap-[14px]">
            <div className="flex flex-col gap-[16px]">
              <h2 id="folleto-title" className="hero max-md:text-[32px] short:text-[36px]">
                <span className="font-semibold text-proposito">Regístrate para recibir</span>
                <br />
                <span className="font-bold italic text-impulso">más información</span>
              </h2>
              <p className="subtitle text-proposito max-md:text-[17px]">
                Conoce todo lo que <span className="font-semibold">Senderos de Aluna</span> tiene para ti.
              </p>
            </div>

            <Field id="fo-nombre" icon={userIcon} error={errors.nombre?.message}>
              <input
                id="fo-nombre"
                type="text"
                autoComplete="name"
                placeholder="Nombre completo"
                aria-label="Nombre completo"
                aria-invalid={!!errors.nombre}
                aria-describedby={errors.nombre ? "fo-nombre-error" : undefined}
                className={inputClass}
                {...register("nombre", nombreRules)}
              />
            </Field>

            <Field id="fo-correo" icon={mailIcon} error={errors.correo?.message}>
              <input
                id="fo-correo"
                type="email"
                autoComplete="email"
                placeholder="Correo electrónico"
                aria-label="Correo electrónico"
                aria-invalid={!!errors.correo}
                aria-describedby={errors.correo ? "fo-correo-error" : undefined}
                className={inputClass}
                {...register("correo", correoRules)}
              />
            </Field>

            <PhoneField control={control} name="telefono" id="fo-telefono" />

            <Field id="fo-modelo" icon={modelIcon} error={errors.modelo?.message}>
              <select
                id="fo-modelo"
                aria-label="Modelo de interés"
                aria-invalid={!!errors.modelo}
                aria-describedby={errors.modelo ? "fo-modelo-error" : undefined}
                className={`${inputClass} appearance-none cursor-pointer`}
                {...register("modelo", { required: "Selecciona un modelo" })}
              >
                <option value="" disabled>
                  Modelo de interés
                </option>
                {modelos.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </Field>

            {/* aviso de privacidad */}
            <div className="relative">
              <label className="flex items-start gap-[16px] cursor-pointer regular text-origen">
                <input
                  type="checkbox"
                  aria-invalid={!!errors.privacidad}
                  className="mt-[2px] size-[28px] shrink-0 accent-proposito cursor-pointer"
                  {...register("privacidad", { required: "Debes aceptar el aviso de privacidad" })}
                />
                <span>
                  Acepto información sobre Senderos de Aluna de acuerdo con el{" "}
                  <a href={AVISO_PRIVACIDAD_URL} target="_blank" rel="noopener noreferrer" className="underline">
                    aviso de privacidad
                  </a>
                </span>
              </label>
              {errors.privacidad && (
                <ErrorText id="fo-privacidad-error">{errors.privacidad.message}</ErrorText>
              )}
            </div>

            <PillButton
              type="submit"
              disabled={isSubmitting}
              iconPosition="end"
              base="border-beige bg-proposito text-beige focus-visible:ring-proposito"
              pressed="active:bg-beige active:text-proposito active:border-proposito"
              className="w-full h-[52px] mt-[12px] short:mt-0"
            >
              {isSubmitting ? "Enviando..." : "Enviar información"}
              <ArrowIcon className="size-[12px]" />
            </PillButton>

            <div aria-live="polite">
              {error && (
                <p className="regular text-red-600">No pudimos enviar tus datos. Intenta de nuevo.</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}