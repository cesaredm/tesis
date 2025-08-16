export interface Pago {
  id: number;
  fecha: string | Date;
  monto: number;
  credito: number;
  clienteFullName: string;
}
