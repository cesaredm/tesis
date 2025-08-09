import { format } from "@formkit/tempo";
import { conexiondb } from "@/db/dbconfig";
import { NextRequest } from "next/server";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { respuesta, respuestaError } from "@/utils/respuestas";
import { AperturaSchema } from "@/schemas/apertura.schema";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  const conn = await conexiondb.getConnection();
  try {
    const data = await req.json();
    const fecha = format({ date: new Date(), format: "YYYY-MM-DD", tz: "America/Tegucigalpa" });

    const [aperturas] = await conn.query<RowDataPacket[]>("SELECT * FROM aperturas WHERE fecha = ?", [fecha]);

    if (aperturas.length > 0) return Response.json(respuestaError({ error: "Ya se ha realizado una apertura de caja hoy" }), { status: 400 });

    const aperturaValida = AperturaSchema.parse({ ...data, fecha });

    const [result] = await conn.query<ResultSetHeader>("INSERT INTO aperturas SET ?", { aperturaValida });

    if (result.affectedRows === 0) return Response.json(respuestaError(), { status: 400 });

    return Response.json(respuesta(), { status: 201 });
  } catch (error) {
    console.log(error);
    if(error instanceof ZodError) return Response.json(respuestaError({ error: error.issues.map((issue) => issue.message).join(", \n ") }), { status: 400 });
    return Response.json(respuestaError(), { status: 400 });
  } finally {
    await conn.release();
  }
}
