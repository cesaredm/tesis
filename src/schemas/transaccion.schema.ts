import { z } from "zod";

export const TransaccionSchema = z.object({
  fecha: z.string({ required_error: "La fecha es requerida", invalid_type_error: "La fecha debe ser una cadena de texto" }),
  tipo: z.enum(["ingreso", "egreso"]),
  monto: z.number({ invalid_type_error: "El monto debe ser un número", required_error: "El monto es requerido" }).positive("monto debe ser un numero positivo"),
  anotacion: z.string({ invalid_type_error: "La anotación debe ser una cadena de texto" }).optional().nullable(),
});

export const TransaccionSchemaUpdate = TransaccionSchema.extend({
  id: z.number({ required_error: "El id es requerido", invalid_type_error: "El id debe ser un número" }).positive({ message: "El id debe ser un número positivo" }),
});
