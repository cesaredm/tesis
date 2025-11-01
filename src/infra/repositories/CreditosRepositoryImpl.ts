import { CreditosRepository } from "../../domain/repositories/Creditos.repository";
import { Credito } from "../../domain/entities/Creditos";
import { axios } from "../../utils/axiosConfig";

export class CreditosRepositoryImpl implements CreditosRepository {
  async getCreditosByCliente(idcliente: number): Promise<Credito[]> {
    const {data} = await axios.get(`/creditos`, {
      params: {
        cliente: idcliente,
      },
    });
    return data;
  }
}
