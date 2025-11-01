import { useQuery } from "@tanstack/react-query";
import { CreditosRepository } from "@/domain/repositories/Creditos.repository";
import { CreditosRepositoryImpl } from "@/infra/repositories/CreditosRepositoryImpl";
import { CreditosUseCases } from "@/domain/usecases/CreditosUseCases";

const creditosRepository: CreditosRepository = new CreditosRepositoryImpl();
const creditosUseCases: CreditosUseCases = new CreditosUseCases(creditosRepository);

export function useCreditosQuery(idcliente: number) {
  const creditos = useQuery({
    queryKey: ["creditos"],
    queryFn: () => creditosUseCases.getCreditosByCliente(idcliente),
  });
  return creditos;
}
