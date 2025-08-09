import { z } from "zod";

export const UsuarioSchema = z.object({
  usuario: z.string({ required_error: "El usuario es requerido", invalid_type_error: "El usuario debe ser una cadena de texto" }),
  password: z.string({ required_error: "La contraseña es requerida", invalid_type_error: "La contraseña debe ser una cadena de texto" }),
  empleado: z.number({ required_error: "El empleado es requerido", invalid_type_error: "El empleado debe ser un número" }).positive({ message: "El empleado debe ser un número positivo" }),
  permiso: z.string({ required_error: "El permiso es requerido", invalid_type_error: "El permiso debe ser una cadena de texto" }),
});

export const UsuarioSchemaUpdate = UsuarioSchema.extend({
  id: z.number({ required_error: "El id es requerido", invalid_type_error: "El id debe ser un número" }).positive({ message: "El id debe ser un número positivo" }),
});
