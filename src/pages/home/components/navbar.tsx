import { useState, useEffect, useRef } from "react";
import { NAV_LINKS as links, proyectoLinks } from "@/const/nav-links";
import { CONTACTO_DATA as contacto } from "@/const/nav-links";
import { SOCIAL_LINKS } from "@/const/nav-links";
import { motion } from "motion/react";
import { track } from "@/lib/track";

import PillButton from "@/components/pill-button";
import CallIcon from "@/assets/icons/components/call-icon";
import DropdownArrow from "@/assets/icons/components/dropdown-arrow";

// íconos
import isotipo from "@/assets/logos/main/isotipo.svg";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { TRACK } from "@/analytics/track.constants";

const mobileLinks = links.flatMap((link) =>
  link.id === "proyecto" ? proyectoLinks : [link],
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [isProyectoSelected, setIsProyectoSelected] = useState<boolean>(false);
  const proyectoRef = useRef<HTMLLIElement>(null);
  useLockBodyScroll(open);

  // Cierra el menú móvil al pasar a escritorio
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Resalta el link según la sección visible
  useEffect(() => {
    const sections = ["inicio", ...links.map((l) => l.id)]
      .map((id) => document.getElementById(id))
      .filter((s): s is HTMLElement => s !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  // cerrar dropdown al darle click afuera de menu proyecto
  useEffect(() => {
    if (!isProyectoSelected) return;

    // clic o toque fuera del <li> → cierra
    const onPointerDown = (e: PointerEvent) => {
      if (!proyectoRef.current?.contains(e.target as Node)) {
        setIsProyectoSelected(false);
      }
    };
    // Escape → cierra
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsProyectoSelected(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isProyectoSelected]);

  const pill = `group inline-flex flex justify-center items-center gap-[10px] rounded-[30px] border-2 border-proposito px-[20px] py-[10px] button font-medium text-proposito drop-shadow transition-colors duration-200 
  hover:opacity-65 
  active:opacity-100 active:bg-proposito active:text-horizonte active:border-horizonte
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-proposito focus-visible:ring-offset-2 focus-visible:ring-offset-proposito-4`;

  const pillActive = "bg-proposito! text-horizonte! border-horizonte!";

  const ProyectoIcon = links[2].icon;
  return (
    <header className="absolute top-0 z-50 w-full bg-beige shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-[74px] max-w-[1366px] items-center justify-between px-4 xl:px-[30px] min-[1440px]:max-w-none min-[1440px]:px-[60px] 2xl:px-[84px]"
      >
        {/* Logo */}
        <a
          href="#inicio"
          aria-label="Ir al inicio"
          className="flex shrink-0 items-center"
          onClick={() => track(TRACK.nav.logo)}
        >
          <img src={isotipo} alt="Isotipo Sendero de Aluna" />
        </a>

        {/* Links escritorio */}
        <ul className="hidden flex-1 items-center justify-evenly lg:flex min-[1440px]:gap-4">
          {/* nosotros y experiencia */}
          {links.slice(0, 2).map(({ id, label, href, icon }) => (
            <li key={id}>
              <PillButton
                href={href}
                onClick={() => track(TRACK.nav.item, { id })}
                Icon={icon}
                current={active === id}
                className={
                  "w-[160px] xl:w-[194px] min-[1440px]:w-[210px] 2xl:w-[230px]"
                }
              >
                {label}
              </PillButton>
            </li>
          ))}

          {/* Proyecto dropdown */}
          <li
            className={`relative w-[160px] xl:w-[210px] min-[1440px]:w-[226px] 2xl:w-[246px] h-[44px]`}
            ref={proyectoRef}
          >
            <motion.div
              initial={false}
              animate={{ height: isProyectoSelected ? "auto" : 44 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute top-0 left-0 w-[160px] xl:w-[210px] min-[1440px]:w-[226px] 2xl:w-[246px] rounded-[30px] drop-shadow border-2 transition-colors duration-200 ${isProyectoSelected ? "text-horizonte bg-proposito border-horizonte" : "text-proposito bg-beige border-proposito"} overflow-hidden`}
            >
              <button
                onClick={() => {
                  if (!isProyectoSelected)
                    track(TRACK.nav.dropdown, {
                      id: "proyecto",
                      origen: "navbar",
                    });
                  setIsProyectoSelected((prev) => !prev);
                }}
                className={`relative group flex w-full justify-center items-center button font-medium px-[20px] py-[10px] gap-[10px] hover:cursor-pointer`}
              >
                <div className="relative flex justify-center items-center size-[20px]">
                  <ProyectoIcon />
                </div>
                {links[2].label}
                <DropdownArrow
                  className={`w-[20px] transition-transform duration-200 ${isProyectoSelected ? "rotate-180" : "rotate-0"}`}
                />
              </button>

              {/* botónes amenidades, modelos y plano */}
              <motion.div
                initial={false}
                animate={{ opacity: isProyectoSelected ? 1 : 0 }}
                transition={{
                  duration: 0.2,
                  delay: isProyectoSelected ? 0.1 : 0,
                }}
                className="relative flex flex-col w-full px-[5px] pb-[10px] pt-[5px] gap-[5px]"
              >
                {proyectoLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <a
                      href={link.href}
                      onClick={() =>
                        track(TRACK.nav.item, { id: link.id, origen: "navbar" })
                      }
                      key={index}
                      className="group flex justify-center items-center font-medium button px-[20px] py-[10px] gap-[10px] rounded-[30px] border-2 transition-colors duration-200 border-proposito text-proposito bg-beige drop-shadow hover:opacity-65 active:opacity-100 active:text-horizonte active:bg-proposito active:border-horizonte hover:cursor-pointer"
                    >
                      <span className="relative flex justify-center items-center size-[20px]">
                        <Icon className="w-full h-full" />
                      </span>
                      {link.label}
                    </a>
                  );
                })}
              </motion.div>
            </motion.div>
          </li>

          {/* cotizador y ubicación */}
          {links.slice(3, 5).map(({ id, label, href, icon }) => (
            <li key={id}>
              <PillButton
                href={href}
                onClick={() => track(TRACK.nav.item, { id })}
                Icon={icon}
                current={active === id}
                className={
                  "w-[160px] xl:w-[194px] min-[1440px]:w-[210px] 2xl:w-[230px]"
                }
              >
                {label}
              </PillButton>
            </li>
          ))}
        </ul>

        {/* CTA escritorio */}
        <a
          href={contacto.href}
          onClick={() => track(TRACK.contact.click, { origen: "navbar" })}
          className="hidden lg:inline-flex group w-[160px] min-[1440px]:w-[180px] justify-center items-center gap-[10px] rounded-[30px] bg-impulso border-2 border-beige px-[20px] py-[10px] button font-medium text-beige transition-colors duration-200 hover:bg-impulso hover:opacity-65
          active:text-impulso active:bg-beige active:border-impulso active:opacity-100
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-impulso focus-visible:ring-offset-2 focus-visible:ring-offset-horizonte-4"
        >
          <CallIcon className="text-beige group-active:text-impulso" />
          {contacto.label}
        </a>

        {/* Botón hamburguesa (móvil) */}
        <button
          type="button"
          onClick={() => {
            if (!open)
              track(TRACK.nav.mobileMenu, {
                id: open,
                origen: "navbar_mobile",
              });
            setOpen((v) => !v);
          }}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-proposito text-proposito focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-proposito focus-visible:ring-offset-2 focus-visible:ring-offset-horizonte-4 lg:hidden"
        >
          <span
            className={`absolute h-0.5 w-4 rounded bg-current transition-transform duration-200 ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-0.5 w-4 rounded bg-current transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-4 rounded bg-current transition-transform duration-200 ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </nav>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col h-[calc(100svh-74px)] overflow-y-auto px-4 pb-6 pt-2 sm:px-6">
            <ul className="flex flex-col gap-[15px]">
              {mobileLinks.map(({ id, label, href, icon: Icon }) => (
                <li key={id}>
                  <a
                    href={href}
                    onClick={() => {
                      track(TRACK.nav.item, { id, origen: "navbar_mobile" });
                      setOpen(false);
                    }}
                    aria-current={active === id ? "page" : undefined}
                    className={`${pill} w-full justify-start ${active === id ? pillActive : ""}`}
                  >
                    <Icon className="size-[20px]" />
                    {label}
                  </a>
                </li>
              ))}

              <li>
                <a
                  href={contacto.href}
                  onClick={() => {
                    track(TRACK.contact.click, { origen: "navbar_mobile" });
                    setOpen(false);
                  }}
                  className="inline-flex w-full items-center justify-start gap-[10px] rounded-[30px] border-2 border-impulso bg-impulso px-[20px] py-[10px] button font-medium text-beige transition-opacity duration-200 hover:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-impulso"
                >
                  <CallIcon className="size-[20px] text-beige" />
                  {contacto.label}
                </a>
              </li>
            </ul>

            {/* Síguenos */}
            <div className="flex flex-col items-center gap-[16px] pt-[32px]">
              <p className="subtitle text-center text-origen">
                <span className="italic">Síguenos</span>
                <br />
                <span className="font-bold italic">@viveenaluna</span>
              </p>

              <div className="flex items-center gap-[20px]">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.title}
                    href={social.href}
                    onClick={() =>
                      social.title === "WhatsApp"
                        ? track(TRACK.contact.whatsapp, {
                            origen: "navbar_mobile",
                          })
                        : track(TRACK.social.click, {
                            id: social.title.toLowerCase(),
                            origen: "navbar_mobile",
                          })
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex justify-center items-center size-[44px] hover:cursor-pointer"
                  >
                    <img src={social.icon} alt={social.title} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
