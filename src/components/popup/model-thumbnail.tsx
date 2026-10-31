import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { ModeloImage } from "@/data/modelos";
import ArrowIcon from "@/assets/icons/components/arrow-icon";

interface ModelThumbnailsProps {
  images: ModeloImage[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ModelThumbnails({
  images,
  selectedIndex,
  onSelect,
  onPrev,
  onNext,
}: ModelThumbnailsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  // Mantiene visible la miniatura seleccionada
  useEffect(() => {
    emblaApi?.scrollTo(selectedIndex);
  }, [emblaApi, selectedIndex]);

  // Recalcula si cambia el número de imágenes (otro modelo)
  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, images.length]);

  return (
    <div className="flex w-full h-full justify-between items-center gap-[12px]">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Imagen anterior"
        className="group flex size-[38px] justify-center items-center rounded-full drop-shadow border-1 border-beige bg-impulso transition-opacity hover:cursor-pointer hover:opacity-60 active:opacity-100 active:bg-beige active:border-impulso"
      >
        <ArrowIcon className="rotate-180 size-[15px] text-beige group-active:text-impulso" />
      </button>

      <div className="embla__viewport min-w-0 flex-1" ref={emblaRef}>
        <div className="flex gap-[16px] py-[4px] pl-[4px]">
          {images.map((image, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={image.src}
                type="button"
                onClick={() => onSelect(index)}
                aria-label={`Ver imagen ${index + 1}`}
                aria-current={isSelected ? "true" : undefined}
                className={`size-[130px] min-[1440px]:size-[150px] min-[1920px]:size-[170px] max-md:size-[88px] max-md:rounded-tr-[22px] shrink-0 cursor-pointer overflow-hidden rounded-tr-[32px] border-2 transition-[border-color,opacity] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-impulso ${
                  isSelected
                    ? "border-impulso opacity-100"
                    : "border-transparent opacity-80 hover:opacity-100"
                }`}
              >
                <img
                  src={image.src}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label="Imagen siguiente"
        className="group flex size-[38px] justify-center items-center rounded-full drop-shadow border-1 border-beige bg-impulso transition-opacity hover:cursor-pointer hover:opacity-60 active:opacity-100 active:bg-beige active:border-impulso"
      >
        <ArrowIcon className="size-[15px] text-beige group-active:text-impulso" />
      </button>
    </div>
  );
}