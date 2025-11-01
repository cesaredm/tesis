import { AxiosError } from "axios";
import { ReportesRepository } from "../repositories/Reportes.repository";
import { Result } from "@/types/resultPromise";
import { Estado } from "../entities/Reportes";
import { ReportesRepositoryImpl } from "@/infra/ReportesRepositoryImpl";

export class ReportesUseCases {
  constructor(private reportesRepository: ReportesRepository) {}

  async getEstadoDiario(fecha1: string | Date): Promise<Result<Estado, AxiosError>> {
    return this.reportesRepository.getEstadoDiario(fecha1);
  }

  async getEstadoMensual(fecha1: string | Date, fecha2: string | Date): Promise<Result<Estado, AxiosError>> {
    return this.reportesRepository.getEstadoMensual(fecha1, fecha2);
  }
}

export const reportesUseCases = new ReportesUseCases(new ReportesRepositoryImpl());
