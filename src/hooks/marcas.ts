import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { marcaService } from "@/servicios/marcas.service";
import { MarcaSave, MarcaUpdate } from "@/types";

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

export function useGuardarMarcaMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (marca: MarcaSave) => marcaService.guardarMarca(marca),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marcas"] });
    },
  });

  return {
    ...mutation,
  };
}

export function useEliminarMarcasMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (marcas: number[]) => marcaService.eliminarMarcas(marcas),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marcas"] });
    },
  });

  return {
    ...mutation,
  };
}

export function useActualizarMarcaMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (marca: MarcaUpdate) => marcaService.actualizarMarca(marca),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marcas"] });
    },
  });

  return {
    ...mutation
  }
}