import FillButton from "@/components/fill-button";

// icons
import AlunaIcon from "@/assets/icons/components/aluna-icon";
import ClickIcon from "@/assets/icons/components/click-icon";
import whatsappIcon from "@/assets/icons/footer/whatsapp-button.svg";

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
        Icon={ClickIcon}
        gap={15}
        aria-label="Iniciar Recorrido Virtual"
      >
        <span className="flex items-center justify-center gap-[15px]">
          <AlunaIcon className="size-[20px] shrink-0" aria-hidden="true" />
          <span className="hidden md:inline whitespace-nowrap">
            Iniciar Recorrido Virtual
          </span>
        </span>
      </FillButton>

      {/* WhatsApp */}
      <a
        href="https://wa.me/50230256073"
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
