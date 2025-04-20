import { useQuery } from "@tanstack/react-query";
import { marcaService } from "@/servicios/marcas.service";

export function useGetMarcasQuery() {
  const marcas = useQuery({
    queryKey: ["marcas"],
    queryFn: () => marcaService.getMarcas(),
    staleTime: 1000 * 60 * 60 * 12, // 12 horas
  });

  return {
    ...marcas,
  };
}
