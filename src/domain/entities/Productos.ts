export interface Producto {
  id: number;
  codigoBarra: string;
  descripcion: string;
  modelo: string;
  precioCosto: number;
  precioVenta: number;
  stock: number;
  idmarca: number;
  marca: string;
}

export interface ProductoSave {
  codigoBarra?: string;
  descripcion: string;
  modelo?: string;
  precioCosto?: number;
  precioVenta: number;
  stock: number;
  marca: number;
}

export interface ProductoUpdate extends ProductoSave {
  id: number;
}
