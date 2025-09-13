import { DetalleSave, Factura, FacturaSave, FacturaUpdate } from "@/domain/entities/Facturas";
import { Producto } from "@/domain/entities/Productos";
import { FacturaRepository } from "@/domain/repositories/Factura.repository";
import { RespuestaApi } from "@/types";
import { axios } from "@/utils/axiosConfig";

export class FacturaRepositoryImpl implements FacturaRepository {
  agregarDetalle(producto: Producto, cantidad: number, detalles: Map<string | number, DetalleSave>): RespuestaApi {
    const detalleExistente = detalles.get(producto.id);
    if (detalleExistente) {
      if (detalleExistente.stock < cantidad + detalleExistente.cantidad) {
        return {
          severity: "error",
          summary: "Error",
          detail: "Producto no cuenta con suficiente stock para la venta.",
        };
      }
      const cantidadTotal = detalleExistente.cantidad + cantidad;
      detalleExistente.cantidad = cantidadTotal;
      detalleExistente.importe = cantidadTotal * detalleExistente.precio;
      detalles.set(producto.id, detalleExistente);
      return {
        severity: "success",
        summary: "Exito",
        detail: "Detalle agregado correctamente",
      };
    } else {
      const detalle: DetalleSave = {
        ...producto,
        precio: producto.precioVenta,
        cantidad: cantidad,
        importe: cantidad * producto.precioVenta,
        precioOriginal: producto.precioVenta,
      };

      detalles.set(producto.id, detalle);

      return {
        severity: "success",
        summary: "Exito",
        detail: "Detalle agregado con exito",
      };
    }
  }
  guardarFactura(factura: FacturaSave, detalles: DetalleSave[]): Promise<RespuestaApi> {
    return axios.post("/facturacion", { factura, detalles }).then((res) => res.data);
  }
  actualizarFactura(factura: FacturaUpdate): Promise<RespuestaApi> {
    throw new Error("Method not implemented.");
  }
  getFacturas(fecha: string | Date): Promise<Factura[]> {
    throw new Error("Method not implemented.");
  }
}
