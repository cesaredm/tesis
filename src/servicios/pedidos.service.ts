import { axios } from "@/utils/axiosConfig";
import { PedidoSave, Pedido, RespuestaApi, DetallesPedidoSave, PedidoUpdate } from "@/types";
class PedidosService {
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
}

export const pedidosService = new PedidosService();
