import { RespuestaApi } from "@/types";
import { Proveedor, ProveedorUpdate, ProveedorSave } from "@/types/proveedor";
import { axios } from "@/utils/axiosConfig";

class ProveedoresService {
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

export const proveedoresService = new ProveedoresService();
