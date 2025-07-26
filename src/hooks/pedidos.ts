import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PedidoSave, PedidoUpdate, DetallesPedidoSave, PagoPedidoSave } from "@/domain/entities/Pedidos";
import { PedidosRepository } from "@/domain/repositories/Pedidos.repository";
import { PedidosRepositoryImpl } from "@/infra/repositories/PedidosRepositoryImpl";
import { PedidosUseCases } from "@/domain/usecases/PedidosUseCases";

const pedidosRepository: PedidosRepository = new PedidosRepositoryImpl();
const pedidosUseCases: PedidosUseCases = new PedidosUseCases(pedidosRepository);

export function useGetPedidosQuery() {
  const pedidos = useQuery({
    queryKey: ["pedidos"],
    queryFn: () => pedidosUseCases.getPedidos(),
  });

  return {
    ...pedidos,
  };
}
export function useGuardarPedidoMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ pedido, detalles }: { pedido: PedidoSave; detalles: DetallesPedidoSave[] }) => pedidosUseCases.guardarPedido({ pedido, detalles }),
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
    mutationFn: (pedido: PedidoUpdate) => pedidosUseCases.actualizarPedido(pedido),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pedidos"] });
    },
  });

  return {
    ...mutation,
  };
}

export function useGuardarPagoPedidoMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (pago: PagoPedidoSave) => pedidosUseCases.pagarPedido(pago),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pedidos"] });
    },
  });

  return {
    ...mutation,
  };
}
