import FillButton from "@/components/fill-button";
import ArrowIcon from "@/assets/icons/components/arrow-icon";
import { CheckIcon } from "@/components/forms/fields";
import { urlCX } from "@/lib/leads";
import { track } from "@/lib/track";

// Mismos textos que PasoConfirmacion de CX. Solo se muestra a contactos nuevos.

type Props = {
  nombre: string;
  folio: string | null;
  token: string;
};

export default function Confirmacion({ nombre, folio, token }: Props) {
  return (
    <div className="flex flex-col gap-[24px]">
      <p className="subtitle text-impulso">
        Hola, <span className="font-bold italic">{nombre}</span>
      </p>

      <h3 className="subtitle text-impulso">
        <span className="font-bold italic">Senderos de Aluna</span> te está
        esperando
      </h3>

      {folio && (
        <div className="self-start flex flex-col gap-[4px] px-[28px] py-[20px] rounded-[10px] border border-origen bg-white">
          <span className="regular italic text-origen">Tu folio</span>
          <span className="regular font-semibold italic text-origen select-text">
            {folio}
          </span>
        </div>
      )}

      <p className="regular text-origen">
        Te enviamos tu folio y el brochure de Senderos de Aluna a tu correo.
        Guárdalo: si visitas el showroom, con este código continuamos tu
        experiencia desde donde la dejaste.
      </p>

      {/* El correo lo envía el workflow de HubSpot al registrarse el folio */}
      <p className="flex items-center gap-[12px] regular text-proposito">
        <CheckIcon /> Correo enviado
      </p>

      <FillButton
        href={urlCX(token)}
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