import { RespuestaApi } from "@/types";
import { ProveedresRepository } from "@/domain/repositories/Proveedores.repository";
import { Proveedor, ProveedorUpdate, ProveedorSave } from "@/domain/entities/Proveedores";
import { axios } from "@/utils/axiosConfig";

export class ProveedoresRepositoryImpl implements ProveedresRepository {
  async getProveedores(): Promise<Proveedor[]> {
    const { data } = await axios.get("/inventario/proveedores");
    return data;
  }

  async guardarProveedor(proveedor: ProveedorSave): Promise<RespuestaApi> {
    const { data } = await axios.post("/inventario/proveedores", proveedor);
    return data;
  }

  async actualizarProveedor(proveedor: ProveedorUpdate): Promise<RespuestaApi> {
    const { data } = await axios.patch(`/inventario/proveedores/`, proveedor);
    return data;
  }

  async eliminarProveedor(id: number): Promise<RespuestaApi> {
    const { data } = await axios.delete(`/inventario/proveedores`, { data: { id } });
    return data;
  }
}


