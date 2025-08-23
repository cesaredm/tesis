export interface Pago {
  id: number;
  fecha: string | Date;
  monto: number;
  credito: number;
  clienteFullName: string;
}

export interface PagoSave{
  fecha: string | Date;
  monto: number;
  credito: number;
}
