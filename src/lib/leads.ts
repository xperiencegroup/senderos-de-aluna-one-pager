/*
 * Envío de leads del one pager.
 * Único punto de integración: todos los formularios llaman a enviarLead(), que hace POST a
 * /api/onboarding de la app CX (esa API registra en HubSpot y Supabase; aquí no hay llaves).
 * El lead se guarda 7 días en localStorage para no volver a pedir datos.
 */
import type { DatosLead, ResultadoRegistro } from "@/types/xperience-form";
import folletoPdf from "@/assets/fichas/Senderos de Aluna _ Brochure comercial.pdf";

/** Apagar mientras se configura HubSpot: los formularios no se abren. */
export const FORMULARIOS_ACTIVOS = true;
/** Descarga de fichas técnicas en los popups de modelo. */
export const FICHAS_ACTIVAS = true;

/** Folleto comercial */
export const FOLLETO_URL = folletoPdf;
export const NOMBRE_FOLLETO = "Folleto comercial Senderos de Aluna.pdf";

/** URL de la app Click & Xperience (siguiente paso del onboarding) */
export const CX_URL = "https://senderos.aluna.gt";
const API_ONBOARDING = `${CX_URL}/api/onboarding`;

/** TODO: URL del aviso de privacidad (pendiente) */
export const AVISO_PRIVACIDAD_URL = "#";

/** Canales (xp_canal) del one pager. Cada uno debe existir como opción en HubSpot. */
export type Canal = "op_onboarding" | "op_folleto" | "op_cotiza" | "op_ficha";

const KEY = "senderos_de_aluna_onepager_lead";
const DIAS_VIGENCIA = 7;
const VIGENCIA_MS = DIAS_VIGENCIA * 24 * 60 * 60 * 1000;

type Registro = {
  datos: DatosLead;
  guardadoEn: number;
  /** Token de la sesión en CX (para entrar sin volver a registrarse). */
  token?: string;
  exp?: number; // epoch en segundos
};

function leer(): Registro | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const r = JSON.parse(raw) as Partial<Registro>;
    const d = r.datos;
    const valido =
      typeof r.guardadoEn === "number" &&
      Date.now() - r.guardadoEn < VIGENCIA_MS &&
      !!d?.nombre &&
      !!d?.apellido && // registros de la versión anterior (con "apellidos") se descartan
      !!d?.correo &&
      !!d?.telefono;
    if (!valido) {
      localStorage.removeItem(KEY);
      return null;
    }
    return r as Registro;
  } catch {
    return null;
  }
}

/** Se dispara cada vez que se guarda el lead en este navegador. */
export const EVENTO_LEAD_GUARDADO = "senderos-lead-guardado";

function guardar(datos: DatosLead, token: string, exp: number) {
  try {
    const registro: Registro = { datos, guardadoEn: Date.now(), token, exp };
    localStorage.setItem(KEY, JSON.stringify(registro));
    // Avisa a los formularios ya montados (p. ej. Cotiza) para que se precarguen
    window.dispatchEvent(new Event(EVENTO_LEAD_GUARDADO));
  } catch {
    // modo privado / almacenamiento lleno: no bloquea el flujo
  }
}

/** Datos del lead guardados en este navegador (vigentes), o null. */
export function getLeadGuardado(): DatosLead | null {
  return leer()?.datos ?? null;
}

/** "96" → "Aluna 96" (opción de modelos_senderos_de_aluna en HubSpot). */
export const modeloHS = (numero: string) => `Aluna ${numero}`;

/** origen y utm_* de la URL actual. */
function embudo() {
  const p = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const v = p.get(k);
    if (v) utm[k] = v.slice(0, 200);
  }
  return { origen: p.get("origen") ?? undefined, utm };
}

export class ErrorLead extends Error {
  codigo: string;
  constructor(codigo: string) {
    super(codigo);
    this.codigo = codigo;
  }
}

// Mismos mensajes que el registro de CX
const MENSAJES: Record<string, string> = {
  telefono_invalido: "Revisa el número: incluye la lada del país y todos los dígitos.",
  datos_incompletos: "Revisa tus datos: nombre, apellido y correo son obligatorios.",
  error_servidor: "No pudimos completar el registro. Intenta de nuevo en un momento.",
  red: "Sin conexión con el servidor. Revisa tu internet e intenta de nuevo.",
};

export const mensajeError = (e: unknown) =>
  MENSAJES[e instanceof ErrorLead ? e.codigo : ""] ?? MENSAJES.error_servidor;

/** Envía el lead a /api/onboarding. Lanza ErrorLead si falla. */
export async function enviarLead(
  datos: DatosLead,
  opciones: { canal: Canal; modelo?: string },
): Promise<ResultadoRegistro> {
  let res: Response;
  try {
    res = await fetch(API_ONBOARDING, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...datos,
        app: "onepager",
        canal: opciones.canal,
        modelo: opciones.modelo,
        ...embudo(),
      }),
    });
  } catch {
    throw new ErrorLead("red");
  }
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) throw new ErrorLead(String(data.error ?? "error_servidor"));

  const r = data as { token: string; exp: number; existente: boolean; folio: string | null };
  guardar(datos, r.token, r.exp);
  return { existente: r.existente, folio: r.folio, token: r.token };
}

/** Token de CX guardado y vigente en este navegador, o null. */
export function tokenCX(): string | null {
  const r = leer();
  return r?.token && r.exp && r.exp > Date.now() / 1000 ? r.token : null;
}

/** URL de CX con traspaso de sesión (#lead=token) si hay un token vigente. */
export function urlCX(token?: string | null): string {
  const t = token ?? tokenCX();
  return t ? `${CX_URL}/#lead=${t}` : CX_URL;
}

/** Descarga un archivo sin salir de la página */
export function descargar(href: string, nombre: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
}