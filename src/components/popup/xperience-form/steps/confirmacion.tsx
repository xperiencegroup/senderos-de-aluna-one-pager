import FillButton from "@/components/fill-button";
import ArrowIcon from "@/assets/icons/components/arrow-icon";
import { CheckIcon } from "@/components/forms/fields";
import { CX_URL } from "@/lib/leads";
import { track } from "@/lib/track";
import type { ResultadoRegistro } from "@/types/xperience-form";

type Props = {
  nombre: string;
  resultado: ResultadoRegistro;
};

export default function Confirmacion({ nombre, resultado }: Props) {
  const primerNombre = nombre.split(" ")[0];

  return (
    <div className="flex flex-col gap-[24px]">
      <p className="subtitle text-impulso">
        Hola, <span className="font-bold italic">{primerNombre}</span>
      </p>

      <h3 className="subtitle text-impulso">
        <span className="font-bold italic">Senderos de Aluna</span> te está
        esperando
      </h3>

      {/* folio: pendiente la lógica de generación */}
      <div className="self-start flex flex-col gap-[4px] px-[28px] py-[20px] rounded-[10px] border border-origen bg-white">
        <span className="regular italic text-origen">Tu folio</span>
        <span className="regular font-semibold italic text-origen">
          {resultado.folio ?? "Por asignar"}
        </span>
      </div>

      <p className="regular text-origen">
        Te enviamos tu folio y un brochure con la información completa por
        WhatsApp y correo. Guárdalo: si visitas el showroom, este código nos
        permite continuar tu experiencia desde donde la dejaste.
      </p>

      {/* solo se muestran cuando el envío sea real (workflow de HubSpot) */}
      {(resultado.whatsappEnviado || resultado.correoEnviado) && (
        <ul className="flex flex-wrap gap-x-[60px] gap-y-[12px]">
          {resultado.whatsappEnviado && (
            <li className="flex items-center gap-[12px] regular text-proposito">
              <CheckIcon /> WhatsApp enviado
            </li>
          )}
          {resultado.correoEnviado && (
            <li className="flex items-center gap-[12px] regular text-proposito">
              <CheckIcon /> Correo enviado
            </li>
          )}
        </ul>
      )}

      <FillButton
        href={CX_URL}
        onClick={() => track("explorar_cx", { origen: "onboarding" })}
        variant="impulso"
        Icon={ArrowIcon}
        iconSize={16}
        className="self-start"
      >
        Explorar proyectos
      </FillButton>
    </div>
  );
}
