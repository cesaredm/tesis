import { FacturaRepositoryImpl } from "@/infra/repositories/facturacion/FacturaRepositoryImpl";
import { FacturacionUseCases } from "@/domain/usecases/facturacion/FacturacionUseCases";
import { Producto } from "@/domain/entities/Productos";
import { DetalleSave } from "@/domain/entities/Facturas";

const facturaRepository = new FacturaRepositoryImpl();
const facturaUseCases = new FacturacionUseCases(facturaRepository);

export const facturasServices = {
    agregarDetale: (producto: Producto, cantidad: number, detalles: Map<string | number, DetalleSave>) => facturaUseCases.agregarDetalle(producto, cantidad, detalles)
}
