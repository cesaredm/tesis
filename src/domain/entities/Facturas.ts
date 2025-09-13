import { Producto } from "./Productos";

export interface Detalle {
  id: number;
  codigoBarra?: string;
  cantidad: number;
  descripcion: string;
  precio: number;
  importe: number;
}

export interface Factura {
  id: number;
  fecha: string;
  empleado: string;
  cliente?: string;
  credito?: number;
  aval?: string;
  colaborador: string;
  total: number;
  detalles: Detalle[]
}

export interface FacturaSave {
  fecha: string | Date;
  cliente: number | null;
  aval: number | null;
}

export interface FacturaUpdate extends FacturaSave {
  id: number;
}

export interface DetalleSave extends Producto {
  cantidad: number;
  precio: number;
  importe: number;
  precioOriginal: number;
}
