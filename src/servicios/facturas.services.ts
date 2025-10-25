import { FacturaRepositoryImpl } from "@/infra/repositories/facturacion/FacturaRepositoryImpl";
import { FacturacionUseCases } from "@/domain/usecases/facturacion/FacturacionUseCases";
import { Producto } from "@/domain/entities/Productos";
import { DetalleSave, Factura } from "@/domain/entities/Facturas";
import { AxiosError } from "axios";

const facturaRepository = new FacturaRepositoryImpl();
const facturaUseCases = new FacturacionUseCases(facturaRepository);

export const facturasServices = {
  agregarDetale: (producto: Producto, cantidad: number, detalles: Map<string | number, DetalleSave>) => facturaUseCases.agregarDetalle(producto, cantidad, detalles),
};

type Result<T, E> = [T | null, E | null];

export async function getFacturas(fecha: string | Date): Promise<Result<Factura[], AxiosError>> {
  try {
    const facturas = await facturaUseCases.getFacturas(fecha);
    return [facturas, null];
  } catch (error) {
    return [null, error as AxiosError];
  }
}
