import { Usuario, UsuarioSave, UsuarioUpdate } from "@/domain/entities/Usuario";
import { UsuarioRepository } from "@/domain/repositories/Usuarios.repository";
import { RespuestaApi } from "@/types";
import { axios } from "@/utils/axiosConfig";
export class UsuariosRepositoryImpl implements UsuarioRepository {
  async getAll(): Promise<Usuario[]> {
    const { data } = await axios.get("/usuarios/gestion");
    return data;
  }

  async save(usuario: UsuarioSave): Promise<RespuestaApi> {
    const { data } = await axios.post("/usuarios/gestion", usuario);
    return data;
  }

  async update(usuario: UsuarioUpdate): Promise<RespuestaApi> {
    const { data } = await axios.patch("/usuarios/gestion", usuario);
    return data;
  }

  async delete(id: number): Promise<RespuestaApi> {
    console.log(id);
    const { data } = await axios.delete("/usuarios/gestion", { data: { id } });
    return data;
  }
}
