export interface Pedido {
  id: number;
  fecha: string;
  proveedor: string;
  estado: string;
  detalles: DetallesPedido[];
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
  marca: string;
  cantidad: number;
  precio: number;
  importe: number;
}
