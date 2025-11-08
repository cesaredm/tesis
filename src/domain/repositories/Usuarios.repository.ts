import { RespuestaApi } from "@/types";
import { Usuario, UsuarioSave, UsuarioUpdate } from "../entities/Usuario";

export interface UsuarioRepository {
  save(usuario: UsuarioSave): Promise<RespuestaApi>;
  update(usuario: UsuarioUpdate): Promise<RespuestaApi>;
  getAll(): Promise<Usuario[]>;
  delete(id: number): Promise<RespuestaApi>;
}
