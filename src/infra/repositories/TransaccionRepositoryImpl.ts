import { Transaccion, TransaccionSave } from "@/domain/entities/Transacciones";
import { TransaccionRepository } from "@/domain/repositories/Transaccion.repository";
import { RespuestaApi } from "@/types";
import { axios } from "@/utils/axiosConfig";
import { format } from "@formkit/tempo";

export class TransaccionRepositoryImpl implements TransaccionRepository {
  async getTransacciones(fecha: string | Date): Promise<Transaccion[]> {
    const fechaFormateada = format({ date: fecha, format: "YYYY-MM-DD", tz: "America/Tegucigalpa" });
    const { data } = await axios.get<Transaccion[]>(`/transacciones`, {
      params: {
        fecha: fechaFormateada,
      },
    });
    return data;
  }
  async saveTransaccion(transaccion: TransaccionSave): Promise<RespuestaApi> {
    const fechaFormateada = format({ date: transaccion.fecha, format: "YYYY-MM-DD HH:mm:ss", tz: "America/Tegucigalpa" });
    const { data } = await axios.post<RespuestaApi>(`/transacciones`, {
      ...transaccion,
      fecha: fechaFormateada,
    });
    return data;
  }

  async deleteTransaccion(id: number): Promise<RespuestaApi> {
    const { data } = await axios.delete<RespuestaApi>(`/transacciones`, {
      data: {
        id,
      },
    });
    return data;
  }
}
