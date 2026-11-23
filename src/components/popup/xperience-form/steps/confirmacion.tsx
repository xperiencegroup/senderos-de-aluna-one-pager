import FillButton from "@/components/fill-button";
import ArrowIcon from "@/assets/icons/components/arrow-icon";
import { urlCX } from "@/lib/leads";
import { track } from "@/lib/track";

// Solo se muestra a quien recibe folio nuevo (lógica en xperience-form).
// El folio se genera y se envía por correo desde el backend; aquí ya no se muestra.

type Props = {
  nombre: string;
  folio: string | null;
  token: string;
};

export default function Confirmacion({ nombre, token }: Props) {
  return (
    <div className="flex flex-col gap-[24px]">
      <p className="subtitle text-impulso">
        Hola, <span className="font-bold italic">{nombre}</span>
      </p>

      <h3 className="subtitle text-impulso">
        <span className="font-bold italic">Senderos de Aluna</span> te está
        esperando
      </h3>

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