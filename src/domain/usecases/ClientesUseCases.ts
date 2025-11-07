import { Aval, Cliente, ClienteSave } from "../entities/Clientes";
import { ClientesRepository } from "../repositories/Clientes.repository";

export class ClientesUseCases {
  constructor(private clientesRepository: ClientesRepository) {}

  async getClientes(): Promise<Cliente[]> {
    return await this.clientesRepository.getClientes();
  }

  getAvales(): Promise<Aval[]> {
    return this.clientesRepository.getAvales();
  }

  async guardarCliente(cliente: ClienteSave) {
    return await this.clientesRepository.guardarCliente(cliente);
  }

  async actualizarCliente(cliente: Cliente) {
    return await this.clientesRepository.actualizarCliente(cliente);
  }

  async generarPago(pago: any) {
    return await this.clientesRepository.generarPago(pago);
  }

  async getPagos(cliente: number) {
    return await this.clientesRepository.getPagos(cliente);
  }

  async eliminarPago(id: number) {
    return await this.clientesRepository.eliminarPago(id);
  }
}
