import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductoSave, ProductoUpdate } from "@/domain/entities/Productos";
import { ProductoRepositoryImpl } from "@/infra/repositories/ProductoRepositoryImpl";
import { ProductoRepository } from "@/domain/repositories/Productos.repository";
import { ProductoUseCases } from "@/domain/usecases/ProductoUseCases";

const productoRepository: ProductoRepository = new ProductoRepositoryImpl();
const productoUseCases: ProductoUseCases = new ProductoUseCases(productoRepository);

export function useGetProductosQuery() {
  const productos = useQuery({
    queryKey: ["productos"],
    queryFn: () => productoUseCases.getProductos(),
    staleTime: 1000 * 60 * 5, // 5 min
  });

  return {
    ...productos,
  };
}

export function useGuardarProductoMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (producto: ProductoSave) => productoUseCases.crear(producto),
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
    mutationFn: (producto: ProductoUpdate) => productoUseCases.actualizar(producto),
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
    mutationFn: (productos: number[]) => productoUseCases.eliminar(productos),
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
    queryFn: () => productoUseCases.getResumenInventario(),
    staleTime: 1000 * 60 * 5, // 5 min
  });

  return {
    ...resumen,
  };
}
