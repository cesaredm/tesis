import { Usuario, UsuarioSave, UsuarioUpdate } from "../entities/Usuario";
import { UsuarioRepository } from "../repositories/Usuarios.repository";

export class UsuariosUseCases {
  constructor(private usuariosRepository: UsuarioRepository) {}

  getAll(): Promise<Usuario[]> {
    return this.usuariosRepository.getAll();
  }

  save(usuario: UsuarioSave) {
    return this.usuariosRepository.save(usuario);
  }

  update(usuario: UsuarioUpdate) {
    return this.usuariosRepository.update(usuario);
  }
}
