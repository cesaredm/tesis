import { ProductoRepository } from "../repositories/Productos.repository";
import { Producto, ProductoSave, ProductoUpdate } from "../entities/Productos";
import { RespuestaApi } from "@/types";

export class ProductoUseCases {
  constructor(private productoRepository: ProductoRepository) {}
  async getProductos(): Promise<Producto[]> {
    return this.productoRepository.getProductos();
  }
  async crear(producto: ProductoSave): Promise<RespuestaApi> {
    return this.productoRepository.crear(producto);
  }
  async actualizar(producto: ProductoUpdate): Promise<RespuestaApi> {
    return this.productoRepository.actualizar(producto);
  }
  async eliminar(productos: number[]): Promise<RespuestaApi> {
    return this.productoRepository.eliminar(productos);
  }
  async getResumenInventario(): Promise<{ productos: number; marcas: number; proveedores: number; pedidosPendientes: number }> {
    return this.productoRepository.getResumenInventario();
  }
  async getFullProductos(): Promise<Producto[]> {
    return this.productoRepository.getFullProductos();
  }

  async reIntegrarProducto(id: number): Promise<RespuestaApi> {
    return this.productoRepository.reIntegrarProducto(id);
  }
}
