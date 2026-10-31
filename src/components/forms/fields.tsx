import { useRef, type ReactNode } from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import IntlTelInput from "@intl-tel-input/react/with-utils";
import "intl-tel-input/styles";

/* Clases compartidas por los formularios nuevos (mismo estilo que el de cotización) */
export const inputClass = `w-full py-[20px] max-md:py-[16px] short:py-[12px] pl-[55px] pr-[20px] rounded-[10px] drop-shadow
  border border-origen bg-white text-origen placeholder:text-origen
  formulario-input italic outline-none transition-colors duration-200
  focus:border-proposito aria-[invalid=true]:border-red-600`;

export const iconClass =
  "pointer-events-none absolute z-10 left-[20px] top-1/2 size-[20px] -translate-y-1/2";

export function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p
      id={id}
      role="alert"
      className="absolute left-[4px] top-full mt-[4px] flex items-center gap-[4px] text-[12px] leading-none text-red-600"
    >
      <svg aria-hidden="true" viewBox="0 0 20 20" className="size-[12px] shrink-0" fill="currentColor">
        <path d="M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm-.9 4.5h1.8v5.2H9.1V6Zm0 6.8h1.8v1.8H9.1v-1.8Z" />
      </svg>
      {children}
    </p>
  );
}

/** Campo con ícono a la izquierda y etiqueta opcional arriba */
export function Field({
  id,
  label,
  icon,
  error,
  children,
}: {
  id: string;
  label?: string;
  icon?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[8px] short:gap-[4px]">
      {label && (
        <label htmlFor={id} className="regular text-origen">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && <img src={icon} alt="" aria-hidden="true" className={iconClass} />}
        {children}
        {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
      </div>
    </div>
  );
}

/* Teléfono con intl-tel-input (igual que la app CX). Guarda el número en E.164. */
const phoneInputClass = `w-full py-[20px] max-md:py-[16px] short:py-[12px] pr-[20px] rounded-[10px] drop-shadow
  border border-origen bg-white text-origen placeholder:text-origen
  formulario-input italic outline-none transition-colors duration-200
  focus:border-proposito aria-[invalid=true]:border-red-600`;

export function PhoneField<T extends FieldValues>({
  control,
  name,
  id,
  label,
}: {
  control: Control<T>;
  name: Path<T>;
  id: string;
  label?: string;
}) {
  const valido = useRef(false);
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: {
      required: "Escribe tu número de teléfono",
      validate: () => valido.current || "Ingresa un teléfono válido",
    },
  });

  return (
    <div className="flex flex-col gap-[8px] short:gap-[4px]">
      {label && (
        <label htmlFor={id} className="regular text-origen">
          {label}
        </label>
      )}
      <div className="relative">
        <IntlTelInput
          onChangeNumber={(n: string) => field.onChange(n)}
          onChangeValidity={(v: boolean) => {
            valido.current = v;
          }}
          initialCountry="gt"
          countryOrder={["gt", "mx", "sv", "hn", "us"]}
          separateDialCode
          inputProps={{
            id,
            className: phoneInputClass,
            autoComplete: "tel",
            placeholder: "0000 0000",
            onBlur: field.onBlur,
            "aria-invalid": !!error,
            "aria-describedby": error ? `${id}-error` : undefined,
          }}
        />
        {error && <ErrorText id={`${id}-error`}>{error.message}</ErrorText>}
      </div>
    </div>
  );
}

export const correoRules = {
  required: "Escribe tu correo electrónico",
  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Ingresa un correo válido" },
};

export const nombreRules = {
  required: "Escribe tu nombre completo",
  minLength: { value: 3, message: "El nombre es demasiado corto" },
};

/** Check informativo (verde) */
export function CheckIcon() {
  return (
    <span className="flex shrink-0 size-[24px] items-center justify-center rounded-[4px] bg-proposito">
      <svg aria-hidden="true" viewBox="0 0 20 20" className="size-[16px] text-beige" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="m4.5 10.5 3.5 3.5 7.5-8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}