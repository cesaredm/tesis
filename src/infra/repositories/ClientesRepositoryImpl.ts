import { ClientesRepository } from "@/domain/repositories/Clientes.repository";
import { axios } from "@/utils/axiosConfig";
import { Aval, Cliente, ClienteSave } from "@/domain/entities/Clientes";
import { RespuestaApi } from "@/types";

export class ClientesRepositoryImpl implements ClientesRepository {
  async getClientes(): Promise<Cliente[]> {
    const response = await axios.get("/clientes");
    return response.data;
  }

  async getAvales(): Promise<Aval[]> {
    const response = await axios.get("/clientes/avales");
    return response.data;
  }

  async guardarCliente(cliente: ClienteSave): Promise<RespuestaApi> {
    const response = await axios.post("/clientes", cliente);
    return response.data;
  }

  async actualizarCliente(cliente: Cliente): Promise<RespuestaApi> {
    const response = await axios.patch("/clientes", cliente);
    return response.data;
  }
}
