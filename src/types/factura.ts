import { Producto } from "./producto";

export interface Factura {
  id: number;
  fecha: string;
  empleado: string;
  cliente?: string;
}

export interface FacturaSave {
  fecha: string | Date;
  credito: number | null;
}

export interface DetalleSave extends Producto{
  cantidad: number;
  precio: number;
  importe: number;
  precioOriginal: number;
}

