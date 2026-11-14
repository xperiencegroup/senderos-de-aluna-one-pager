import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";

// components
import PillButton from "@/components/pill-button";
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

// icons
import CloseIcon from "@/assets/icons/components/close-icon";
import ArrowIcon from "@/assets/icons/components/arrow-icon";
import userIcon from "@/assets/icons/form/user-icon.svg";
import mailIcon from "@/assets/icons/form/mail-icon.svg";

// images and logos
import imagen from "@/assets/images/forms/form_brochure/form_brochure_image.webp";
import logo from "@/assets/logos/main/logo_and_name.svg";

// lógica y tipado
import {
  FOLLETO_URL,
  NOMBRE_FOLLETO,
  descargar,
  enviarLead,
  getLeadGuardado,
  mensajeError,
  modeloHS,
} from "@/lib/leads";
import type { Modelo } from "@/data/modelos";
import type { DatosLead } from "@/types/xperience-form";

// tracking
import { track } from "@/lib/track";
import { TRACK } from "@/analytics/track.constants";

// Formulario previo a una descarga: folleto comercial (op_folleto) o ficha técnica de un modelo (op_ficha).
// Si el lead ya está guardado en este navegador, no se muestra: se envía en segundo plano y se descarga.

type Props =
  | { modo: "folleto"; modelo?: undefined; onClose: () => void }
  | { modo: "ficha"; modelo: Modelo; onClose: () => void };

type Values = DatosLead & { privacidad: boolean };

export default function FolletoForm({ modo, modelo, onClose }: Props) {
  const location = useLocation();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [guardado] = useState(() => getLeadGuardado());
  const automatico = useRef(false);

  const esFicha = modo === "ficha";
  const canal = esFicha ? "op_ficha" : "op_folleto";
  const modeloEnvio = esFicha ? modeloHS(modelo.numero) : undefined;
  const origen =
    (location.state as { origen?: string } | null)?.origen ??
    (esFicha ? "modelo_popup" : "directo");

  const descargarArchivo = () => {
    if (esFicha) {
      track(TRACK.modelos.fichaDownload, { id: modelo.id, origen });
      descargar(modelo.ficha, `Ficha técnica Aluna ${modelo.numero}.pdf`);
    } else {
      track(TRACK.folleto.download, { origen });
      descargar(FOLLETO_URL, NOMBRE_FOLLETO);
    }
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    mode: "onTouched",
    defaultValues: {
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      privacidad: false,
    },
  });

  // Lead ya guardado: envío silencioso (registra el interés en HubSpot) + descarga directa
  useEffect(() => {
    if (!guardado || automatico.current) return;
    automatico.current = true;
    enviarLead(guardado, { canal, modelo: modeloEnvio }).catch(() => {
      // no bloquea la descarga
    });
    descargarArchivo();
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Bloqueo de scroll + Escape + foco
  useEffect(() => {
    if (guardado) return;
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
  }, [onClose, guardado]);

  const onSubmit = async (v: Values) => {
    setError(null);
    try {
      await enviarLead(
        {
          nombre: v.nombre.trim(),
          apellido: v.apellido.trim(),
          correo: v.correo.trim(),
          telefono: v.telefono,
        },
        { canal, modelo: modeloEnvio },
      );
      if (!esFicha) track(TRACK.folleto.submit, { origen });
      descargarArchivo();
      onClose();
    } catch (e) {
      setError(mensajeError(e));
    }
  };

  if (guardado) return null;

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
        <div className="relative w-[44%] shrink-0 rounded-tr-[200px] overflow-hidden max-lg:w-full max-lg:h-[240px] max-lg:rounded-tr-[0px]">
          <img
            src={imagen}
            alt="Familia cocinando en una casa de Senderos de Aluna"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <img
            src={logo}
            alt="Senderos de Aluna"
            className="absolute left-[60px] top-[48px] w-[280px] max-lg:left-[20px] max-lg:top-[20px] max-lg:w-[150px]"
          />
        </div>

        {/* formulario */}
        <div className="flex flex-1 justify-center items-center px-[80px] py-[48px] short:py-[24px] max-lg:px-[20px] max-lg:pt-[32px] max-lg:pb-[48px] md:max-lg:px-[48px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col w-full max-w-[640px] gap-[24px] short:gap-[18px]"
          >
            <div className="flex flex-col gap-[16px]">
              <h2
                id="folleto-title"
                className="hero max-md:text-[32px] short:text-[36px]"
              >
                <span className="font-semibold text-proposito">
                  {esFicha ? "Regístrate para descargar" : "Regístrate para recibir"}
                </span>
                <br />
                <span className="font-bold italic text-impulso">
                  {esFicha ? "la ficha técnica" : "más información"}
                </span>
              </h2>
              <p className="subtitle text-proposito max-md:text-[17px]">
                {esFicha ? (
                  <>
                    Conoce todos los detalles del{" "}
                    <span className="font-semibold">Aluna {modelo.numero}</span>.
                  </>
                ) : (
                  <>
                    Conoce todo lo que{" "}
                    <span className="font-semibold">Senderos de Aluna</span>{" "}
                    tiene para ti.
                  </>
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-[16px] max-md:grid-cols-1 max-md:gap-[24px] short:max-md:gap-[18px]">
              {/* nombre */}
              <Field id="fo-nombre" icon={userIcon} error={errors.nombre?.message}>
                <input
                  id="fo-nombre"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Nombre"
                  aria-label="Nombre"
                  aria-invalid={!!errors.nombre}
                  aria-describedby={errors.nombre ? "fo-nombre-error" : undefined}
                  className={inputClass}
                  {...register("nombre", nombreRules)}
                />
              </Field>

              {/* apellido */}
              <Field id="fo-apellido" icon={userIcon} error={errors.apellido?.message}>
                <input
                  id="fo-apellido"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Apellido"
                  aria-label="Apellido"
                  aria-invalid={!!errors.apellido}
                  aria-describedby={errors.apellido ? "fo-apellido-error" : undefined}
                  className={inputClass}
                  {...register("apellido", apellidoRules)}
                />
              </Field>
            </div>

            {/* correo */}
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

            {/* teléfono */}
            <PhoneField control={control} name="telefono" id="fo-telefono" />

            {/* aviso de privacidad */}
            <AvisoPrivacidad
              id="fo-privacidad"
              registro={register("privacidad", privacidadRules)}
              error={errors.privacidad?.message}
            />

            <PillButton
              type="submit"
              disabled={isSubmitting}
              iconPosition="end"
              base="border-beige bg-proposito text-beige focus-visible:ring-proposito"
              pressed="active:bg-beige active:text-proposito active:border-proposito"
              className="w-full h-[52px] mt-[12px] short:mt-0"
            >
              {isSubmitting
                ? "Enviando..."
                : esFicha
                  ? "Descargar ficha técnica"
                  : "Enviar información"}
              <ArrowIcon className="size-[12px]" />
            </PillButton>

            <div aria-live="polite">
              {error && (
                <p className="text-center regular text-impulso">{error}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}