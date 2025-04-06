import { useQuery } from "@tanstack/react-query";
import { productoService } from "@/servicios/productos.service";

export function useGetProductosQuery() {
  const productos = useQuery({
    queryKey: ["productos"],
    queryFn: () => productoService.getProductos(),
  });

  return {
    ...productos,
  };
}
