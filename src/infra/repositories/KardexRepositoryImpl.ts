import { KardexRepository } from "@/domain/repositories/Kardex.repository";
import { KardexSave } from "@/domain/entities/Kardex";
import { RespuestaApi } from "@/types";
import { axios } from "@/utils/axiosConfig";

export class KardexRepositoryImpl implements KardexRepository {
  async crearMovimiento(movimiento: KardexSave): Promise<RespuestaApi> {
    const { data } = await axios.post("/inventario/kardex", movimiento);
    return data;
  }
}