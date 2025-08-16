import { z } from "zod";

export const CreditoSchema = z.object({
  fecha: z.string({ required_error: "La fecha es requerida", invalid_type_error: "La fecha debe ser una cadena de texto" }),
  cliente: z.number({ required_error: "El cliente es requerido", invalid_type_error: "El cliente debe ser un número" }).positive("El cliente debe ser un número positivo"),
  aval: z.number({ required_error: "El aval es requerido", invalid_type_error: "El aval debe ser un número" }).positive("El aval debe ser un número positivo"),
});

export const CreditoSchemaUpdate = CreditoSchema.extend({
  id: z.number({ required_error: "El id es requerido", invalid_type_error: "El id debe ser un número" }).positive({ message: "El id debe ser un número positivo" }),
});

export const AvalSchema = z.object({
  cliente: z.number({ required_error: "El cliente es requerido", invalid_type_error: "El cliente debe ser un número" }).positive("El cliente debe ser un número positivo"),
});