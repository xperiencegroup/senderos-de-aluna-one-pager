import { useForm } from "react-hook-form";
import FillButton from "@/components/fill-button";
import ArrowIcon from "@/assets/icons/components/arrow-icon";
import userIcon from "@/assets/icons/form/user-icon.svg";
import mailIcon from "@/assets/icons/form/mail-icon.svg";
import {
  AvisoPrivacidad,
  Field,
  PhoneField,
  apellidoRules,
  correoRules,
  inputClass,
  nombreRules,
  privacidadRules,
} from "@/components/forms/fields";
import type { DatosLead } from "@/types/xperience-form";

// Mismos campos y textos que PasoDatos de CX; la casilla de privacidad es solo del one pager.

type Values = DatosLead & { privacidad: boolean };

type Props = {
  defaults?: Partial<DatosLead>;
  enviando: boolean;
  error: string | null;
  onEnviar: (datos: DatosLead) => void;
};

export default function TusDatos({ defaults, enviando, error, onEnviar }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    mode: "onTouched",
    defaultValues: {
      nombre: defaults?.nombre ?? "",
      apellido: defaults?.apellido ?? "",
      correo: defaults?.correo ?? "",
      telefono: "",
      privacidad: false,
    },
  });

  const onSubmit = (v: Values) =>
    onEnviar({
      nombre: v.nombre.trim(),
      apellido: v.apellido.trim(),
      correo: v.correo.trim(),
      telefono: v.telefono,
    });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-[28px] short:gap-[16px]"
    >
      <h3 className="hero font-semibold text-impulso max-md:text-[32px] short:text-[36px]">
        Empecemos por conocerte
      </h3>

      <div className="grid grid-cols-2 gap-[24px] short:gap-y-[16px] max-md:grid-cols-1 max-md:gap-[28px]">
        <Field
          id="ob-nombre"
          label="Nombre*"
          icon={userIcon}
          error={errors.nombre?.message}
        >
          <input
            id="ob-nombre"
            type="text"
            autoComplete="given-name"
            placeholder="Tu nombre"
            aria-invalid={!!errors.nombre}
            aria-describedby={errors.nombre ? "ob-nombre-error" : undefined}
            className={inputClass}
            {...register("nombre", nombreRules)}
          />
        </Field>

        <Field
          id="ob-apellido"
          label="Apellido*"
          icon={userIcon}
          error={errors.apellido?.message}
        >
          <input
            id="ob-apellido"
            type="text"
            autoComplete="family-name"
            placeholder="Tu apellido"
            aria-invalid={!!errors.apellido}
            aria-describedby={errors.apellido ? "ob-apellido-error" : undefined}
            className={inputClass}
            {...register("apellido", apellidoRules)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-[24px] short:gap-y-[16px] max-md:grid-cols-1 max-md:gap-[28px]">
        <Field
          id="ob-correo"
          label="Correo*"
          icon={mailIcon}
          error={errors.correo?.message}
        >
          <input
            id="ob-correo"
            type="email"
            autoComplete="email"
            placeholder="tu@correo.com"
            aria-invalid={!!errors.correo}
            aria-describedby={errors.correo ? "ob-correo-error" : undefined}
            className={inputClass}
            {...register("correo", correoRules)}
          />
        </Field>

        <PhoneField
          control={control}
          name="telefono"
          id="ob-telefono"
          label="Teléfono*"
        />
      </div>

      <AvisoPrivacidad
        id="ob-privacidad"
        registro={register("privacidad", privacidadRules)}
        error={errors.privacidad?.message}
      />

      <div aria-live="polite">
        {error && <p className="regular text-impulso">{error}</p>}
      </div>

      <div className="flex justify-end pt-[8px] short:pt-0">
        <FillButton
          type="submit"
          variant="impulso"
          Icon={ArrowIcon}
          iconSize={16}
          disabled={enviando}
        >
          {enviando ? "Verificando…" : "Confirmar"}
        </FillButton>
      </div>
    </form>
  );
}