import { conexiondb } from "@/db/dbconfig";
import { TransaccionSchemaUpdate } from "@/schemas/transaccion.schema";
import { respuesta, respuestaError } from "@/utils/respuestas";
import { format } from "@formkit/tempo";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  const conn = await conexiondb.getConnection();
  try {
    const fecha = req.nextUrl.searchParams.get("fecha");
    const [transacciones] = await conn.query("SELECT * FROM transacciones WHERE DATE(fecha) = ?", [fecha]);
    return Response.json(transacciones);
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 400 });
  } finally {
    await conn.release();
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const transaccionValida = TransaccionSchemaUpdate.parse({ ...data, fecha: format({ date: new Date(), format: "YYYY-MM-DD HH:mm:ss", tz: "America/Tegucigalpa" }) });

    await conexiondb.query("INSERT INTO transacciones SET ?", [transaccionValida]);

    return Response.json(respuesta(), { status: 201 });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) return Response.json(respuestaError({ error: error.issues.map((issue) => issue.message).join(", \n ") }), { status: 400 });
    return Response.json(respuestaError(), { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) return Response.json(respuestaError({ message: "Falta el id de la transaccion" }), { status: 400 });

    await conexiondb.query("DELETE FROM transacciones WHERE id = ?", [id]);
    return Response.json(respuesta(), { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 400 });
  }
}
