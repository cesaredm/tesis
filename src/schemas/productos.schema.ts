import {z} from "zod";

export const KardexSchema = z.object({
  fecha: z.string({ required_error: "La fecha es requerida", invalid_type_error: "La fecha debe ser una cadena de texto" }),
  producto: z.number({ required_error: "El ID del producto es requerido", invalid_type_error: "El ID del producto debe ser un número" }).positive({ message: "El ID del producto debe ser un número positivo" }),
  tipoMovimiento: z.enum(["Ingreso", "Salida"], { required_error: "El tipo de movimiento es requerido", invalid_type_error: "El tipo de movimiento debe ser 'Ingreso' o 'Salida'" }),
  cantidad: z.number({ required_error: "La cantidad es requerida", invalid_type_error: "La cantidad debe ser un número" }).positive({ message: "La cantidad debe ser un número positivo" }),
  nota: z.string({ required_error: "La nota es requerida", invalid_type_error: "La nota debe ser una cadena de texto" }),
  empleado: z.number({ required_error: "El ID del empleado es requerido", invalid_type_error: "El ID del empleado debe ser un número" }).positive({ message: "El ID del empleado debe ser un número positivo" }),
});