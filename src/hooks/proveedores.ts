import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Proveedor, ProveedorSave, ProveedorUpdate } from "@/domain/entities/Proveedores";
import { ProveedoresRepositoryImpl } from "@/infra/repositories/ProveedoresRepositoryImpl";
import { ProveedresRepository } from "@/domain/repositories/Proveedores.repository";
import { ProveedoresUseCases } from "@/domain/usecases/ProveedoresUseCases";

const proveedoresRepository: ProveedresRepository = new ProveedoresRepositoryImpl();
const proveedoresUseCases: ProveedoresUseCases = new ProveedoresUseCases(proveedoresRepository);

export function useGetProveedoresQuery() {
  const proveedores = useQuery({
    queryKey: ["proveedores"],
    queryFn: () => proveedoresUseCases.getProveedores(),
  });

  return {
    ...proveedores,
  };
}

export function useGuardarProveedorMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (proveedor: ProveedorSave) => proveedoresUseCases.guardarProveedor(proveedor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
    },
  });

  return {
    ...mutation,
  };
}

export function useActualizarProveedorMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (proveedor: ProveedorUpdate) => proveedoresUseCases.actualizarProveedor(proveedor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
    },
  });

  return {
    ...mutation,
  };
}

export function useEliminarProveedorMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => proveedoresUseCases.eliminarProveedor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
    },
  });

  return {
    ...mutation,
  };
}
