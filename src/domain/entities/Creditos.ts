export interface Credito {
  id: number;
  cliente: number;
  aval: string;
  numeroFactura: number;
  fechaEmisionFactura: string | Date;
  numeroCredito: number;
  fechaCreacionCredito: string | Date;
  total: number;
  clientefullname: string;
  pagos: number;
}

export interface CreditoSave {
  fecha: string | Date;
  cliente: number;
  aval: number;
}
