import FillButton from "@/components/fill-button";

// icons
import ArrowIcon from "@/assets/icons/components/arrow-icon";

// logos
import senderosAlunaLogo from "@/assets/logos/main/logo_and_name.svg";
import logoBackground from "@/assets/images/forma-cuestionario-inicial.svg";
import isotipo from "@/assets/logos/main/isotipo.svg";

export default function InitialStep({ nextStep }: { nextStep: () => void }) {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* background logo */}
        <img src={logoBackground} className="absolute -top-450" />

        {/* logo esquinado */}
        <img
          src={isotipo}
          className="absolute w-[184px] h-[365px] bottom-0 left-0"
        />
      </div>

      {/* content */}
      <div className="relative flex flex-col w-[828px] items-center gap-[30px]">
        {/* logo */}
        <img
          src={senderosAlunaLogo}
          alt="Logo Senderos de Aluna"
          className="w-full max-w-[274px]"
        />

        {/* title */}
        <h3 className="hero text-center font-semibold">
          <span className="text-proposito">El lugar donde</span>
          <br />
          <span className="font-bold italic text-impulso">
            nace tu historia
          </span>
          <br />
          <span className="text-proposito">y florece tu futuro</span>
        </h3>

        {/* divider */}
        <div className="w-full max-w-[470px] h-[2px] bg-impulso" />

        {/* description */}
        <p className="text-center subtitle-caps text-impulso">
          <span className="font-semibold">Senderos de ALUNA</span> es un
          condominio cerrado en Villa Nueva,
          <br />
          conformado por 209 casas, respaldado por FHA y construido por{" "}
          <span className="font-semibold">Grupo MR2.</span>
          <br />
          <span className="font-semibold">Antes de entrar a explorar.</span>
          <br />
          <span className="font-bold italic">Cuéntanos un poco de ti.</span>
        </p>

        {/* botón comenzar */}
        <FillButton
          onClick={nextStep}
          variant="impulso"
          Icon={ArrowIcon}
          iconSize={16}
          className="h-[44px]"
        >
          Comenzar Experiencia
        </FillButton>
      </div>
    </div>
  );
}
