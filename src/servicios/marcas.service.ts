import { axios, isAxiosError } from "@/utils/axiosConfig";
import { Marca, MarcaSave, MarcaUpdate, RespuestaApi } from "@/types";

class MarcaService {
  async getMarcas(): Promise<Marca[]> {
    const { data } = await axios.get("/inventario/marcas");
    return data;
  }

  async guardarMarca(marca: MarcaSave): Promise<RespuestaApi> {
    const { data } = await axios.post("/inventario/marcas", marca);
    return data;
  }

  async eliminarMarcas(marcas: number[]): Promise<RespuestaApi> {
    const { data } = await axios.delete("/inventario/marcas", { data: { marcas } });
    return data;
  }

  async actualizarMarca(marca: MarcaUpdate): Promise<RespuestaApi> {
    const { data } = await axios.patch("/inventario/marcas", marca);
    return data;
  }
}

export const marcaService = new MarcaService();
