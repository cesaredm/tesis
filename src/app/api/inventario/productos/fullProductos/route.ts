import { respuesta, respuestaError } from "@/utils/respuestas";
import { conexiondb } from "@/db/dbconfig";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { NextRequest } from "next/server";

export async function GET() {
  const conn = await conexiondb.getConnection();
  try {
    const [productos] = await conn.query<RowDataPacket[]>("SELECT * FROM inventariotienda ORDER BY id DESC");
    return Response.json(productos);
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 404 });
  } finally {
    conn.destroy();
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json();
    const [result] = await conexiondb.query<ResultSetHeader>("UPDATE productos SET estado=1 WHERE id=?", [id]);
    if (result.affectedRows > 0) {
      return Response.json(respuesta(), { status: 200 });
    }
    return Response.json(respuestaError(), { status: 400 });
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 400 });
  }
}
