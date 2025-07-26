import { Marca, MarcaSave, MarcaUpdate } from "@/types";
import { RespuestaApi } from "@/types";
export interface MarcaRepository {
  getMarcas(): Promise<Marca[]>;
  guardarMarca(marca: MarcaSave): Promise<RespuestaApi>;
  eliminarMarcas(marcas: number[]): Promise<RespuestaApi>;
  actualizarMarca(marca: MarcaUpdate): Promise<RespuestaApi>;
}
