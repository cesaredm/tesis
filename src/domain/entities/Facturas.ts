import { Producto } from "./Productos";

export interface Detalle {
  id: number;
  codigoBarra?: string;
  cantidad: number;
  descripcion: string;
  precio: number;
  importe: number;
  precioVenta: number;
  marca?: string;
  modelo?: string;
}

export interface Factura {
  id: number;
  fecha: string;
  empleadoid: string;
  clienteid?: string;
  creditoid?: number;
  avalid?: string;
  empleadofullname: string;
  clientefullname?: string;
  creditofullname?: string;
  total: number;
  detalles: Detalle[];
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
  producto: number;
  cantidad: number;
  precio: number;
  importe: number;
  precioOriginal: number;
}
