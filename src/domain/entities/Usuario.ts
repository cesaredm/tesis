export interface Usuario {
  id: number;
  usuario: string;
  password: string;
  nombres: string;
  apellidos: string;
  empleado: number;
  permiso: string;
}

export interface UsuarioSave {
  usuario: string;
  password: string;
  empleado: number;
  permiso: string;
}

export interface UsuarioUpdate extends UsuarioSave{
    id: number;
}
