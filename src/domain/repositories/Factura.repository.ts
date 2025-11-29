import { RespuestaApi } from "@/types";
import { DetalleSave, Factura, FacturaSave, FacturaUpdate, RespuestaFactura } from "../entities/Facturas";
import { Producto } from "../entities/Productos";

export interface FacturaRepository {
  getFacturas(fecha: string | Date): Promise<Factura[]>;
  guardarFactura(factura: FacturaSave, detalles: DetalleSave[]): Promise<RespuestaFactura>;
  actualizarFactura(factura: FacturaUpdate): Promise<RespuestaApi>;
  agregarDetalle(producto: Producto, cantidad: number, detalles: Map<string | number, DetalleSave>): RespuestaApi;
  devolver(id: number, cantidad: number): Promise<RespuestaApi>;
}
