import senderosAluna from "@/assets/logos/main/logo_and_name.svg";
import xperience from "@/assets/logos/xperience.svg";
import { CONTACTO_INFO, NAV_LINKS, SOCIAL_LINKS } from "@/const/nav-links";

export default function Footer() {
  return (
    <div className="flex w-full min-h-[384px] justify-center max-lg:min-h-0">
      <div className="flex flex-col w-full max-w-[1366px] justify-center px-[83px] max-lg:px-[20px] max-lg:pt-[48px] max-lg:pb-[100px] max-lg:gap-[32px] md:max-lg:px-[48px]">
        <div className="w-full flex items-center justify-between max-lg:flex-col max-lg:items-stretch max-lg:gap-[32px]">
          {/* senderos de aluna + xperience */}
          <div className="flex flex-col justify-between w-[274px] h-[226px] max-lg:w-full max-lg:h-auto max-lg:gap-[24px]">
            <div className="flex flex-col">
              <img
                src={senderosAluna}
                alt="Senderos de Aluna"
                className="w-full max-lg:w-[220px]"
              />
              <div className="w-full h-[2.5px] mt-[20px] bg-impulso" />
            </div>
            {/* xperience */}
            <div className="flex flex-col gap-[6px]">
              <p className="caption font-light text-proposito">Página Web</p>
              <img src={xperience} alt="Xperience" className="w-[93px]" />
            </div>
          </div>

          <div className="flex flex-col w-[161px] gap-[24px] max-lg:grid max-lg:grid-cols-2 max-lg:w-full max-lg:gap-[12px] md:max-lg:grid-cols-3">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  href={`${link.href}`}
                  key={link.id}
                  className="group flex items-center px-[20px] py-[8px] gap-[10px] rounded-[30px] button font-medium border transition-colors border-beige text-impulso active:text-beige bg-beige drop-shadow hover:cursor-pointer hover:opacity-60 active:opacity-100 active:bg-impulso"
                >
                  <span className="relative size-[18px]">
                    <Icon className="absolute inset-0 w-full h-full" />
                  </span>
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* contáctanos */}
          <div className="flex flex-col w-[387px] h-[300px] max-lg:w-full max-lg:h-auto px-[20px] py-[30px] gap-[20px] items-start justify-center rounded-[30px] bg-impulso/15">
            <h3 className="subtitle font-bold italic text-origen">
              Contáctanos
            </h3>

            <div className="flex flex-col gap-[20px]">
              {CONTACTO_INFO.map((data, key) => {
                return (
                  <a
                    key={key}
                    href={data.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-[24px]"
                  >
                    <img
                      src={data.icon}
                      alt=""
                      aria-hidden="true"
                      className="size-[44px] shrink-0"
                    />
                    <div className="flex flex-col">
                      <p className="subtitle-caps font-semibold text-origen">
                        {data.title}
                      </p>
                      <p className="regular text-origen">{data.description}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col w-[212px] h-[154px] justify-center px-[20px] py-[30px] gap-[20px] max-lg:w-full max-lg:h-auto max-lg:p-0">
            <h3 className="subtitle font-bold italic">Síguenos</h3>
            <div className="flex items-center gap-[20px]">
              {SOCIAL_LINKS.map((social, index) => {
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex justify-center items-center size-[44px] hover:cursor-pointer"
                  >
                    <img src={social.icon} alt={social.title} className="relative" />
                  </a>
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