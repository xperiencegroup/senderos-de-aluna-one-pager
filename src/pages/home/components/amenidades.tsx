import { useState, type ComponentType, type SVGProps } from "react";
import { AnimatePresence, motion } from "motion/react";
import PillButton from "@/components/pill-button";

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

  return (
    <div id="amenidades" className="flex bg-beige max-lg:flex-col-reverse">
      <div className="flex flex-col justify-center items-center w-full min-h-[100svh] py-[34px] px-[30px] max-lg:min-h-0 max-lg:px-[20px] max-lg:pt-[40px] max-lg:pb-[56px] md:max-lg:px-[48px]">
        <div className="flex flex-col gap-[30px] text-left bg-beige max-lg:w-full max-lg:gap-[20px]">
          <h2 className="hero font-bold text-proposito max-md:text-[34px]">Amenidades</h2>

          <p className="regular w-full max-w-[347px] min-[1440px]:max-w-[420px] max-lg:max-w-none text-origen">
            Espacios pensados para que tu familia crezca, conviva y disfrute
            cada día.
          </p>

          {/* Botones */}
          <ul className="flex flex-col w-full max-w-[300px] min-[1440px]:max-w-[340px] gap-[27px] max-lg:flex-row max-lg:max-w-none max-lg:gap-[12px] max-lg:overflow-x-auto max-lg:snap-x max-lg:-mx-[20px] max-lg:w-[calc(100%+40px)] max-lg:px-[20px] max-lg:py-[6px] md:max-lg:-mx-[48px] md:max-lg:w-[calc(100%+96px)] md:max-lg:px-[48px] [scrollbar-width:none]">
            {amenidades.map((amenidad) => (
              <li key={amenidad.id} className="max-lg:shrink-0 max-lg:snap-start">
                <PillButton
                  Icon={amenidad.Icon}
                  current={selected.id === amenidad.id}
                  onClick={() => setSelected(amenidad)}
                  className="w-full max-lg:w-auto max-lg:whitespace-nowrap"
                >
                  {amenidad.label}
                </PillButton>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* image */}
      <div className="relative shrink-0 w-full min-h-[100svh] max-xl:max-w-[712px] max-w-[65vw] rounded-bl-[200px] overflow-hidden max-lg:max-w-none max-lg:min-h-0 max-lg:h-[320px] md:max-lg:h-[440px] max-lg:rounded-bl-[120px]">
        <AnimatePresence>
          <motion.img
            key={selected.id}
            src={selected.image}
            alt={selected.label}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
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