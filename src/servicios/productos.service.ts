import { axios, isAxiosError } from "@/utils/axiosConfig";
import { Producto, ProductoSave, ProductoUpdate, RespuestaApi } from "@/types";

class ProductosService {
  async getProductos(): Promise<Producto[]> {
    const { data } = await axios.get("/inventario/productos");
    return data;
  }

  crear(productos: ProductoSave): Promise<RespuestaApi> {
    return axios.post<RespuestaApi>("/inventario/productos", productos).then((res) => res.data);
  }
  actualizar(producto: ProductoUpdate): Promise<RespuestaApi> {
    return axios.put<RespuestaApi>("/inventario/productos", producto).then((res) => res.data);
  }
  eliminar(productos: number[]): Promise<RespuestaApi> {
    return axios.patch<RespuestaApi>("/inventario/productos", { productos }).then((res) => res.data);
  }
}

export const productoService =  new ProductosService();