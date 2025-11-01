import { Result } from "@/types/resultPromise";
import { Estado } from "../entities/Reportes";
import { AxiosError } from "axios";

export interface ReportesRepository {
  getEstadoDiario(fecha1: string | Date): Promise<Result<Estado, AxiosError>>;
  getEstadoMensual(fecha1: string | Date, fecha2: string | Date): Promise<Result<Estado, AxiosError>>;
}
