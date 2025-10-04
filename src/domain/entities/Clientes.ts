export interface Cliente {
  id: number; // id de persona en la base de datos
  idCliente: number;
  nombres: string;
  apellidos: string;
  dni: string;
  direccion: string;
  departamento: string;
  municipio: string;
  barrio: string;
  lugarTrabajo: string;
  telefono: string;
  foto?: string;
}

export interface ClienteSave {
  nombres: string;
  apellidos: string;
  dni: string;
  direccion: string;
  departamento: string;
  municipio: string;
  barrio: string;
  lugarTrabajo: string;
  telefono: string;
  foto?: string;
}

export interface Aval {
  id: number;
  cliente: number;
  nombres: string;
  apellidos: string;
}
