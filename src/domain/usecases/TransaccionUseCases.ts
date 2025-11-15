import { RespuestaApi } from "@/types";
import { Transaccion, TransaccionSave } from "../entities/Transacciones";
import { TransaccionRepository } from "../repositories/Transaccion.repository";

export class TransaccionUseCases {
  constructor(private transaccionRepository: TransaccionRepository) {}

  async getTransacciones(fecha: string | Date): Promise<Transaccion[]> {
    return await this.transaccionRepository.getTransacciones(fecha);
  }
  async deleteTransaccion(id: number): Promise<RespuestaApi> {
    return await this.transaccionRepository.deleteTransaccion(id);
  }
  async saveTransaccion(transaccion: TransaccionSave): Promise<RespuestaApi> {
    return await this.transaccionRepository.saveTransaccion(transaccion);
  }
}
