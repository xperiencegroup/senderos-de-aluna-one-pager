import ArrowIcon from "@/assets/icons/components/arrow-icon";
import FormaModelo from "@/assets/images/forma-modelo";
import type { Modelo } from "@/data/modelos";

type ModeloCardProps = {
  modelo: Modelo;
  onOpen: (modelo: Modelo) => void;
};

export default function ModeloCard({ modelo, onOpen }: ModeloCardProps) {
  const isGreen = modelo.variant === "green";

  return (
    <div className="@container relative w-[290px] h-[427px] lg:w-[246.5px] lg:h-[363px] xl:w-[290px] xl:h-[427px] min-[1440px]:w-[340px] min-[1440px]:h-[500px] min-[1920px]:w-[400px] min-[1920px]:h-[590px] max-md:w-[260px] max-md:h-[383px] rounded-t-full overflow-hidden bg-proposito drop-shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-1.5">
      <img
        src={modelo.image}
        alt={`Imagen frontal del modelo Aluna ${modelo.numero}`}
        draggable={false}
        className="absolute inset-0 size-full object-cover"
      />

      <div className="relative z-10 flex flex-col size-full justify-end">
        <FormaModelo
          className={`absolute bottom-0 w-full h-auto ${isGreen ? "text-proposito" : "text-beige"}`}
        />

        <div className="relative z-20 flex w-full h-[14.8cqw] items-center justify-between px-[6.9cqw] mb-[5.2cqw]">
          <p
            className={`text-[12cqw] max-md:text-[10.8cqw] leading-none font-bold uppercase whitespace-nowrap ${isGreen ? "text-horizonte" : "text-proposito"}`}
          >
            Aluna {modelo.numero}
          </p>

          <button
            type="button"
            aria-label={`Ver modelo Aluna ${modelo.numero}`}
            onClick={() => onOpen(modelo)}
            className="shrink-0 group flex size-[13cqw] justify-center items-center rounded-full drop-shadow border-1 border-beige bg-impulso transition-opacity hover:cursor-pointer hover:opacity-60 active:opacity-100 active:bg-beige active:border-impulso"
          >
            <ArrowIcon className="size-[5.2cqw] text-beige group-active:text-impulso" />
          </button>
        </div>
      </div>
    </div>
  );
}
