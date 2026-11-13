import { useState, type ComponentType, type SVGProps } from "react";
import { AnimatePresence, motion } from "motion/react";
import PillButton from "@/components/pill-button";

import { track } from "@/lib/track";

// images
import garitaImage from "@/assets/images/amenidades/garita.jpg";
import salonSocialImage from "@/assets/images/amenidades/salon-social.jpg";
import canchaImage from "@/assets/images/amenidades/cancha.jpg";
import petParkImage from "@/assets/images/amenidades/pet-park.jpg";
import juegosInfantilesImage from "@/assets/images/amenidades/juegos-infantiles.jpg";
import zonaEventosImage from "@/assets/images/amenidades/zona-eventos.jpg";
import churrasquerasImage from "@/assets/images/amenidades/churrasqueras.jpg";

// icons
import CanchaIcon from "@/assets/icons/components/amenidades/cancha-icon";
import ChurrasquerasIcon from "@/assets/icons/components/amenidades/churrasqueras-icon";
import EventosIcon from "@/assets/icons/components/amenidades/eventos-icon";
import GaritaIcon from "@/assets/icons/components/amenidades/garita-icon";
import JuegosIcon from "@/assets/icons/components/amenidades/juegos-icon";
import MascotasIcon from "@/assets/icons/components/amenidades/mascotas-icon";
import SalonIcon from "@/assets/icons/components/amenidades/salon-icon";
import { TRACK } from "@/analytics/track.constants";

type Amenidad = {
  id: string;
  label: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  image: string;
};

const amenidades: Amenidad[] = [
  { id: "garita", label: "Garita", Icon: GaritaIcon, image: garitaImage },
  {
    id: "salon-social",
    label: "Salón Social",
    Icon: SalonIcon,
    image: salonSocialImage,
  },
  {
    id: "cancha",
    label: "Cancha Polideportiva",
    Icon: CanchaIcon,
    image: canchaImage,
  },
  {
    id: "mascotas",
    label: "Área de Mascotas",
    Icon: MascotasIcon,
    image: petParkImage,
  },
  {
    id: "juegos",
    label: "Juegos Infantiles",
    Icon: JuegosIcon,
    image: juegosInfantilesImage,
  },
  {
    id: "eventos",
    label: "Zona de Eventos",
    Icon: EventosIcon,
    image: zonaEventosImage,
  },
  {
    id: "churrasqueras",
    label: "Churrasqueras",
    Icon: ChurrasquerasIcon,
    image: churrasquerasImage,
  },
];

export default function Amenidades() {
  const [selected, setSelected] = useState(amenidades[0]);

  const onSelect = (amenidad: Amenidad) => {
    if (amenidad.id === selected.id) return; // ya está seleccionada
    setSelected(amenidad);
    track(TRACK.amenidades.select, { id: amenidad.id, origen: "amenidades" });
  };

  return (
    <div
      id="amenidades"
      className="flex bg-beige max-lg:min-h-[max(100svh,700px)] max-lg:flex-col-reverse"
    >
      <div className="flex flex-col justify-center items-center w-full min-h-[100svh] py-[30px] px-[30px] lg:py-[34px] lg:px-[30px] max-lg:min-h-0">
        <div className="flex flex-col gap-[30px] text-left bg-beige max-lg:w-full max-lg:gap-[20px]">
          <h2 className="max-sm:hidden hero font-bold text-proposito max-md:text-[34px]">
            Amenidades
          </h2>

          <p className="regular w-full max-w-[347px] min-[1440px]:max-w-[420px] min-[1920px]:max-w-[520px] max-lg:max-w-none text-origen max-sm:text-center">
            Espacios pensados para que tu familia{" "}
            <br className="max-[550px]:hidden block sm:hidden" /> crezca,
            conviva y disfrute cada día.
          </p>

          {/* Botones desktop*/}
          <ul className="max-sm:hidden max flex flex-wrap flex-col w-full max-w-[300px] min-[1440px]:max-w-[340px] min-[1920px]:max-w-[480px] gap-[27px] min-[1920px]:gap-[34px] max-lg:flex-row max-lg:max-w-none max-lg:gap-[12px] max-lg:overflow-x-auto max-lg:snap-x max-lg:-mx-[20px] max-lg:w-[calc(100%+40px)] max-lg:px-[20px] max-lg:py-[6px] md:max-lg:-mx-[48px] md:max-lg:w-[calc(100%+96px)] md:max-lg:px-[48px] [scrollbar-width:none]">
            {amenidades.map((amenidad) => (
              <li
                key={amenidad.id}
                className="max-lg:shrink-0 max-lg:snap-start"
              >
                <PillButton
                  Icon={amenidad.Icon}
                  current={selected.id === amenidad.id}
                  onClick={() => onSelect(amenidad)}
                  className="w-full max-lg:w-auto max-lg:whitespace-nowrap"
                >
                  {amenidad.label}
                </PillButton>
              </li>
            ))}
          </ul>

          {/* botones mobile */}
          <div className="sm:hidden flex flex-col items-center gap-[14px]">
            {/* nombre de la amenidad seleccionada */}
            <p className="relative h-[28px] w-full overflow-hidden text-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={selected.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="block subtitle font-semibold italic text-proposito"
                >
                  {selected.label}
                </motion.span>
              </AnimatePresence>
            </p>

            <ul className="sm:hidden self-center flex flex-wrap justify-center gap-[6px] max-w-[198px] min-[412px]:max-w-none">
              {amenidades.map((amenidad) => {
                const isSelected = selected.id === amenidad.id;

                return (
                  <li key={amenidad.id} className="shrink-0 snap-start">
                    <button
                      type="button"
                      aria-label={amenidad.label}
                      aria-pressed={isSelected}
                      onClick={() => onSelect(amenidad)}
                      className="group flex size-[45px] items-center justify-center rounded-full
            border-[1.5px] border-proposito bg-beige drop-shadow
            transition-colors duration-200 hover:cursor-pointer hover:opacity-80
            active:bg-proposito active:border-horizonte active:opacity-100
            aria-pressed:bg-proposito aria-pressed:border-horizonte aria-pressed:opacity-100"
                    >
                      {amenidad.Icon && (
                        <amenidad.Icon
                          aria-hidden="true"
                          className="w-[23px] h-fit text-proposito
                group-active:text-horizonte group-aria-pressed:text-horizonte"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* image */}
      <div className="relative shrink-0 w-full min-h-[100svh] max-xl:max-w-[712px] max-w-[65vw] rounded-bl-[200px] overflow-hidden max-lg:max-w-none max-lg:min-h-0 max-lg:flex-1 max-lg:h-[320px] md:max-lg:h-[440px] max-lg:rounded-bl-[120px]">
        <AnimatePresence>
          <motion.img
            key={selected.id}
            src={selected.image}
            alt={selected.label}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.01 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
