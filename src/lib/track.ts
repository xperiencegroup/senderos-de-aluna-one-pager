type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Envía un evento a GA4. No hace nada si GA4 no cargó (previews, local). */
export function track(event: string, params?: Params) {
  window.gtag?.("event", event, params);
}