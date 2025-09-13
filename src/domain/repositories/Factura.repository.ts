import { RespuestaApi } from "@/types"
import { DetalleSave, Factura, FacturaSave, FacturaUpdate } from "../entities/Facturas"
import { Producto } from "../entities/Productos"

export interface FacturaRepository {
    getFacturas(fecha: string | Date): Promise<Factura[]>
    guardarFactura(factura: FacturaSave, detalles: DetalleSave[]): Promise<RespuestaApi>
    actualizarFactura(factura: FacturaUpdate): Promise<RespuestaApi>
    agregarDetalle(producto: Producto, cantidad: number, detalles: Map<string | number, DetalleSave>): RespuestaApi;

}
