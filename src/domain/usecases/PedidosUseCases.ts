import { PedidosRepository } from "../repositories/Pedidos.repository";
import { Pedido, PedidoSave, PedidoUpdate, PagoPedido, PagoPedidoSave, DetallesPedidoSave } from "../entities/Pedidos";
import { RespuestaApi } from "@/types";

export class PedidosUseCases {
  constructor(private pedidosRepository: PedidosRepository) {}
  async getPedidos(): Promise<Pedido[]> {
    return this.pedidosRepository.getPedidos();
  }
  async guardarPedido({ pedido, detalles }: { pedido: PedidoSave; detalles: DetallesPedidoSave[] }): Promise<RespuestaApi> {
    return this.pedidosRepository.guardarPedido({ pedido, detalles });
  }
  async actualizarPedido(pedido: PedidoUpdate): Promise<RespuestaApi> {
    return this.pedidosRepository.actualizarPedido(pedido);
  }
  async pagarPedido(pago: PagoPedidoSave): Promise<RespuestaApi> {
    return this.pedidosRepository.pagarPedido(pago);
  }
  async getPagoPedido(pedido: number): Promise<PagoPedido[]> {
    return this.pedidosRepository.getPagoPedido(pedido);
  }

  async eliminarPago(pago: number): Promise<RespuestaApi> {
    return this.pedidosRepository.eliminarPago(pago);
  }
}
