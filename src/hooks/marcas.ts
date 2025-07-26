import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MarcaSave, MarcaUpdate } from "@/domain/entities/Marcas";
import { MarcaRepositoryImpl } from "@/infra/repositories/MarcasRepositoryImpl";
import { MarcaUseCases } from "@/domain/usecases/MarcaUseCases";
import { MarcaRepository } from "@/domain/repositories/Marcas.repository";

const marcaRepository: MarcaRepository = new MarcaRepositoryImpl();
const marcaUseCases = new MarcaUseCases(marcaRepository);

export function useGetMarcasQuery() {
  const marcas = useQuery({
    queryKey: ["marcas"],
    queryFn: () => marcaUseCases.getMarcas(),
    staleTime: 1000 * 60 * 60 * 12, // 12 horas
  });

  return {
    ...marcas,
  };
}

export function useGuardarMarcaMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (marca: MarcaSave) => marcaUseCases.guardarMarca(marca),
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
    mutationFn: (marcas: number[]) => marcaUseCases.eliminarMarcas(marcas),
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
    mutationFn: (marca: MarcaUpdate) => marcaUseCases.actualizarMarca(marca),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marcas"] });
    },
  });

  return {
    ...mutation,
  };
}
