import { Credito } from "../entities/Creditos";
import { CreditosRepository } from "../repositories/Creditos.repository";

export class CreditosUseCases {
    constructor(private creditosRepository: CreditosRepository){}

    getCreditosByCliente(idcliente: number): Promise<Credito[]> {
        return this.creditosRepository.getCreditosByCliente(idcliente);
    }
}