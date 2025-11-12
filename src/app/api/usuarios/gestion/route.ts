import { conexiondb } from "@/db/dbconfig";
import { UsuarioSchema, UsuarioSchemaUpdate } from "@/schemas/usuario.schema";
import { respuesta, respuestaError } from "@/utils/respuestas";
import { ResultSetHeader } from "mysql2";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const usuarioValido = UsuarioSchema.parse(data);
    const [result] = await conexiondb.query<ResultSetHeader>("INSERT INTO usuarios SET ?", [usuarioValido]);
    if (result.affectedRows === 0) return Response.json(respuestaError(), { status: 400 });
    return Response.json(respuesta(), { status: 201 });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) return Response.json(respuestaError({ error: error.issues.map((issue) => issue.message).join(", \n ") }), { status: 400 });
    return Response.json(respuestaError(), { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    const usuarioValido = UsuarioSchemaUpdate.parse(data);
    const [result] = await conexiondb.query<ResultSetHeader>("UPDATE usuarios SET usuario = ?, password = ?, empleado = ?, permiso=? WHERE id = ?", [
      usuarioValido.usuario,
      usuarioValido.password,
      usuarioValido.empleado,
      usuarioValido.permiso,
      usuarioValido.id,
    ]);
    if (result.affectedRows === 0) return Response.json(respuestaError(), { status: 400 });
    return Response.json(respuesta(), { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) return Response.json(respuestaError({ error: error.issues.map((issue) => issue.message).join(", \n ") }), { status: 400 });
    return Response.json(respuestaError(), { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const [result] = await conexiondb.query<ResultSetHeader>("DELETE FROM usuarios WHERE id = ?", [id]);
    if (result.affectedRows === 0) return Response.json(respuestaError(), { status: 400 });
    return Response.json(respuesta(), { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 400 });
  }
}

export async function GET() {
    const conn = await conexiondb.getConnection();
    try {
        const [usuarios] = await conn.query("SELECT * FROM usuariostienda");
        return Response.json(usuarios);     
    } catch (error) {
        console.log(error)        
        return Response.json(respuestaError(), { status: 400 });
    }finally{
        await conn.release();
    }
}
