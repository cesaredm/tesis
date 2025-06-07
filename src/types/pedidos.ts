export interface Pedido {
  id: number;
  fecha: string;
  proveedor: string;
  idProveedor: number;
  estado: string;
  detalles: DetallesPedido[];
  total: number;
}

export interface PedidoSave {
  fecha: string | Date;
  proveedor: number;
  estado: string;
}

export interface PedidoUpdate extends PedidoSave {
  id: number;
}

export interface DetallesPedido {
  id: number;
  descripcion: string;
  marca: string;
  pedido: number;
  producto: string;
  cantidad: number;
  precio: number;
  importe: number;
}

export interface DetallesPedidoSave {
  producto: number;
  descripcion: string;
  stock: number;
  marca: string;
  cantidad: number;
  precio: number;
  importe: number;
}
