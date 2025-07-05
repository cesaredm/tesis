import { RespuestaApi } from "@/types";
import { KardexSave } from "@/types/kardex";
import { axios } from "@/utils/axiosConfig";

class KardexService {
  async crearMovimiento(movimiento: KardexSave): Promise<RespuestaApi> {
    const { data } = await axios.post("/inventario/kardex", movimiento);
    return data;
  }
}

export const kardexService = new KardexService();
