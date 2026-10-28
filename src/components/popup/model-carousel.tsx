import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { ModeloImage } from "@/data/modelos";
// import RowIcon from "../../assets/icons/row-icon";

interface ModelCarouselProps {
  slides: ModeloImage[];
  onSlideChange?: (index: number) => void;
  onUserSlide?: (index: number) => void;
}

export const ModelCarousel = forwardRef(function Carousel(
  { slides = [], onSlideChange, onUserSlide }: ModelCarouselProps,
  ref,
) {
  const isDragging = useRef(false);
  const autoplay = useRef(Autoplay({ delay: 10000, stopOnInteraction: true }));
  const [currentIndex, setCurrentIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);

  const scrollNext = () => emblaApi?.scrollNext();
  const scrollPrev = () => emblaApi?.scrollPrev();

  // Expone métodos/valores al padre a través del ref
  useImperativeHandle(ref, () => ({
    scrollTo: (index: number, jump = false) => emblaApi?.scrollTo(index, jump),
    scrollNext,
    scrollPrev,
    emblaApi, // por si necesitas acceso directo a la API completa
  }));

  useEffect(() => {
    if (!emblaApi) return;

    const onPointerDown = () => (isDragging.current = true);
    const onSettle = () => (isDragging.current = false);

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setCurrentIndex(index);
      onSlideChange?.(index);
      if (isDragging.current) onUserSlide?.(index);
    };

    emblaApi
      .on("select", onSelect)
      .on("pointerDown", onPointerDown)
      .on("settle", onSettle);

    autoplay.current.play();

    return () => {
      emblaApi
        .off("select", onSelect)
        .off("pointerDown", onPointerDown)
        .off("settle", onSettle);
    };
  }, [emblaApi, onSlideChange, onUserSlide]);

  useEffect(() => {
    if (!emblaApi) return;

    const maxIndex = slides.length - 1;

    if (currentIndex > maxIndex) {
      emblaApi.scrollTo(0, true);
    }
  }, [slides, emblaApi, currentIndex]);

  return (
    <div className="relative embla flex flex-col justify-center w-full h-full">
      <div className="embla__viewport w-full h-full flex" ref={emblaRef}>
        <div className="embla__container flex h-full w-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="embla__slide h-full flex-[0_0_100%] overflow-hidden"
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-full w-full object-cover rounded-tr-[120px]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <div className="hidden absolute top-0 right-1/2 translate-x-[50%] flex justify-center items-center w-[132px] h-[56px] gap-[20px]">
        <button
          onClick={scrollPrev}
          className="group flex justify-center items-center size-[56px] bg-verde-confianza hover:bg-transparent hover:cursor-pointer"
        >
          {/* <RowIcon className="rotate-180 size-[42px] text-celeste-bienestar group-active:text-gris-profundo" /> */}
        </button>
        <button
          onClick={scrollNext}
          className="group flex justify-center items-center size-[56px] bg-verde-confianza hover:bg-transparent hover:cursor-pointer"
        >
          {/* <RowIcon className="size-[42px] text-celeste-bienestar group-active:text-gris-profundo" /> */}
        </button>
      </div>
    </div>
  );
});
