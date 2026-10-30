import { useSearchParams } from "react-router";
import { modelos } from "@/data/modelos";

import FormaModelo from "@/assets/images/forma-modelo";

import ArrowIcon from "@/assets/icons/components/arrow-icon";
import logoIcon from "@/assets/icons/logo-opacity-bg.svg";

export default function Modelos() {
  const [, setParams] = useSearchParams();

  return (
    <section
      id="modelos"
      className="relative flex flex-col justify-center items-center min-h-svh bg-impulso px-[83px] py-[48px] text-beige overflow-hidden"
    >
      {/* logo background */}
      <img
        src={logoIcon}
        alt="Ícono de Senderos de Aluna"
        className="absolute -top-120 -right-30 scale-100"
      />

      {/* content */}
      <div className="relative mx-auto flex max-w-[1366px] flex-col items-center gap-[24px] text-center">
        <header className="flex flex-col items-center gap-[16px]">
          <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] min-[1440px]:text-[48px] min-[1920px]:text-[56px] font-medium leading-tight">
            Cuatro modelos,{" "}
            <span className="font-semibold italic">nuevas posibilidades</span>
          </h2>
          <hr className="w-full max-w-[340px] border-0 border-t-2 border-beige" />
        </header>

        <div className="flex max-w-[760px] min-[1440px]:max-w-[860px] min-[1920px]:max-w-[960px] flex-col gap-[16px] text-[clamp(0.85rem,1vw,1rem)] min-[1440px]:text-[18px] min-[1920px]:text-[20px] leading-relaxed">
          <p>
            En <span className="font-semibold italic">Senderos de ALUNA</span>{" "}
            sabemos que cada familia es diferente.
            <br />
            Por eso, diseñamos cuatro modelos de casas que ofrecen distintas
            distribuciones y posibilidades para acompañarte en cada etapa de tu
            vida.
          </p>
          <p className="font-semibold italic">
            Explora nuestros modelos y descubre cuál se adapta mejor a ti y a tu
            familia.
          </p>
        </div>

      </div>

      {/* models */}
      <div className="relative flex mt-[40px] gap-[15px] min-[1440px]:gap-[24px] min-[1920px]:gap-[32px]">
        {modelos.map((modelo) => {
          return (
            <div
              key={modelo.id}
              className="relative w-[290px] h-[427px] min-[1440px]:w-[340px] min-[1440px]:h-[500px] min-[1920px]:w-[400px] min-[1920px]:h-[590px] rounded-t-full overflow-hidden bg-proposito drop-shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-1.5"
            >
              {/* bg image */}
              <img
                src={modelo.image}
                alt={`Imágen frontal modelo ${modelo.id}`}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="relative z-10 flex flex-col w-full h-full justify-end">
                <FormaModelo
                  className={`absolute bottom-0 w-full ${modelo.variant === "green" ? "text-proposito" : "text-beige"}`}
                />

                {/* text */}
                <div className="relative z-20 flex w-full h-[43px] items-center justify-between px-[20px] mb-[15px]">
                  <p
                    className={`modelo-title font-bold uppercase ${modelo.variant === "green" ? "text-horizonte" : "text-proposito"}`}
                  >
                    Aluna {modelo.numero}
                  </p>

                  <button
                    onClick={() => setParams({ modelo: modelo.id })}
                    className="group flex size-[38px] justify-center items-center rounded-full drop-shadow border-1 border-beige bg-impulso transition-opacity hover:cursor-pointer hover:opacity-60 active:opacity-100 active:bg-beige active:border-impulso"
                  >
                    <ArrowIcon className="size-[15px] text-beige group-active:text-impulso" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}