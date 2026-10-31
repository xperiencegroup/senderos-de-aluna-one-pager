import type { CSSProperties } from "react";
import FillButton from "@/components/fill-button";

// icons
import AlunaIcon from "@/assets/icons/components/aluna-icon";
import ClickIcon from "@/assets/icons/components/click-icon";
import whatsappIcon from "@/assets/icons/footer/whatsapp-button.svg";
import { track } from "@/lib/track";

/*
 * Botón compacto con relleno circular en hover:
 * - Bloque de la "A" = 40×40 (pl 20 − 10 de margen negativo + 20 de ícono + pr 10).
 * - Botón interno = 90 px → --icon-area 50 deja el relleno en 40 px (círculo).
 */
const circleFill = { "--icon-area": "50px" } as CSSProperties;

export default function FloatingActions() {
  return (
    <div
      className="fixed z-50 flex items-center gap-2 sm:gap-3
      right-[calc(1rem+env(safe-area-inset-right))] bottom-[calc(1rem+env(safe-area-inset-bottom))]
      md:right-[calc(1.5rem+env(safe-area-inset-right))] md:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]"
    >
      {/* Recorrido virtual */}
      <FillButton
        href="#xperiencia"
        onClick={() => track("iniciar_recorrido", { origen: "flotante" })}
        Icon={ClickIcon}
        gap={20}
        style={circleFill}
        aria-label="Iniciar Recorrido Virtual"
      >
        <AlunaIcon
          className="block size-[20px] -ml-[10px] shrink-0"
          aria-hidden="true"
        />
      </FillButton>

      {/* WhatsApp */}
      <a
        href="https://wa.me/50230256073"
        onClick={() => track("click_whatsapp", { origen: "flotante" })}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="shrink-0 rounded-full drop-shadow transition-transform duration-300
        hover:scale-105 active:scale-95 motion-reduce:transition-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-impulso focus-visible:ring-offset-2"
      >
        <img
          src={whatsappIcon}
          alt=""
          aria-hidden="true"
          className="size-12 md:size-14"
        />
      </a>
    </div>
  );
}