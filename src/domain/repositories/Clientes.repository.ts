import { RespuestaApi } from "@/types";
import { Cliente, ClienteSave } from "../entities/Clientes";

export interface ClientesRepository {
  getClientes(): Promise<Cliente[]>;
  guardarCliente(cliente: ClienteSave): Promise<RespuestaApi>;
  actualizarCliente(cliente: Cliente): Promise<RespuestaApi>;
}
