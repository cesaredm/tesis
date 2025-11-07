import { ClientesRepository } from "@/domain/repositories/Clientes.repository";
import { axios } from "@/utils/axiosConfig";
import { Aval, Cliente, ClienteSave } from "@/domain/entities/Clientes";
import { RespuestaApi } from "@/types";
import { Pago, PagoSave } from "@/domain/entities/Pagos";
import { format } from "@formkit/tempo";

export class ClientesRepositoryImpl implements ClientesRepository {
  async getClientes(): Promise<Cliente[]> {
    const response = await axios.get("/clientes");
    return response.data;
  }

  async getAvales(): Promise<Aval[]> {
    const response = await axios.get("/clientes/avales");
    return response.data;
  }

  async guardarCliente(cliente: ClienteSave): Promise<RespuestaApi> {
    const response = await axios.post("/clientes", cliente);
    return response.data;
  }

  async actualizarCliente(cliente: Cliente): Promise<RespuestaApi> {
    const response = await axios.patch("/clientes", cliente);
    return response.data;
  }

  async generarPago(pago: PagoSave): Promise<RespuestaApi> {
    console.log(pago);
    const fechaFormat = format({ date: pago.fecha, format: "YYYY-MM-DD HH:mm:ss", tz: "America/Tegucigalpa" });
    const { data } = await axios.post("/creditos/pagos", { ...pago, fecha: fechaFormat, credito: Number(pago.credito) });
    return data;
  }

  async getPagos(cliente: number): Promise<Pago[]> {
    const { data } = await axios.get("/creditos/pagos", { params: { id: cliente } });
    return data;
  }

  async eliminarPago(id: number): Promise<RespuestaApi> {
    const { data } = await axios.delete(`/creditos/pagos/`, { data: { id } });
    return data;
  }
}
