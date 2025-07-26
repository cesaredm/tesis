import { Marca, MarcaSave, MarcaUpdate } from "../entities/Marcas";
import { RespuestaApi } from "@/types";
import { MarcaRepository } from "../repositories/Marcas.repository";
export class MarcaUseCases {
  constructor(private marcaRepository: MarcaRepository) {}

  async getMarcas(): Promise<Marca[]> {
    return this.marcaRepository.getMarcas();
  }

  async guardarMarca(marca: MarcaSave): Promise<RespuestaApi> {
    return this.marcaRepository.guardarMarca(marca);
  }
  async eliminarMarcas(marcas: number[]): Promise<RespuestaApi> {
    return this.marcaRepository.eliminarMarcas(marcas);
  }
  async actualizarMarca(marca: MarcaUpdate): Promise<RespuestaApi> {
    return this.marcaRepository.actualizarMarca(marca);
  }
}
