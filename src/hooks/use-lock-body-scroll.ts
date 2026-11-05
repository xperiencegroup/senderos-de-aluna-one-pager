import { useEffect } from "react";

/** Bloquea el scroll de la página mientras `locked` sea true */
export function useLockBodyScroll(locked = true) {
  useEffect(() => {
    if (!locked) return;

    const html = document.documentElement;
    const { overflow, paddingRight } = html.style;
    // Evita el "salto" del layout al desaparecer la barra de scroll
    const scrollbar = window.innerWidth - html.clientWidth;

    html.style.overflow = "hidden";
    if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`;

    return () => {
      html.style.overflow = overflow;
      html.style.paddingRight = paddingRight;
    };
  }, [locked]);
}
