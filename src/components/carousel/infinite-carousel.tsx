import { useEffect, useRef, type ReactNode } from "react";

type InfiniteCarouselProps = {
  items: ReactNode[];
  /** Velocidad en px por segundo */
  speed?: number;
  /** Multiplicador de velocidad con el mouse encima (0 = pausa, 1 = no cambia) */
  hoverSpeedFactor?: number;
  /** Detiene el carrusel con un frenado suave (ej. mientras hay un modal abierto) */
  paused?: boolean;
  /** Veces que se repite la lista para cubrir el ancho de pantalla */
  copies?: number;
  className?: string;
};

export default function InfiniteCarousel({
  items,
  speed = 30,
  hoverSpeedFactor = 0.2,
  paused = false,
  copies = 4,
  className = "",
}: InfiniteCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const count = items.length;

  // Se lee dentro del loop sin reiniciar la animación
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || count === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let setWidth = 0;
    let offset = 0;
    let currentSpeed = reduceMotion ? 0 : speed;
    let hovering = false;
    let pressed = false;
    let dragging = false;
    let justDragged = false;
    let startX = 0;
    let lastX = 0;
    let pointerId = -1;
    let raf = 0;
    let last = performance.now();

    // Ancho de un set completo (incluye el espacio entre tarjetas)
    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined;
      const next = track.children[count] as HTMLElement | undefined;
      setWidth = first && next ? next.offsetLeft - first.offsetLeft : 0;
    };

    // Mantiene el offset dentro del 2º set; el salto es invisible
    // porque todos los sets son idénticos
    const wrap = () => {
      if (setWidth <= 0) return;
      while (offset >= setWidth * 2) offset -= setWidth;
      while (offset < setWidth) offset += setWidth;
    };

    measure();
    offset = setWidth; // arranca en el 2º set para poder arrastrar hacia atrás

    const resizeObserver = new ResizeObserver(() => {
      measure();
      wrap();
    });
    resizeObserver.observe(track);

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const target =
        reduceMotion || dragging || pausedRef.current
          ? 0
          : hovering
            ? speed * hoverSpeedFactor
            : speed;

      // Aceleración / frenado suave
      currentSpeed += (target - currentSpeed) * Math.min(1, dt * 6);
      offset += currentSpeed * dt;
      wrap();

      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Hover (solo mouse)
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = false;
    };

    // Arrastre
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      pressed = true;
      pointerId = e.pointerId;
      startX = lastX = e.clientX;
    };
    const onMove = (e: PointerEvent) => {
      if (!pressed) return;
      // Umbral de 5px: un toque normal no cuenta como arrastre
      if (!dragging && Math.abs(e.clientX - startX) > 5) {
        dragging = true;
        viewport.setPointerCapture(pointerId);
        viewport.style.cursor = "grabbing";
      }
      if (dragging) offset -= e.clientX - lastX;
      lastX = e.clientX;
    };
    const onUp = () => {
      pressed = false;
      if (!dragging) return;
      dragging = false;
      justDragged = true;
      setTimeout(() => (justDragged = false), 0);
      viewport.style.cursor = "";
    };

    // Bloquea el clic que el navegador dispara al soltar un arrastre
    const onClickCapture = (e: MouseEvent) => {
      if (!justDragged) return;
      e.preventDefault();
      e.stopPropagation();
    };

    viewport.addEventListener("pointerenter", onEnter);
    viewport.addEventListener("pointerleave", onLeave);
    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);
    viewport.addEventListener("click", onClickCapture, true);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      viewport.removeEventListener("pointerenter", onEnter);
      viewport.removeEventListener("pointerleave", onLeave);
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      viewport.removeEventListener("click", onClickCapture, true);
    };
  }, [count, speed, hoverSpeedFactor]);

  return (
    <div
      ref={viewportRef}
      className={`select-none overflow-hidden cursor-grab touch-pan-y ${className}`}
    >
      <div
        ref={trackRef}
        className="relative flex h-full w-max items-center will-change-transform"
      >
        {Array.from({ length: copies }).flatMap((_, copy) =>
          items.map((item, i) => (
            <div
              key={`${copy}-${i}`}
              aria-hidden={copy !== 1}
              className="flex h-full shrink-0 items-center"
            >
              {item}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
