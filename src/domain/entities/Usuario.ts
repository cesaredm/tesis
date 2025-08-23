export interface Usuario {
  id: number;
  usuario: string;
  password: string;
  idempleado: number;
  empleado: string;
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
