export interface Empleado{
    id: number;
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
    idempleado: number;
}

export interface EmpleadoSave{
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

export interface EmpleadoUpdate extends EmpleadoSave{
    id: number;
}