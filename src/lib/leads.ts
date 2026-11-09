/*
 * Envío de leads del one-pager.
 * TODO (integración pendiente): conectar con HubSpot o con /api/onboarding de la app CX.
 * Mientras tanto las funciones simulan el envío y solo guardan el lead en localStorage,
 * así los componentes no cambian cuando se conecte el backend.
 */
import type { DatosLead, ResultadoRegistro } from "@/types/xperience-form";
import folletoPdf from "@/assets/fichas/Senderos de Aluna _ Brochure comercial.pdf";

/** Apagar mientras se configura HubSpot: los formularios no se abren. */
export const FORMULARIOS_ACTIVOS = true;
/** Descarga de fichas técnicas en los popups de modelo. */
export const FICHAS_ACTIVAS = false;
const DIAS_VIGENCIA = 7;
const VIGENCIA_MS = DIAS_VIGENCIA * 24 * 60 * 60 * 1000;

/** Folleto comercial */
export const FOLLETO_URL = folletoPdf;
export const NOMBRE_FOLLETO = "Folleto comercial Senderos de Aluna.pdf";

const KEY = "senderos_de_aluna_onepager_lead";

/** URL de la app Click & Xperience (siguiente paso del onboarding) */
export const CX_URL = "https://senderos.aluna.gt";

/** TODO: URL del aviso de privacidad (pendiente) */
export const AVISO_PRIVACIDAD_URL = "#";

type LeadGuardado = DatosLead;

type Registro = {
  datos: LeadGuardado;
  guardadoEn: number;
};

export function getLeadGuardado(): LeadGuardado | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;

    const registro = JSON.parse(raw) as Partial<Registro>;

    // restar tiempo para verificar si no ha caducido
    const vigente =
      typeof registro.guardadoEn === "number" &&
      Date.now() - registro.guardadoEn < VIGENCIA_MS;

    if (!vigente || !registro.datos) {
      localStorage.removeItem(KEY);
      return null;
    }

    return registro.datos;
  } catch {
    return null;
  }
}

function guardarLead(lead: LeadGuardado) {
  try {
    const registro: Registro = { datos: lead, guardadoEn: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(registro));
  } catch {
    // modo privado / almacenamiento lleno: no bloquea el flujo
  }
}

const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Onboarding Xperience (pasos 1 y 2) */
export async function registrarOnboarding(
  datos: DatosLead & { interes: boolean },
): Promise<ResultadoRegistro> {
  guardarLead({ ...getLeadGuardado(), ...datos });
  await esperar(500); // simulación
  return { folio: null, whatsappEnviado: false, correoEnviado: false };
}

/** Formulario del folleto comercial */
export async function solicitarFolleto(datos: DatosLead): Promise<void> {
  guardarLead({ ...getLeadGuardado(), ...datos });
  await esperar(500); // simulación
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
