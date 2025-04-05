export interface Producto {
  id: number;
  codigoBarra: string;
  descripcion: string;
  precioCosto: number;
  precioVenta: number;
  stock: number;
  idmarca: number;
  marca: string;
}

export interface ProductoSave {}
