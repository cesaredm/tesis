import { RespuestaApi } from "@/types";
import { DetalleSave, Factura, FacturaSave } from "../../entities/Facturas";
import { FacturaRepository } from "../../repositories/Factura.repository";
import { Producto } from "../../entities/Productos";

export class FacturacionUseCases {
    constructor(private facturaRepository: FacturaRepository){}

    agregarDetalle(producto: Producto, cantidad: number, detalles: Map<string | number, DetalleSave>): RespuestaApi {
        return this.facturaRepository.agregarDetalle(producto, cantidad, detalles);
    }

    getFacturas(fecha: string | Date): Promise<Factura[]> {
        return this.facturaRepository.getFacturas(fecha);
    }

    guardarFactura(factura: FacturaSave, detalles: DetalleSave[]): Promise<RespuestaApi>{
        return this.facturaRepository.guardarFactura(factura, detalles);
    }
}
