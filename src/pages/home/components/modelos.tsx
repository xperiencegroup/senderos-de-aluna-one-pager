import { useSearchParams } from "react-router";
import { modelos, type Modelo } from "@/data/modelos";

import logoIcon from "@/assets/icons/logo-opacity-bg.svg";
import { useMediaQuery } from "@/hooks/use-media-query";
import ModeloCard from "./modelo-card/modelo-card";
import InfiniteCarousel from "@/components/carousel/infinite-carousel";
import { track } from "@/lib/track";
import { TRACK } from "@/analytics/track.constants";

export default function Modelos() {
  const [params, setParams] = useSearchParams();

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const abrirModelo = (modelo: Modelo) => {
    track(TRACK.modelos.open, { id: modelo.id, origen: "modelos" });
    setParams({ modelo: modelo.id });
  };

  return (
    <section
      id="modelos"
      className="relative flex flex-col justify-center items-center min-h-svh bg-impulso px-[83px] py-[48px] text-beige overflow-hidden max-lg:min-h-0 max-lg:px-[20px] max-lg:py-[56px] md:max-lg:px-[48px]"
    >
      {/* logo background */}
      <img
        src={logoIcon}
        alt="Ícono de Senderos de Aluna"
        className="absolute -top-120 -right-30 scale-100 max-lg:hidden"
      />

      {/* content */}
      <div className="relative mx-auto flex max-w-[1366px] flex-col items-center gap-[10px] sm:gap-[24px]">
        <header className="max-sm:w-full flex flex-col items-center gap-[16px]">
          <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] min-[1440px]:text-[48px] min-[1920px]:text-[56px] font-medium leading-tight text-center">
            Cuatro modelos, <br className="sm:hidden" />
            <span className="font-semibold italic">nuevas posibilidades</span>
          </h2>
          <hr className="w-full sm:max-w-[340px] border-0 border-t-2 border-beige" />
        </header>

        <div className="flex max-w-[760px] min-[1440px]:max-w-[860px] min-[1920px]:max-w-[960px] flex-col gap-[16px] text-[clamp(0.85rem,1vw,1rem)] min-[1440px]:text-[18px] min-[1920px]:text-[20px] leading-relaxed">
          <p className="sm:text-center">
            En <span className="font-semibold italic">Senderos de ALUNA</span>{" "}
            sabemos que cada familia es diferente.
            <br />
            Por eso, diseñamos cuatro modelos de casas que ofrecen distintas
            distribuciones y posibilidades para acompañarte en cada etapa de tu
            vida.
          </p>
          <p className="sm:text-center font-semibold italic">
            Explora nuestros modelos y descubre cuál se adapta mejor a ti y a tu
            familia.
          </p>
        </div>
      </div>

      {/* models */}
      {isDesktop ? (
        <div className="relative flex mt-[40px] gap-[8px] xl:gap-[15px] min-[1440px]:gap-[24px] min-[1920px]:gap-[32px]">
          {modelos.map((modelo) => (
            <ModeloCard key={modelo.id} modelo={modelo} onOpen={abrirModelo} />
          ))}
        </div>
      ) : (
        <InfiniteCarousel
          paused={params.has("modelo")}
          className="mt-[24px] self-stretch -mx-[20px] md:-mx-[48px] py-[12px]"
          items={modelos.map((modelo) => (
            <div key={modelo.id} className="px-[8px]">
              <ModeloCard modelo={modelo} onOpen={abrirModelo} />
            </div>
          ))}
        />
      )}
    </section>
  );
}
