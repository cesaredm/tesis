import { useQueryClient, useMutation } from "@tanstack/react-query";
import { kardexService } from "@/servicios/kardex.service";
import { KardexSave } from "@/types/kardex";

export function useCrearMovimientoKardexMutation() {
    const queryClient = useQueryClient();
  const mutacion = useMutation({
    mutationFn: async (movimiento: KardexSave) => kardexService.crearMovimiento(movimiento),
    onSuccess:()=>{
        queryClient.invalidateQueries({ queryKey: ["productos"] });
    }
  });

  return {
    ...mutacion,
  };
}
