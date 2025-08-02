import { z } from "zod";
export const PersonaSchema = z.object({
  nombres: z.string({ required_error: "nombre es requerido", invalid_type_error: "nombre debe ser un texto" }).min(1, "nombre es requerido"),
  apellidos: z.string({ invalid_type_error: "apellido debe ser un texto" }).optional().nullable(),
  dni: z.string({ invalid_type_error: "dni debe ser un texto", required_error: "dni es requerido" }).min(1, "dni es requerido"),
  direccion: z.string({ invalid_type_error: "direccion debe ser un texto", required_error: "direccion es requerido" }).min(1, "direccion es requerido"),
  departamento: z.string({ invalid_type_error: "departamento debe ser un texto", required_error: "departamento es requerido" }).min(1, "departamento es requerido"),
  municipio: z.string({ invalid_type_error: "municipio debe ser un texto", required_error: "municipio es requerido" }).min(1, "municipio es requerido"),
  barrio: z.string({ invalid_type_error: "barrio debe ser un texto", required_error: "barrio es requerido" }).min(1, "barrio es requerido"),
  lugarTrabajo: z.string({ invalid_type_error: "lugar de trabajo debe ser un texto", required_error: "lugar de trabajo es requerido" }).min(1, "lugar de trabajo es requerido"),
  telefono: z.string({ invalid_type_error: "telefono debe ser un texto", required_error: "telefono es requerido" }).min(1, "telefono es requerido"),
  foto: z.string({ invalid_type_error: "foto debe ser un texto", required_error: "foto es requerido" }).optional().nullable(),
});

export const PersonaSchemaUpdate = PersonaSchema.extend({
  id: z.number({ invalid_type_error: "El id debe ser un número", required_error: "El id es requerido" }).positive({ message: "El id debe ser un número positivo" }).int("El id debe ser un número entero"),
});
