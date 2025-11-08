import { RespuestaApi } from "@/types";
import { Empleado, EmpleadoSave, EmpleadoUpdate } from "../entities/Empleado";

export interface EmpleadoRepository {
  guardar(empleado: EmpleadoSave): Promise<RespuestaApi>;
  editar(empleado: EmpleadoUpdate): Promise<RespuestaApi>;
  getEmpleados(): Promise<Empleado[]>;
}
