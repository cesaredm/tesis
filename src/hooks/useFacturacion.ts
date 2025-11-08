import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FacturaRepositoryImpl } from "@/infra/repositories/facturacion/FacturaRepositoryImpl";
import { FacturacionUseCases } from "@/domain/usecases/facturacion/FacturacionUseCases";
import { DetalleSave, FacturaSave } from "@/domain/entities/Facturas";

const facturacionRepository = new FacturaRepositoryImpl();
const useCasesFacturacion = new FacturacionUseCases(facturacionRepository);

export function useGuardarFactura(){

  const queryClient = useQueryClient();

  const mutacion = useMutation({
    mutationFn: ({factura, detalles}: {factura: FacturaSave, detalles: DetalleSave[] }) => useCasesFacturacion.guardarFactura(factura, detalles),
    onSuccess:()=>{
     queryClient.invalidateQueries({ queryKey: ["productos"] });
    }
  })

  return mutacion;
}


