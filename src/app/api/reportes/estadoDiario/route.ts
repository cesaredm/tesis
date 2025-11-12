import { NextRequest } from "next/server";
import { conexiondb } from "@/db/dbconfig";
import { RowDataPacket } from "mysql2";
import { respuestaError } from "@/utils/respuestas";

export async function GET(request: NextRequest) {
  const conn = await conexiondb.getConnection();
  try {
    const fecha1 = request.nextUrl.searchParams.get("fecha1");
    const fecha2 = request.nextUrl.searchParams.get("fecha2");
    const [estado] = await conn.query<RowDataPacket[][]>("CALL estadoDiario(?,?)", [fecha1, fecha2]);
    return Response.json(estado[0], { status: 200, statusText: "ok" });
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 500 });
  } finally {
    conn.release();
  }
}
