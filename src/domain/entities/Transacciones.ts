export interface Transaccion {
  id: number;
  fecha: string | Date;
  f: string;
  tipo: string;
  monto: number;
  anotacion: string;
}

export interface TransaccionSave {
  fecha: string | Date;
  tipo: string;
  monto: number;
  anotacion: string;
}

