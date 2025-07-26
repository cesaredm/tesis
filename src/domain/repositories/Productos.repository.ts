import { Producto, ProductoSave, ProductoUpdate } from "../entities/Productos";
import { RespuestaApi } from "@/types";
export interface ProductoRepository {
  getProductos(): Promise<Producto[]>;
  crear(producto: ProductoSave): Promise<RespuestaApi>;
  actualizar(producto: ProductoUpdate): Promise<RespuestaApi>;
  eliminar(productos: number[]): Promise<RespuestaApi>;
  getResumenInventario(): Promise<{ productos: number; marcas: number; proveedores: number; pedidosPendientes: number }>;
}
