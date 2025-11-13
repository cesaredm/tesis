import { axios } from "@/utils/axiosConfig";
import { PedidosRepository } from "@/domain/repositories/Pedidos.repository";
import { PedidoSave, Pedido, DetallesPedidoSave, PedidoUpdate, PagoPedidoSave, PagoPedido } from "@/domain/entities/Pedidos";
import { RespuestaApi } from "@/types";
import { format } from "@formkit/tempo";

export class PedidosRepositoryImpl implements PedidosRepository {
  async getPedidos(): Promise<Pedido[]> {
    const { data } = await axios.get("/inventario/pedidos");
    return data;
  }

  async guardarPedido({ pedido, detalles }: { pedido: PedidoSave; detalles: DetallesPedidoSave[] }): Promise<RespuestaApi> {
    const { data } = await axios.post("/inventario/pedidos", { pedido, detalles });
    return data;
  }

  async actualizarPedido(pedido: PedidoUpdate): Promise<RespuestaApi> {
    const { data } = await axios.patch("/inventario/pedidos", pedido);
    return data;
  }

  async pagarPedido(pago: PagoPedidoSave): Promise<RespuestaApi> {
    const parsedData: PagoPedidoSave = {
      ...pago,
      fecha: format({ date: pago.fecha, format: "YYYY-MM-DD HH:mm:ss" }),
    };
    const { data } = await axios.post("/inventario/pedidos/pagos", parsedData);
    return data;
  }

  async getPagoPedido(pedido: number): Promise<PagoPedido[]> {
    const { data } = await axios.get(`/inventario/pedidos/pagos`, { params: { pedido } });
    return data;
  }

  async eliminarPago(pago: number): Promise<RespuestaApi> {
    const { data } = await axios.delete(`/inventario/pedidos/pagos`, { params: { id: pago } });
    return data;
  }
}
