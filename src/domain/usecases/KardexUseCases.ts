import { KardexRepository } from "../repositories/Kardex.repository";
import { KardexSave } from "../entities/Kardex";
import { RespuestaApi } from "@/types";

export class KardexUseCases {
  constructor(private kardexRepository: KardexRepository) {}

  async crearMovimiento(movimiento: KardexSave): Promise<RespuestaApi> {
    return this.kardexRepository.crearMovimiento(movimiento);
  }
}
