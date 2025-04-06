import { axios, isAxiosError } from "@/utils/axiosConfig";
import { Producto, RespuestaApi } from "@/types";

class ProductosService {
  async getProductos(): Promise<Producto[]> {
    const { data } = await axios.get("/inventario/productos");
    return data;
  }
}

export const productoService =  new ProductosService();