export interface Kardex {
  id: number;
  producto: number;
  fecha: Date | string;
  cantidad: number;
  tipoMovimiento: string;
  empleado: string;
  nota: string;
}

export interface KardexSave {
  producto: number;
  fecha: Date | string;
  cantidad: number;
  tipoMovimiento: string;
  nota: string;
}