export interface Credito {
  id: number;
  fecha: string | Date;
  cliente: number;
  clienteFullName: string;
  aval: number;
  avalFullName: string;
}

export interface CreditoSave {
  fecha: string | Date;
  cliente: number;
  aval: number;
}
