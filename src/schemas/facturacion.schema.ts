import { z } from "zod";

export const FacturaSchema = z.object({
  fecha: z.string({ invalid_type_error: "Fecha debe ser una cadena de texto", required_error: "La fecha es requerida" }),
  credito: z.number({ invalid_type_error: "Crédito debe ser un número", required_error: "El crédito es requerido" }).positive("El crédito debe ser un número positivo"),
  empleado: z.number({ invalid_type_error: "Empleado debe ser un número", required_error: "El empleado es requerido" }).positive("El empleado debe ser un número positivo"),
});

export const DetalleFacturaSchema = z.object({
  factura: z.number({ invalid_type_error: "Factura debe ser un número", required_error: "La factura es requerida" }).positive("La factura debe ser un número positivo"),
  producto: z.number({ invalid_type_error: "Producto debe ser un número", required_error: "El producto es requerido" }).positive("El producto debe ser un número positivo"),
  cantidad: z.number({ invalid_type_error: "Cantidad debe ser un número", required_error: "La cantidad es requerida" }).positive("La cantidad debe ser un número positivo"),
  precio: z.number({ invalid_type_error: "Precio debe ser un número", required_error: "El precio es requerido" }).positive("El precio debe ser un número positivo"),
  importe: z.number({ invalid_type_error: "Importe debe ser un número", required_error: "El importe es requerido" }).positive("El importe debe ser un número positivo"),
  precioVenta: z.number({ invalid_type_error: "Precio de venta debe ser un número", required_error: "El precio de venta es requerido" }).nonnegative("El precio de venta debe ser un número positivo o cero"),
});

