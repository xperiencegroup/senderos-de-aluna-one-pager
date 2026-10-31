import { useForm } from "react-hook-form";
import FillButton from "@/components/fill-button";
import ArrowIcon from "@/assets/icons/components/arrow-icon";
import userIcon from "@/assets/icons/form/user-icon.svg";
import mailIcon from "@/assets/icons/form/mail-icon.svg";
import {
  Field,
  PhoneField,
  correoRules,
  inputClass,
  nombreRules,
} from "@/components/forms/fields";
import type { DatosLead } from "@/types/xperience-form";

type Values = { nombre: string; correo: string; telefono: string };

type Props = {
  defaults?: Partial<DatosLead>;
  onNext: (datos: DatosLead) => void;
};

export default function TusDatos({ defaults, onNext }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    mode: "onTouched",
    defaultValues: {
      nombre: defaults?.nombre ?? "",
      correo: defaults?.correo ?? "",
      telefono: "",
    },
  });

  const onSubmit = (v: Values) =>
    onNext({
      nombre: v.nombre.trim(),
      correo: v.correo.trim(),
      telefono: v.telefono,
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-[28px] short:gap-[16px]">
      <div className="flex flex-col gap-[16px] short:gap-[8px]">
        <h3 className="hero font-semibold text-impulso max-md:text-[32px] short:text-[36px]">
          Empecemos por conocerte
        </h3>
        <p className="regular text-origen short:text-[15px]">
          Estos son los únicos campos obligatorios.
          <br />
          Con esto te abrimos tu folio y te mandamos tu información por{" "}
          <span className="font-semibold italic">WhatsApp y Correo.</span>
        </p>
      </div>

      <Field id="ob-nombre" label="Nombre completo*" icon={userIcon} error={errors.nombre?.message}>
        <input
          id="ob-nombre"
          type="text"
          autoComplete="name"
          placeholder="Tu nombre y apellido"
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? "ob-nombre-error" : undefined}
          className={inputClass}
          {...register("nombre", nombreRules)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-[24px] short:gap-y-[16px] max-md:grid-cols-1 max-md:gap-[28px]">
        <Field id="ob-correo" label="Correo*" icon={mailIcon} error={errors.correo?.message}>
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

        <PhoneField control={control} name="telefono" id="ob-telefono" label="Teléfono*" />
      </div>

      <div className="flex justify-end pt-[8px] short:pt-0">
        <FillButton type="submit" variant="impulso" Icon={ArrowIcon} iconSize={16}>
          Confirmar
        </FillButton>
      </div>
    </form>
  );
}