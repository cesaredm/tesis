import { RespuestaApi } from "@/types";
import { KardexSave } from "../entities/Kardex";
export interface KardexRepository {
  crearMovimiento(movimiento: KardexSave): Promise<RespuestaApi>;
}
