import { RespuestaApi } from "@/types";
import { Empleado, EmpleadoSave, EmpleadoUpdate } from "../entities/Empleado";
import { EmpleadoRepository } from "../repositories/Empleado.repository";

export class EmpleadosUseCases {
  constructor(private EmpleadoRepository: EmpleadoRepository) {}

  async getEmpleados(): Promise<Empleado[]> {
    return this.EmpleadoRepository.getEmpleados();
  }

  async guardar(empleado: EmpleadoSave): Promise<RespuestaApi> {
    return this.EmpleadoRepository.guardar(empleado);
  }

  async editar(empleado: EmpleadoUpdate): Promise<RespuestaApi> {
    return this.EmpleadoRepository.editar(empleado);
  }
}
