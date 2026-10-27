import { useState } from "react";
import { useForm } from "react-hook-form";

// icons
import userIcon from "@/assets/icons/form/user-icon.svg";
import phoneIcon from "@/assets/icons/form/phone-icon.svg";
import mailIcon from "@/assets/icons/form/mail-icon.svg";
import modelIcon from "@/assets/icons/form/model-icon.svg";
import PillButton from "./pill-button";
import ArrowIcon from "@/assets/icons/components/arrow-icon";

type CotizaValues = {
  nombre: string;
  telefono: string;
  correo: string;
  modelo: string;
};

const modelos = ["ALUNA 75", "ALUNA 88", "ALUNA 96", "ALUNA 105"];

/* Clases compartidas.
   - pl-[56px] deja espacio al icono
   - aria-[invalid=true]: pinta el borde de rojo cuando hay error */
const input = `w-full py-[20px] pl-[55px] pr-[20px] rounded-[10px] drop-shadow
  border border-origen bg-white text-origen placeholder:text-origen
  formulario-input italic outline-none transition-colors duration-200
  aria-[invalid=true]:border-error`;

const icon =
  "pointer-events-none absolute z-10 left-[20px] top-1/2 size-[20px] -translate-y-1/2";

/* Error tipo Google: texto pequeño bajo el campo, en absolute para que
   no mueva el layout (cabe dentro del gap de 24px del form) */
const error =
  "absolute left-[4px] top-full mt-[4px] flex items-center gap-[4px] text-[12px] leading-none text-error";

function ErrorIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-[12px] shrink-0"
      fill="currentColor"
    >
      <path d="M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm-.9 4.5h1.8v5.2H9.1V6Zm0 6.8h1.8v1.8H9.1v-1.8Z" />
    </svg>
  );
}

export default function FormularioCotiza() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CotizaValues>({
    mode: "onTouched",
    defaultValues: { nombre: "", telefono: "", correo: "", modelo: "" },
  });

  const onSubmit = async (data: CotizaValues) => {
    try {
      setStatus("idle");
      console.log(data);
      reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-[24px]"
    >
      {/* nombre */}
      <div className="relative">
        <img src={userIcon} alt="" aria-hidden="true" className={icon} />
        <input
          id="nombre"
          type="text"
          autoComplete="name"
          placeholder="Nombre completo"
          aria-label="Nombre completo"
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? "nombre-error" : undefined}
          className={input}
          {...register("nombre", {
            required: "Escribe tu nombre completo",
            minLength: { value: 3, message: "El nombre es demasiado corto" },
          })}
        />
        {errors.nombre && (
          <p id="nombre-error" role="alert" className={error}>
            <ErrorIcon />
            {errors.nombre.message}
          </p>
        )}
      </div>

      {/* teléfono */}
      <div className="relative">
        <img src={phoneIcon} alt="" aria-hidden="true" className={icon} />
        <input
          id="telefono"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Número de teléfono"
          aria-label="Número de teléfono"
          aria-invalid={!!errors.telefono}
          aria-describedby={errors.telefono ? "telefono-error" : undefined}
          className={input}
          {...register("telefono", {
            required: "Escribe tu número de teléfono",
            pattern: {
              value: /^[+\d][\d\s-]{7,14}$/,
              message: "Ingresa un teléfono válido",
            },
          })}
        />
        {errors.telefono && (
          <p id="telefono-error" role="alert" className={error}>
            <ErrorIcon />
            {errors.telefono.message}
          </p>
        )}
      </div>

      {/* correo */}
      <div className="relative">
        <img src={mailIcon} alt="" aria-hidden="true" className={icon} />
        <input
          id="correo"
          type="email"
          autoComplete="email"
          placeholder="Correo electrónico"
          aria-label="Correo electrónico"
          aria-invalid={!!errors.correo}
          aria-describedby={errors.correo ? "correo-error" : undefined}
          className={input}
          {...register("correo", {
            required: "Escribe tu correo electrónico",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ingresa un correo válido",
            },
          })}
        />
        {errors.correo && (
          <p id="correo-error" role="alert" className={error}>
            <ErrorIcon />
            {errors.correo.message}
          </p>
        )}
      </div>

      {/* modelo */}
      <div className="relative">
        <img src={modelIcon} alt="" aria-hidden="true" className={icon} />
        <select
          id="modelo"
          aria-label="Modelo de interés"
          aria-invalid={!!errors.modelo}
          aria-describedby={errors.modelo ? "modelo-error" : undefined}
          className={`${input} appearance-none`}
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
        {errors.modelo && (
          <p id="modelo-error" role="alert" className={error}>
            <ErrorIcon />
            {errors.modelo.message}
          </p>
        )}
      </div>

      <PillButton
        type="submit"
        disabled={isSubmitting}
        iconPosition="end"
        base="border-beige bg-proposito text-beige focus-visible:ring-proposito"
        pressed="active:bg-beige active:text-proposito active:border-proposito"
        className="w-full h-[52px] mt-[28px]"
      >
        {isSubmitting ? "Enviando..." : "Solicitar información"}
        <ArrowIcon className="size-[12px]" />
      </PillButton>

      <div aria-live="polite">
        {status === "success" && (
          <p>¡Gracias! Un asesor se pondrá en contacto contigo pronto.</p>
        )}
        {status === "error" && (
          <p>No pudimos enviar tus datos. Intenta de nuevo.</p>
        )}
      </div>
    </form>
  );
}
