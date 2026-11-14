import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PhoneField } from "@/components/forms/fields";
import { EVENTO_LEAD_GUARDADO, enviarLead, getLeadGuardado, mensajeError, modeloHS } from "@/lib/leads";
import { modelos as MODELOS } from "@/data/modelos";

// icons
import userIcon from "@/assets/icons/form/user-icon.svg";
import mailIcon from "@/assets/icons/form/mail-icon.svg";
import modelIcon from "@/assets/icons/form/model-icon.svg";
import PillButton from "./pill-button";
import ArrowIcon from "@/assets/icons/components/arrow-icon";
import { track } from "@/lib/track";
import { TRACK } from "@/analytics/track.constants";

type CotizaValues = {
  nombre: string;
  apellido: string;
  telefono: string; // E.164 (PhoneField)
  correo: string;
  modelo: string; // número del modelo ("96"); se envía como "Aluna 96"
};

// Opciones desde data/modelos (solo modelos base)
const modelos = MODELOS.map((m) => ({ valor: m.numero, etiqueta: `ALUNA ${m.numero}` }));

/* Clases compartidas.
   - pl-[56px] deja espacio al icono
   - aria-[invalid=true]: pinta el borde de rojo cuando hay error */
const input = `w-full py-[20px] max-md:py-[16px] min-[1920px]:py-[26px] pl-[55px] min-[1920px]:pl-[68px] pr-[20px] rounded-[10px] min-[1920px]:rounded-[12px] drop-shadow
  border border-origen bg-white text-origen placeholder:text-origen/50
  formulario-input italic outline-none transition-colors duration-200
  aria-[invalid=true]:border-error`;

const inputSelect = `w-full py-[20px] max-md:py-[16px] min-[1920px]:py-[26px] pl-[55px] min-[1920px]:pl-[68px] pr-[20px] rounded-[10px] min-[1920px]:rounded-[12px] drop-shadow
  border border-origen bg-white text-origen has-[option[value='']:checked]:text-origen/50
  formulario-input italic outline-none transition-colors duration-200
  aria-[invalid=true]:border-error`;

const icon =
  "pointer-events-none absolute z-10 left-[20px] min-[1920px]:left-[26px] top-1/2 size-[20px] min-[1920px]:size-[24px] -translate-y-1/2";

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
  const [mensaje, setMensaje] = useState("");
  const [guardado, setGuardado] = useState(() => getLeadGuardado());

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CotizaValues>({
    mode: "onTouched",
    // Precarga los datos guardados en este navegador (incluido el teléfono)
    defaultValues: {
      nombre: guardado?.nombre ?? "",
      apellido: guardado?.apellido ?? "",
      telefono: guardado?.telefono ?? "",
      correo: guardado?.correo ?? "",
      modelo: "",
    },
  });

  // Cotiza está montado desde que carga la página: si el lead se guarda después
  // (folleto, ficha u onboarding), se precargan los campos que sigan vacíos.
  useEffect(() => {
    const alGuardar = () => {
      const g = getLeadGuardado();
      if (!g) return;
      const v = getValues();
      reset({
        nombre: v.nombre || g.nombre,
        apellido: v.apellido || g.apellido,
        correo: v.correo || g.correo,
        telefono: v.telefono || g.telefono,
        modelo: v.modelo,
      });
      // Remonta el campo de teléfono con el número guardado solo si estaba vacío
      if (!v.telefono) setGuardado(g);
    };
    window.addEventListener(EVENTO_LEAD_GUARDADO, alGuardar);
    return () => window.removeEventListener(EVENTO_LEAD_GUARDADO, alGuardar);
  }, [getValues, reset]);

  const onSubmit = async (data: CotizaValues) => {
    setStatus("idle");
    try {
      await enviarLead(
        {
          nombre: data.nombre.trim(),
          apellido: data.apellido.trim(),
          correo: data.correo.trim(),
          telefono: data.telefono,
        },
        { canal: "op_cotiza", modelo: modeloHS(data.modelo) },
      );
      track(TRACK.cotizador.submit, { id: modeloHS(data.modelo), origen: "cotizador" });
      setStatus("success");
    } catch (e) {
      setMensaje(mensajeError(e));
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-[15px] lg:gap-[24px] min-[1920px]:gap-[32px]"
    >
      {/* nombre y apellido (mismos campos que el registro de CX) */}
      <div className="grid grid-cols-2 gap-[15px] lg:gap-[24px] max-md:grid-cols-1">
        <div className="relative">
          <img src={userIcon} alt="" aria-hidden="true" className={icon} />
          <input
            id="nombre"
            type="text"
            autoComplete="given-name"
            placeholder="Nombre"
            aria-label="Nombre"
            aria-invalid={!!errors.nombre}
            aria-describedby={errors.nombre ? "nombre-error" : undefined}
            className={input}
            {...register("nombre", {
              required: "Escribe tu nombre",
              minLength: { value: 2, message: "Escribe tu nombre completo" },
            })}
          />
          {errors.nombre && (
            <p id="nombre-error" role="alert" className={error}>
              <ErrorIcon />
              {errors.nombre.message}
            </p>
          )}
        </div>

        <div className="relative">
          <img src={userIcon} alt="" aria-hidden="true" className={icon} />
          <input
            id="apellido"
            type="text"
            autoComplete="family-name"
            placeholder="Apellido"
            aria-label="Apellido"
            aria-invalid={!!errors.apellido}
            aria-describedby={errors.apellido ? "apellido-error" : undefined}
            className={input}
            {...register("apellido", {
              required: "Escribe tu apellido",
              minLength: { value: 2, message: "Escribe tu apellido completo" },
            })}
          />
          {errors.apellido && (
            <p id="apellido-error" role="alert" className={error}>
              <ErrorIcon />
              {errors.apellido.message}
            </p>
          )}
        </div>
      </div>

      {/* teléfono: mismo componente que los demás formularios (valida y entrega E.164) */}
      <PhoneField
        control={control}
        name="telefono"
        id="cotiza-telefono"
        key={guardado?.telefono ?? "sin-lead"}
        defaultValue={guardado?.telefono}
      />

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
          className={`${inputSelect} appearance-none`}
          {...register("modelo", { required: "Selecciona un modelo" })}
        >
          <option value="" disabled>
            Modelo de interés
          </option>
          {modelos.map((m) => (
            <option key={m.valor} value={m.valor} className="text-origen">
              {m.etiqueta}
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

      {/* Tras un envío exitoso no se puede volver a enviar sin elegir "Cotizar otro modelo" */}
      {status !== "success" && (
        <PillButton
          type="submit"
          disabled={isSubmitting}
          iconPosition="end"
          base="border-beige bg-proposito text-beige focus-visible:ring-proposito"
          pressed="active:bg-beige active:text-proposito active:border-proposito"
          className="w-full h-[52px] min-[1920px]:h-[64px] min-[1920px]:mt-[36px] lg:mt-[16px] xl:mt-[28px]"
        >
          {isSubmitting ? "Enviando..." : "Solicitar información"}
          <ArrowIcon className="size-[12px]" />
        </PillButton>
      )}

      <div aria-live="polite">
        {status === "success" && (
          <div className="flex flex-col items-start gap-[12px]">
            <p>¡Gracias! Un asesor se pondrá en contacto contigo pronto.</p>
            <button
              type="button"
              onClick={() => {
                setValue("modelo", "");
                setStatus("idle");
              }}
              className="underline cursor-pointer"
            >
              Cotizar otro modelo
            </button>
          </div>
        )}
        {status === "error" && <p>{mensaje}</p>}
      </div>
    </form>
  );
}