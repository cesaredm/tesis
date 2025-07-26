import { Pedido, PedidoSave, PedidoUpdate, PagoPedido, PagoPedidoSave, DetallesPedidoSave } from "../entities/Pedidos";
import { RespuestaApi } from "@/types";
export interface PedidosRepository {
  getPedidos(): Promise<Pedido[]>;
  guardarPedido({ pedido, detalles }: { pedido: PedidoSave; detalles: DetallesPedidoSave[] }): Promise<RespuestaApi>;
  actualizarPedido(pedido: PedidoUpdate): Promise<RespuestaApi>;
  pagarPedido(pago: PagoPedidoSave): Promise<RespuestaApi>;
  getPagoPedido(pedido: number): Promise<PagoPedido[]>;
}
