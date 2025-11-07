import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { ClientesUseCases } from "../domain/usecases/ClientesUseCases";
import { ClientesRepository } from "@/domain/repositories/Clientes.repository";
import { ClientesRepositoryImpl } from "@/infra/repositories/ClientesRepositoryImpl";
import { Cliente, ClienteSave } from "@/domain/entities/Clientes";
import { PagoSave } from "@/domain/entities/Pagos";

const clientesRepository: ClientesRepository = new ClientesRepositoryImpl();
const clientesUseCases: ClientesUseCases = new ClientesUseCases(clientesRepository);

export function useGuardarClienteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cliente: ClienteSave) => clientesUseCases.guardarCliente(cliente),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    },
  });
}

export function useActualizarClienteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cliente: Cliente) => clientesUseCases.actualizarCliente(cliente),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    },
  });
}

export function useGetClientesQuery() {
  return useQuery({
    queryKey: ["clientes"],
    staleTime: 1000 * 60 * 5, // 5 minutos
    queryFn: () => clientesUseCases.getClientes(),
  });
}

export function useGetAvalesQuery() {
  return useQuery({
    queryKey: ["avales"],
    staleTime: 1000 * 60 * 5, // 5 minutos
    queryFn: () => clientesUseCases.getAvales(),
  });
}

export function useGetPagosQuery(cliente: number) {
  const pagos = useQuery({
    queryKey: ["pagos", cliente],
    staleTime: 1000 * 60 * 5, // 5 minutos
    queryFn: () => clientesUseCases.getPagos(cliente),
  });

  return pagos;
}

export function useGenerarPagoMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (pago: PagoSave) => clientesUseCases.generarPago(pago),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pagos"] });
      queryClient.invalidateQueries({ queryKey: ["creditos"] });
    },
  });

  return mutation;
}

export function useEliminarPagoMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => clientesUseCases.eliminarPago(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pagos"] });
      queryClient.invalidateQueries({ queryKey: ["creditos"] });
    },
  });

  return mutation;
}
