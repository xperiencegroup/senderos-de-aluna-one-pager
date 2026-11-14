/** Pasos del onboarding (el paso 0 es la pantalla de entrada). Lo usa stepper.tsx (sin uso por ahora). */
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

/** Datos del lead (mismos campos que el registro de CX; teléfono en E.164) */
export type DatosLead = {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string; // ej. +50243211234
};

/** Respuesta de /api/onboarding */
export type ResultadoRegistro = {
  existente: boolean; // ya existía en HubSpot: entra directo a CX
  folio: string | null; // solo en un contacto nuevo
  token: string; // sesión para entrar a CX sin volver a registrarse
};