import { axios, isAxiosError } from "@/utils/axiosConfig";
import { Marca } from "@/types";

class MarcaService {
  async getMarcas(): Promise<Marca[]> {
    const { data } = await axios.get("/inventario/marcas");
    return data;
  }
}

export const marcaService = new MarcaService();
