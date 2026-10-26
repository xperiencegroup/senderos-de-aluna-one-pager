import { useState, type ComponentType, type SVGProps } from "react";
import backgroundImage from "@/assets/images/amenidades-background.jpg";
import PillButton from "@/components/pill-button";

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
};

const amenidades: Amenidad[] = [
  { id: "garita", label: "Garita", Icon: GaritaIcon },
  { id: "salon-social", label: "Salón Social", Icon: SalonIcon },
  { id: "cancha", label: "Cancha Polideportiva", Icon: CanchaIcon },
  { id: "mascotas", label: "Área de Mascotas", Icon: MascotasIcon },
  { id: "juegos", label: "Juegos Infantiles", Icon: JuegosIcon },
  { id: "eventos", label: "Zona de Eventos", Icon: EventosIcon },
  {
    id: "churrasqueras",
    label: "Churrasqueras",
    Icon: ChurrasquerasIcon,
  },
];

export default function Amenidades() {
  const [selected, setSelected] = useState(amenidades[0].id);

  return (
    <div className="flex bg-beige">
      <div className="flex flex-col justify-center items-end w-full min-h-[100svh] py-[34px] pl-[30px]">
        <div className="flex flex-col gap-[30px] text-left bg-beige pr-[42px]">
          <h2 className="hero font-bold text-proposito">Amenidades</h2>

          <p className="regular w-full max-w-[347px] text-origen">
            Espacios pensados para que tu familia crezca, conviva y disfrute
            cada día.
          </p>

          {/* Botones */}
          <ul className="flex flex-col w-full max-w-[300px] gap-[27px]">
            {amenidades.map(({ id, label, Icon }) => (
              <li key={id}>
                <PillButton
                  Icon={Icon}
                  current={selected === id}
                  onClick={() => setSelected(id)}
                  className="w-full"
                >
                  {label}
                </PillButton>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* image */}
      <div className="relative shrink-0 w-full min-h-[100svh] max-xl:max-w-[712px] max-w-[65vw] rounded-bl-[200px] overflow-hidden">
        <img
          src={backgroundImage}
          alt="Familia jugando futbol"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
