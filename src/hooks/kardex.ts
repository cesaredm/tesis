import { useQueryClient, useMutation } from "@tanstack/react-query";
import { KardexSave } from "@/domain/entities/Kardex";
import { KardexRepository } from "@/domain/repositories/Kardex.repository";
import { KardexRepositoryImpl } from "@/infra/repositories/KardexRepositoryImpl";
import { KardexUseCases } from "@/domain/usecases/KardexUseCases";

const kardexRepository: KardexRepository = new KardexRepositoryImpl();
const kardexUseCases = new KardexUseCases(kardexRepository);

export function useCrearMovimientoKardexMutation() {
  const queryClient = useQueryClient();
  const mutacion = useMutation({
    mutationFn: async (movimiento: KardexSave) => kardexUseCases.crearMovimiento(movimiento),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
  });

  return {
    ...mutacion,
  };
}
