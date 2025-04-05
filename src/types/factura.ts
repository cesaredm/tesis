export interface Factura {
  id: number;
  fecha: string;
  cliente: string;
  total: number;
}

export interface FacturaSave {
  fecha: string | Date;
  credito: number | null;
  total: number;
}
