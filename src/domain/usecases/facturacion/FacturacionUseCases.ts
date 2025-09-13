import { RespuestaApi } from "@/types";
import { DetalleSave } from "../../entities/Facturas";
import { FacturaRepository } from "../../repositories/Factura.repository";
import { Producto } from "../../entities/Productos";

export class FacturacionUseCases {
    constructor(private facturaRepository: FacturaRepository){}

    agregarDetalle(producto: Producto, cantidad: number, detalles: Map<string | number, DetalleSave>): RespuestaApi {
        return this.facturaRepository.agregarDetalle(producto, cantidad, detalles);
    }
}
