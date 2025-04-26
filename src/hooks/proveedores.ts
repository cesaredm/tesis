import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Proveedor } from "@/types/proveedor";
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
    mutationFn: (proveedor: Proveedor) => proveedoresService.guardarProveedor(proveedor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
    },
  });

  return {
    ...mutation,
  };
}
