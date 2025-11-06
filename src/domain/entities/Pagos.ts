export interface Pago {
  id: number;
  fecha: string | Date;
  monto: number;
  credito: number;
  clienteFullName: string;
}

export interface PagoSave{
  fecha: Date;
  monto: number;
  credito: number;
}
