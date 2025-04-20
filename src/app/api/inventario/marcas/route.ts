import { respuestaError, respuesta } from "@/utils/respuestas";
import { conexiondb } from "@/db/dbconfig";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export async function POST(req: Request) {
  try {
    const { nombre } = await req.json();
    const [result] = await conexiondb.query<ResultSetHeader>("INSERT INTO marca SET ?", [{ nombre }]);
    if (result.affectedRows > 0) {
      return Response.json(respuesta(), { status: 200 });
    }
    return Response.json(respuestaError(), { status: 404 });
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 404 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, nombre } = await req.json();
    const [result] = await conexiondb.query<ResultSetHeader>("UPDATE marca SET nombre= ? WHERE id = ?", [nombre, id]);
    if (result.affectedRows > 0) {
      return Response.json(respuesta(), { status: 200 });
    }
    return Response.json(respuestaError(), { status: 404 });
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 404 });
  }
}

export async function GET() {
  const conn = await conexiondb.getConnection();
  try {
    const [marcas] = await conn.query<RowDataPacket[]>("SELECT * FROM marca");
    return Response.json(marcas);
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 404 });
  } finally {
    conn.destroy();
  }
}

export async function DELETE(req: Request) {
  try {
    const { marcas } = await req.json();
    for (const marca of marcas) {
      await conexiondb.query("DELETE FROM marca WHERE id = ?", [marca]);
    }
    return Response.json(respuesta(), { status: 200 });
  } catch (e: any) {
    console.log(e);
    if (e.errno === 1451) return Response.json(respuestaError({ error: "No se puede eliminar la marca porque esta siendo usada en un producto" }), { status: 400 });
    return Response.json(respuestaError(), { status: 404 });
  }
}
