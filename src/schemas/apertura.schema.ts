import { z } from "zod";

export const AperturaSchema = z.object({
  fecha: z.string({ required_error: "La fecha es requerida", invalid_type_error: "La fecha debe ser una cadena de texto" }),
  monto: z.number({ required_error: "El monto es requerido", invalid_type_error: "El monto debe ser un número" }).positive("El monto debe ser un número positivo").min(0.01, "El monto debe ser mayor a 0.01"),
});
