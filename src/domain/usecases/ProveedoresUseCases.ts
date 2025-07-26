import { ProveedresRepository } from "../repositories/Proveedores.repository";
import { Proveedor, ProveedorSave, ProveedorUpdate } from "../entities/Proveedores";
import { RespuestaApi } from "@/types";

export class ProveedoresUseCases {
    constructor(private proveedorRepository: ProveedresRepository){}

    async getProveedores(): Promise<Proveedor[]> {
        return this.proveedorRepository.getProveedores();
    }
    async guardarProveedor(proveedor: ProveedorSave): Promise<RespuestaApi> {
        return this.proveedorRepository.guardarProveedor(proveedor);
    }
    async actualizarProveedor(proveedor: ProveedorUpdate): Promise<RespuestaApi> {
        return this.proveedorRepository.actualizarProveedor(proveedor);
    }
    async eliminarProveedor(id: number): Promise<RespuestaApi> {
        return this.proveedorRepository.eliminarProveedor(id);
    }
}