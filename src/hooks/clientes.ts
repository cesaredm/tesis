import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { ClientesUseCases } from "../domain/usecases/ClientesUseCases";
import { ClientesRepository } from "@/domain/repositories/Clientes.repository";
import { ClientesRepositoryImpl } from "@/infra/repositories/ClientesRepositoryImpl";
import { Cliente, ClienteSave } from "@/domain/entities/Clientes";

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
    queryFn: () => clientesUseCases.getClientes(),
  });
}
