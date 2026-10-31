import FillButton from "@/components/fill-button";

// icons
import ArrowIcon from "@/assets/icons/components/arrow-icon";

// logos
import senderosAlunaLogo from "@/assets/logos/main/logo_and_name.svg";
import logoBackground from "@/assets/images/forma-cuestionario-inicial.svg";
import isotipo from "@/assets/logos/main/isotipo.svg";

export default function InitialStep({ nextStep }: { nextStep: () => void }) {
  return (
    <div className="flex w-full h-full justify-center items-center max-lg:min-h-svh">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* background logo */}
        <img
          src={logoBackground}
          alt=""
          aria-hidden="true"
          className="absolute -top-450 max-lg:hidden"
        />

        {/* logo esquinado */}
        <img
          src={isotipo}
          alt=""
          aria-hidden="true"
          className="absolute w-[184px] h-[365px] bottom-0 left-0 max-lg:w-[70px] max-lg:h-auto max-lg:opacity-40"
        />
      </div>

      {/* content */}
      <div className="relative flex flex-col w-[828px] items-center gap-[30px] py-[72px] short:py-[32px] short:gap-[18px] max-lg:w-full max-lg:gap-[22px] max-lg:px-[20px] max-lg:pt-[80px] max-lg:pb-[56px] md:max-lg:px-[48px]">
        {/* logo */}
        <img
          src={senderosAlunaLogo}
          alt="Logo Senderos de Aluna"
          className="w-full max-w-[274px] short:max-w-[200px] max-md:max-w-[190px]"
        />

        {/* title */}
        <h3 className="hero text-center font-semibold short:text-[40px] max-md:text-[30px]">
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
        <p className="text-center subtitle-caps text-impulso max-md:text-[16px] max-md:[&_br]:hidden">
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