import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productoService } from "@/servicios/productos.service";
import { ProductoSave, ProductoUpdate } from "@/types";

export function useGetProductosQuery() {
  const productos = useQuery({
    queryKey: ["productos"],
    queryFn: () => productoService.getProductos(),
    staleTime: 1000 * 60 * 5, // 5 min
  });

  return {
    ...productos,
  };
}

export function useGuardarProductoMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (producto: ProductoSave) => productoService.crear(producto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
  });

  return {
    ...mutation,
  };
}

export function useActualizarProductoMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (producto: ProductoUpdate) => productoService.actualizar(producto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
  });

  return {
    ...mutation,
  };
}

export function useEliminarProductoMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (productos: number[]) => productoService.eliminar(productos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
  });

  return {
    ...mutation,
  };
}

export function useGetResumenInventarioQuery() {
  const resumen = useQuery({
    queryKey: ["resumen-inventario"],
    queryFn: () => productoService.getResumenInventario(),
    staleTime: 1000 * 60 * 5, // 5 min
  });

  return {
    ...resumen,
  };
}