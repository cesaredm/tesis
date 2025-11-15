import { useQueryClient, useMutation } from "@tanstack/react-query";
import { TransaccionRepositoryImpl } from "@/infra/repositories/TransaccionRepositoryImpl";
import { TransaccionUseCases } from "@/domain/usecases/TransaccionUseCases";
import { Transaccion, TransaccionSave } from "@/domain/entities/Transacciones";
import { Result } from "@/types/resultPromise";
import { AxiosError } from "axios";

const transaccionRepository = new TransaccionRepositoryImpl();
const transaccionUseCases = new TransaccionUseCases(transaccionRepository);

export function useDeleteTransaccionMutation() {
  const queryClient = useQueryClient();

  const mutacion = useMutation({
    mutationFn: (id: number) => transaccionUseCases.deleteTransaccion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transacciones"] });
    },
  });

  return { ...mutacion };
}

export function useSaveTransaccionMutation() {
  const queryClient = useQueryClient();

  const mutacion = useMutation({
    mutationFn: (transaccion: TransaccionSave) => transaccionUseCases.saveTransaccion(transaccion),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transacciones"] });
    },
  });

  return { ...mutacion };
}

// service
export async function getTransacciones(fecha: string | Date): Promise<Result<Transaccion[], AxiosError>> {
  try {
    return [await transaccionUseCases.getTransacciones(fecha), null];
  } catch (error: any) {
    return [null, error];
  }
}
