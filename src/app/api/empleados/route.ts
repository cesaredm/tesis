import { conexiondb } from "@/db/dbconfig";
import { PersonaSchema, PersonaSchemaUpdate } from "@/schemas/persona.schema";
import { respuesta, respuestaError } from "@/utils/respuestas";
import { ResultSetHeader } from "mysql2";
import { ZodError } from "zod";

export async function GET() {
  const conn = await conexiondb.getConnection();
  try {
    const [clientes] = await conn.query("SELECT * FROM empleadostienda");
    return Response.json(clientes);
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 400 });
  } finally {
    await conn.release();
  }
}

export async function POST(req: Request) {
  const conn = await conexiondb.getConnection();
  try {
    const data = await req.json();
    const empleadoValido = PersonaSchema.parse(data);
    await conn.beginTransaction();
    const [result] = await conn.query<ResultSetHeader>("INSERT INTO persona SET ?", [empleadoValido]);
    const persona = result.insertId;
    await conn.query("INSERT INTO empleados SET ?", [{ persona }]);
    await conn.commit();
    return Response.json(respuesta(), { status: 201 });
  } catch (error) {
    console.log(error);
    await conn.rollback();
    if (error instanceof ZodError) return Response.json(respuestaError({ error: error.issues.map((issue) => issue.message).join(", \n ") }), { status: 400 });
    return Response.json(respuestaError(), { status: 400 });
  } finally {
    await conn.release();
  }
}
export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    const clienteValido = PersonaSchemaUpdate.parse(data);
    await conexiondb.query<ResultSetHeader>("UPDATE persona SET nombres = ?, apellidos = ?, dni = ?, direccion = ?, departamento = ?, municipio = ?, barrio = ?, lugarTrabajo = ?, telefono = ?, foto = ? WHERE id = ?", [
      clienteValido.nombres,
      clienteValido.apellidos,
      clienteValido.dni,
      clienteValido.direccion,
      clienteValido.departamento,
      clienteValido.municipio,
      clienteValido.barrio,
      clienteValido.lugarTrabajo,
      clienteValido.telefono,
      clienteValido.foto,
      clienteValido.id,
    ]);
    return Response.json(respuesta(), { status: 201 });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) return Response.json(respuestaError({ error: error.issues.map((issue) => issue.message).join(", \n ") }), { status: 400 });
    return Response.json(respuestaError(), { status: 400 });
  }
}
