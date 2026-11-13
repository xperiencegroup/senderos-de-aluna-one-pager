import { TRACK } from "@/analytics/track.constants";
import senderosAluna from "@/assets/logos/main/logo_and_name.svg";
import xperience from "@/assets/logos/xperience.svg";
import { CONTACTO_INFO, NAV_LINKS, SOCIAL_LINKS } from "@/const/nav-links";
import { track } from "@/lib/track";

export default function Footer() {
  return (
    <div
      id="contacto"
      className="flex w-full min-h-[384px] justify-center max-lg:min-h-0"
    >
      <div className="flex flex-col w-full max-w-[1366px] min-[1920px]:max-w-[88vw] justify-center px-[5px] md:px-[20px] xl:px-[70px] max-lg:px-[20px] max-lg:pt-[48px] max-lg:pb-[100px] max-lg:gap-[32px] md:max-lg:px-[48px]">
        <div className="w-full flex items-center justify-between max-lg:flex-col max-lg:items-stretch portrait:gap-[20px] gap-[20px] lg:gap-[10px] xl:gap-[32px]">
          {/* senderos de aluna + xperience */}
          <div className="self-center flex flex-col justify-between items-center lg:items-start w-[274px] lg:h-[226px] lg:mr-[48px] min-[1920px]:mr-[80px]">
            <div className="w-full lg:fit flex flex-col items-center">
              <img
                src={senderosAluna}
                alt="Senderos de Aluna"
                className="w-full max-lg:w-[220px]"
              />
              <div className="w-full h-[2.5px] mt-[20px] bg-impulso" />
            </div>

            {/* xperience */}
            <div className="inline-flex items-center gap-[12px] self-center lg:self-start max-lg:mt-[24px] rounded-full bg-impulso px-[16px] py-[8px]">
              <p className="caption font-medium whitespace-nowrap text-beige">
                Desarrollo web por
              </p>
              <span
                aria-hidden="true"
                className="h-[16px] w-px bg-impulso/40"
              />
              <img
                src={xperience}
                alt="Xperience"
                className="h-[28px] w-auto"
              />
            </div>
          </div>

          {/* links */}
          <div
            className="flex flex-col w-[161px] gap-[24px]
            max-lg:flex-row max-lg:flex-wrap max-lg:justify-center max-lg:gap-[12px]
            max-lg:w-full max-lg:max-w-[334px] max-lg:mx-auto"
          >
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() =>
                    track(TRACK.nav.item, { id: link.id, origen: "footer" })
                  }
                  className="group flex items-center px-[20px] py-[8px] gap-[10px] rounded-[30px] button font-medium border transition-colors border-beige text-impulso active:text-beige bg-beige drop-shadow hover:cursor-pointer hover:opacity-60 active:opacity-100 active:bg-impulso
                  max-lg:w-[calc(50%-6px)]"
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
          <div className="max-lg:self-center flex flex-col w-full max-w-[387px] lg:w-[387px] h-[300px] max-lg:w-full max-lg:h-auto px-[20px] py-[30px] gap-[20px] items-start justify-center rounded-[30px] bg-impulso/15">
            <h3 className="subtitle font-bold italic text-origen">
              Contáctanos
            </h3>

            <div className="flex flex-col gap-[20px]">
              {CONTACTO_INFO.map((data, key) => {
                return (
                  <a
                    key={key}
                    href={data.href}
                    onClick={() =>
                      track(TRACK.contact.click, {
                        id: data.id,
                        origen: "footer",
                      })
                    }
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

          <div className="max-lg:self-center flex flex-col w-full max-w-[338px] lg:w-[212px] h-[154px] max-lg:items-center justify-center px-[20px] py-[30px] gap-[20px] max-lg:w-full max-lg:h-auto max-lg:p-0">
            <h3 className="max-lg:text-center subtitle italic">
              Síguenos <br /> <span className="font-bold ">@viveenaluna</span>
            </h3>

            <div className="flex items-center gap-[20px]">
              {SOCIAL_LINKS.map((social, index) => {
                return (
                  <a
                    key={index}
                    href={social.href}
                    onClick={() =>
                      social.id === "whatsapp"
                        ? track(TRACK.contact.whatsapp, { origen: "footer" })
                        : track(TRACK.social.click, {
                            id: social.id,
                            origen: "footer",
                          })
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex justify-center items-center size-[44px] hover:cursor-pointer"
                  >
                    <img
                      src={social.icon}
                      alt={social.title}
                      className="relative"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* caption */}
        <p className="caption max-lg:text-center font-light text-proposito">
          © 2026 SENDEROS DE ALUNA. Todos los derechos reservados
        </p>
      </div>
    </div>
  );
}
