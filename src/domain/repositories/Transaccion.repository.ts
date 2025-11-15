import { RespuestaApi } from "@/types";
import { Transaccion, TransaccionSave } from "../entities/Transacciones";

export interface TransaccionRepository {
    getTransacciones(fecha: string | Date): Promise<Transaccion[]>;
    saveTransaccion(transaccion: TransaccionSave): Promise<RespuestaApi>;
    deleteTransaccion(id: number): Promise<RespuestaApi>;
}