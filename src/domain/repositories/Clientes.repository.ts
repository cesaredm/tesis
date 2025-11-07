import { RespuestaApi } from "@/types";
import { Aval, Cliente, ClienteSave } from "../entities/Clientes";
import { Pago, PagoSave } from "../entities/Pagos";

export interface ClientesRepository {
  getClientes(): Promise<Cliente[]>;
  getAvales(): Promise<Aval[]>;
  guardarCliente(cliente: ClienteSave): Promise<RespuestaApi>;
  actualizarCliente(cliente: Cliente): Promise<RespuestaApi>;
  generarPago(pago: PagoSave): Promise<RespuestaApi>;
  getPagos(cliente: number): Promise<Pago[]>;
  eliminarPago(id: number): Promise<RespuestaApi>;
}
