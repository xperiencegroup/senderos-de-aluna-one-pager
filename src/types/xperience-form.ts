export type XperienceData = {
  nombre: string;
  correo: string;
  lada: string;
  telefono: string;
  /** null = aún no responde, false = "Por ahora no, gracias", true = aceptó */
  interes: boolean | null;
};

export const initialData: XperienceData = {
  nombre: "",
  correo: "",
  lada: "+502",
  telefono: "",
  interes: null,
};

// steps/steps.ts
export const STEPS = ["Tus datos", "Interés", "Confirmación"] as const;
