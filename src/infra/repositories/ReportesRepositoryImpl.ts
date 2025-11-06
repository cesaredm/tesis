import { Estado } from "@/domain/entities/Reportes";
import { ReportesRepository } from "@/domain/repositories/Reportes.repository";
import { Result } from "@/types/resultPromise";
import { axios } from "@/utils/axiosConfig";
import { AxiosError } from "axios";
import { format } from "@formkit/tempo";
import { formatDecimal } from "@/utils/helpers";

export class ReportesRepositoryImpl implements ReportesRepository {
  async getEstadoDiario(fecha1: string | Date): Promise<Result<Estado, AxiosError>> {
    try {
      fecha1 = format({ date: fecha1, format: "YYYY-MM-DD", tz: "America/tegucigalpa" });
      const { data } = await axios.get(`/reportes/estadoDiario`, { params: { fecha1, fecha2: fecha1 } });
      const estado = data[0];
      const existenciaCaja = formatDecimal(Number(estado.ventasEfectivo) + Number(estado.entradas) - Number(estado.salidas));

      return [
        {
          ventasEfectivo: formatDecimal(Number(estado.ventasEfectivo)),
          ventasCreditos: formatDecimal(Number(estado.ventasCredito)),
          salidasEfectivo: formatDecimal(Number(estado.salidas)),
          entradasEfectivo: formatDecimal(Number(estado.entradas)),
          existenciaCaja: existenciaCaja,
        },
        null,
      ];
    } catch (error) {
      return [null, error as AxiosError];
    }
  }
  async getEstadoMensual(fecha1: string | Date, fecha2: string | Date): Promise<Result<Estado, AxiosError>> {
    fecha1 = format({ date: fecha1, format: "YYYY-MM-DD", tz: "America/tegucigalpa" });
    fecha2 = format({ date: fecha2, format: "YYYY-MM-DD", tz: "America/tegucigalpa" });
    try {
      const { data } = await axios.get(`/reportes/estadoDiario`, { params: { fecha1, fecha2 } });
      const estado = data[0];
      const existenciaCaja = formatDecimal(Number(estado.ventasEfectivo) + Number(estado.entradas) - Number(estado.salidas));
      return [
        {
          ventasEfectivo: formatDecimal(Number(estado.ventasEfectivo)),
          ventasCreditos: formatDecimal(Number(estado.ventasCredito)),
          salidasEfectivo: formatDecimal(Number(estado.salidas)),
          entradasEfectivo: formatDecimal(Number(estado.entradas)),
          existenciaCaja: existenciaCaja,
        },
        null,
      ];
    } catch (error) {
      return [null, error as AxiosError];
    }
  }
}
