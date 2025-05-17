import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pedidosService } from "@/servicios/pedidos.service";
import { PedidoSave, PedidoUpdate, DetallesPedidoSave } from "@/types";

export function useGetPedidosQuery() {
  const pedidos = useQuery({
    queryKey: ["pedidos"],
    queryFn: () => pedidosService.getPedidos(),
  });

  return {
    ...pedidos,
  };
}
export function useGuardarPedidoMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ pedido, detalles }: { pedido: PedidoSave; detalles: DetallesPedidoSave[] }) => pedidosService.guardarPedido({ pedido, detalles }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pedidos"] });
    },
  });

  return {
    ...mutation,
  };
}
export function useActualizarPedidoMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (pedido: PedidoUpdate) => pedidosService.actualizarPedido(pedido),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pedidos"] });
    },
  });

  return {
    ...mutation,
  };
}
