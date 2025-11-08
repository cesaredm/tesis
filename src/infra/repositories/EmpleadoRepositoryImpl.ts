import { Empleado, EmpleadoSave, EmpleadoUpdate } from "@/domain/entities/Empleado";
import { EmpleadoRepository } from "@/domain/repositories/Empleado.repository";
import { RespuestaApi } from "@/types";
import { axios } from "@/utils/axiosConfig";

export class EmpleadoRepositoryImpl implements EmpleadoRepository {
    async getEmpleados(): Promise<Empleado[]> {
        const { data } = await axios.get('/empleados')
        return data;
    }
    async guardar(empleado: EmpleadoSave): Promise<RespuestaApi> {
        const {data} = await axios.post('/empleados', empleado)
        return data;
    }
    async editar(empleado: EmpleadoUpdate): Promise<RespuestaApi> {
        const {data} = await axios.patch('/empleados', empleado)
        return data;
    }
}