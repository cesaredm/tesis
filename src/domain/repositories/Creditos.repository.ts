import { Credito } from "../entities/Creditos";

export interface CreditosRepository {
    getCreditosByCliente(idcliente: number): Promise<Credito[]>;
}