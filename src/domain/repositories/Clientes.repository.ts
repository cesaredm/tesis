import { RespuestaApi } from "@/types";
import { Aval, Cliente, ClienteSave } from "../entities/Clientes";

export interface ClientesRepository {
  getClientes(): Promise<Cliente[]>;
  getAvales(): Promise<Aval[]>;
  guardarCliente(cliente: ClienteSave): Promise<RespuestaApi>;
  actualizarCliente(cliente: Cliente): Promise<RespuestaApi>;
}
