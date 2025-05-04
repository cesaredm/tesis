import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Proveedor, ProveedorSave, ProveedorUpdate } from "@/types/proveedor";
import { proveedoresService } from "@/servicios/proveedores.service";

export function useGetProveedoresQuery() {
  const proveedores = useQuery({
    queryKey: ["proveedores"],
    queryFn: () => proveedoresService.getProveedores(),
  });

  return {
    ...proveedores,
  };
}

export function useGuardarProveedorMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (proveedor: ProveedorSave) => proveedoresService.guardarProveedor(proveedor),
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
    mutationFn: (proveedor: ProveedorUpdate) => proveedoresService.actualizarProveedor(proveedor),
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
    mutationFn: (id: number) => proveedoresService.eliminarProveedor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
    },
  });

  return {
    ...mutation,
  };
}
