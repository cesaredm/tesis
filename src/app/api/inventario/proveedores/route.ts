import { z } from "zod";
import { conexiondb } from "@/db/dbconfig";
import { respuesta, respuestaError } from "@/utils/respuestas";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const ProveedorSchema = z.object({
  nombre: z.string({ invalid_type_error: "El nombre debe ser un texto" }).min(1, { message: "El nombre es requerido" }),
  telefono: z.string({ invalid_type_error: "El teléfono debe ser un texto" }),
  cuentaBancaria: z.string({ invalid_type_error: "La cuenta bancaria debe ser un string" }),
  vendedor: z.string({ invalid_type_error: "El vendedor debe ser un texto" }).min(1, { message: "El vendedor es requerido" }),
  telefonoVendedor: z.string({ invalid_type_error: "El teléfono del vendedor debe ser un texto" }).min(1, { message: "El teléfono del vendedor es requerido" }),
});

const ProveedorSchemaUpdate = ProveedorSchema.extend({
  id: z.number({ invalid_type_error: "El id debe ser un número", required_error: "El id es requerido" }).positive({ message: "El id debe ser un número positivo" }).int("El id debe ser un número entero"),
});

export async function GET() {
  try {
    const [result] = await conexiondb.query<RowDataPacket[]>("SELECT * FROM proveedores");
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError({ error: "Error al obtener los proveedores" }), { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsedData = ProveedorSchema.parse(data);
    const [result] = await conexiondb.query<ResultSetHeader>("INSERT INTO proveedores SET ?", [parsedData]);
    if (result.affectedRows > 0) {
      return Response.json(respuesta(), { status: 200 });
    } else {
      return Response.json(respuestaError({ error: "Error al crear el proveedor" }), { status: 400 });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return Response.json(respuestaError({ error: error.issues.map((issue) => issue.message).join(", \n ") }), { status: 400 });
    }
    return Response.json(respuestaError({ error: "Error al crear el proveedor" }), { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    const { id, nombre, telefono, vendedor, cuentaBancaria, telefonoVendedor } = ProveedorSchemaUpdate.parse(data);
    const [result] = await conexiondb.query<ResultSetHeader>("UPDATE proveedores SET nombre=?, telefono=?, cuentaBancaria=?, vendedor=?, telefonoVendedor=? WHERE id = ?", [nombre, telefono, cuentaBancaria, vendedor, telefonoVendedor, id]);
    if (result.affectedRows > 0) {
      return Response.json(respuesta(), { status: 200 });
    } else {
      return Response.json(respuestaError({ error: "Error al actualizar el proveedor" }), { status: 400 });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return Response.json(respuestaError({ error: error.issues.map((issue) => issue.message).join(", \n ") }), { status: 400 });
    }
    return Response.json(respuestaError({ error: "Error al actualizar el proveedor" }), { status: 400 });
  }
}
