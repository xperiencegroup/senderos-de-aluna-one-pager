/** Pasos del onboarding (el paso 0 es la pantalla de entrada) */
export const STEPS = ["Tus datos", "Interés", "Confirmación"] as const;

/** Estado completo del formulario (versión previa, se conserva) */
export type XperienceData = {
  nombre: string;
  apellidos: string;
  correo: string;
  lada: string;
  telefono: string;
};

export const initialData: XperienceData = {
  nombre: "",
  apellidos: "",
  correo: "",
  lada: "+502",
  telefono: "",
};

/** Datos del lead capturados en el paso 1 (teléfono ya en E.164) */
export type DatosLead = {
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string; // ej. +50243211234
};

/** Respuesta del registro (lo que muestra el paso 3) */
export type ResultadoRegistro = {
  folio: string | null; // pendiente: lógica del folio
  whatsappEnviado: boolean; // pendiente: workflow de HubSpot
  correoEnviado: boolean; // pendiente: workflow de HubSpot
};
