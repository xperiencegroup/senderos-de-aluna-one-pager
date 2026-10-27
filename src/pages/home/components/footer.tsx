import senderosAluna from "@/assets/logos/main/logo_and_name.svg";
import xperience from "@/assets/logos/xperience.svg";
import { CONTACTO_INFO, NAV_LINKS, SOCIAL_LINKS } from "@/const/nav-links";

export default function Footer() {
  return (
    <div className="flex w-full min-h-[384px] justify-center">
      <div className="flex flex-col w-full max-w-[1366px] justify-center border px-[83px]">
        <div className="w-full flex items-center justify-between">
          {/* senderos de aluna + xperience */}
          <div className="flex flex-col justify-between w-[274px] h-[226px]">
            <div className="flex flex-col">
              <img src={senderosAluna} className="w-full" />
              <div className="w-full h-[2.5px] mt-[20px] bg-impulso" />
            </div>
            {/* xperience */}
            <img src={xperience} className="w-[93px]" />
          </div>

          <div className="flex flex-col w-[161px] gap-[24px]">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <button className="group flex items-center px-[20px] py-[8px] gap-[10px] rounded-[30px] button font-medium border transition-colors border-beige text-impulso active:text-beige bg-beige drop-shadow hover:cursor-pointer hover:opacity-60 active:opacity-100 active:bg-impulso">
                  <span className="relative size-[18px]">
                    <Icon className="absolute inset-0 w-full h-full" />
                  </span>
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* contáctanos */}
          <div className="flex flex-col w-[387px] h-[300px] px-[20px] py-[30px] gap-[20px] items-start justify-center rounded-[30px] bg-impulso/15">
            <h3 className="subtitle font-bold italic text-origen">
              Contáctanos
            </h3>

            <div className="flex flex-col gap-[20px]">
              {CONTACTO_INFO.map((data, key) => {
                return (
                  <div key={key} className="flex items-center gap-[24px]">
                    <img src={data.icon} className="size-[44px]" />
                    <div className="flex flex-col">
                      <p className="subtitle-caps font-semibold text-origen">
                        {data.title}
                      </p>
                      <p className="regular text-origen">{data.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col w-[212px] h-[154px] justify-center px-[20px] py-[30px] gap-[20px]">
            <h3 className="subtitle font-bold italic">Síguenos</h3>
            <div className="flex items-center gap-[20px]">
              {SOCIAL_LINKS.map((social, index) => {
                return (
                  <div
                    key={index}
                    className="relative flex justify-center items-center size-[44px]"
                  >
                    <img src={social.icon} className="relative" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* caption */}
        <p className="caption font-light text-proposito">
          © 2026 SENDEROS DE ALUNA. Todos los derechos reservados
        </p>
      </div>
    </div>
  );
}
