import { DetalleSave, Factura, FacturaSave, FacturaUpdate, RespuestaFactura } from "@/domain/entities/Facturas";
import { Producto } from "@/domain/entities/Productos";
import { FacturaRepository } from "@/domain/repositories/Factura.repository";
import { RespuestaApi } from "@/types";
import { axios } from "@/utils/axiosConfig";
import { format } from "@formkit/tempo";

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
        producto: producto.id,
        precio: producto.precioVenta,
        cantidad: cantidad,
        importe: cantidad * producto.precioVenta,
      };

      detalles.set(producto.id, detalle);

      return {
        severity: "success",
        summary: "Exito",
        detail: "Detalle agregado con exito",
      };
    }
  }
  guardarFactura(factura: FacturaSave, detalles: DetalleSave[]): Promise<RespuestaFactura> {
    const fechaFormat = format({ date: new Date(), format: "YYYY-MM-DD", tz: "America/Tegucigalpa" });
    return axios.post("/facturacion", { factura: { ...factura, fecha: fechaFormat }, detalles }).then((res) => res.data);
  }
  actualizarFactura(factura: FacturaUpdate): Promise<RespuestaApi> {
    console.log(factura);
    throw new Error("Method not implemented.");
  }
  async getFacturas(fecha: string | Date): Promise<Factura[]> {
    const formatedDate = format({ date: fecha, format: "YYYY-MM-DD", tz: "America/Tegucigalpa" });
    const { data } = await axios.get("/reportes/facturas", { params: { fecha: formatedDate } });
    return data;
  }

  async devolver(id: number, cantidad: number): Promise<RespuestaApi> {
    const { data } = await axios.post("/facturacion/devolver", { id, cantidad});
    return data;
  }
}
