import { Proveedor, ProveedorSave, ProveedorUpdate } from "../entities/Proveedores";
import { RespuestaApi } from "@/types";

export interface ProveedresRepository {
  getProveedores(): Promise<Proveedor[]>;
  guardarProveedor(proveedor: ProveedorSave): Promise<RespuestaApi>;
  eliminarProveedor(proveedores: number): Promise<RespuestaApi>;
  actualizarProveedor(proveedor: ProveedorUpdate): Promise<RespuestaApi>;
}
