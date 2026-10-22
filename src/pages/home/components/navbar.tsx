import { useState, useEffect } from "react";

// íconos en componentes
import ClickIcon from "@/assets/icons/components/click-icon";
import WarehouseIcon from "@/assets/icons/components/warehouse-icon";
import MathIcon from "@/assets/icons/components/math-icon";
import PinIcon from "@/assets/icons/components/pin-icon";
import PeopleIcon from "@/assets/icons/components/people-icon";
import CallIcon from "@/assets/icons/components/call-icon";

// íconos
import isotipo from "@/assets/logos/main/isotipo.svg";

const links = [
  { id: "proyecto", label: "Proyecto", href: "#proyecto", icon: WarehouseIcon },
  {
    id: "xperiencia",
    label: "Xperiencia",
    href: "#xperiencia",
    icon: ClickIcon,
  },
  {
    id: "cotizador",
    label: "Cotizador",
    href: "#cotizador",
    icon: MathIcon,
  },
  {
    id: "ubicacion",
    label: "Ubicación",
    href: "#ubicacion",
    icon: PinIcon,
  },
  { id: "nosotros", label: "Nosotros", href: "#nosotros", icon: PeopleIcon },
];

const contacto = {
  id: "contacto",
  label: "Contacto",
  href: "#contacto",
  icon: CallIcon,
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  // Cierra el menú móvil al pasar a escritorio
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Resalta el link según la sección visible
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
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

  const pill = `group inline-flex flex justify-center items-center gap-[10px] rounded-[30px] border-2 border-proposito px-[20px] py-[10px] button font-medium text-proposito drop-shadow transition-colors duration-200 
  hover:opacity-65 
  active:opacity-100 active:bg-proposito active:text-horizonte active:border-horizonte
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-proposito focus-visible:ring-offset-2 focus-visible:ring-offset-proposito-4`;

  const pillActive = "text-horizonte-4";

  return (
    <header className="absolute top-0 z-50 w-full bg-beige shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-[74px] max-w-[1366px] items-center justify-between px-4 xl:px-[30px]"
      >
        {/* Logo */}
        <a
          href="#inicio"
          aria-label="Ir al inicio"
          className="flex shrink-0 items-center"
        >
          <img src={isotipo} alt="Isotipo Sendero de Aluna" />
        </a>

        {/* Links escritorio */}
        <ul className="hidden flex-1 items-center justify-evenly lg:flex">
          {links.map(({ id, label, href, icon }) => {
            const IconComponent = icon;
            return (
              <li key={id}>
                <a
                  href={href}
                  aria-current={active === id ? "page" : undefined}
                  className={`${id === "proyecto" ? "w-[140px] xl:w-[160px]" : "w-[160px] xl:w-[194px]"} ${pill} ${active === id ? pillActive : ""}`}
                >
                  <div className="relative flex justify-center items-center size-[20px]">
                    <IconComponent className="w-full h-full text-proposito group-active:text-horizonte" />
                  </div>
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA escritorio */}
        <a
          href={contacto.href}
          className="hidden lg:inline-flex group w-[160px] justify-center items-center gap-[10px] rounded-[30px] bg-impulso border-2 border-beige px-[20px] py-[10px] button font-medium text-beige transition-colors duration-200 hover:bg-impulso hover:opacity-65
          active:text-impulso active:bg-beige active:border-impulso active:opacity-100
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-impulso focus-visible:ring-offset-2 focus-visible:ring-offset-horizonte-4"
        >
          <CallIcon className="text-beige group-active:text-impulso" />
          {contacto.label}
        </a>

        {/* Botón hamburguesa (móvil) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
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
        className={`grid transition-[grid-template-rows] duration-300 lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-3 px-4 pb-6 pt-2 sm:px-6">
            {links.map(({ id, label, href, icon }) => (
              <li key={id}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={active === id ? "page" : undefined}
                  className={`${pill} w-full justify-start ${active === id ? pillActive : ""}`}
                  tabIndex={open ? 0 : -1}
                >
                  {/* <Icon>{icon}</Icon> */}
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={contacto.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="inline-flex w-full items-center justify-start gap-2.5 rounded-full bg-impulso px-6 py-2.5 text-sm font-medium text-horizonte-4 transition-colors duration-200 hover:bg-impulso-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-impulso"
              >
                {/* <Icon>{contacto.icon}</Icon> */}
                {contacto.label}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
