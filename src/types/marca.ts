export interface Marca {
  id: number;
  nombre: string;
}

export interface MarcaSave {
  nombre: string;
}

export interface MarcaUpdate extends MarcaSave {
  id: number;
}
