import { conexiondb } from "@/db/dbconfig";
import { PagoSchema, PagoUpdateSchema } from "@/schemas/pago.schema";
import { respuesta, respuestaError } from "@/utils/respuestas";
import { ResultSetHeader } from "mysql2";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const datosPago = await request.json();

    const pagoValido = PagoSchema.parse(datosPago);

    const [result] = await conexiondb.query<ResultSetHeader>("INSERT INTO pagos SET ?", [pagoValido]);

    if (result.affectedRows > 0) {
      return Response.json(respuesta(), { status: 201 });
    }

    return Response.json(respuestaError(), { status: 400 });
  } catch (error: any) {
    console.log(error);
    if (error instanceof ZodError) return Response.json({ error: error.issues.map((issue) => issue.message).join(", \n ") }, { status: 400 });
    if (error.sqlState == 45000) return Response.json(respuestaError({ error : error.sqlMessage }), { status: 400 });
    return Response.json(respuestaError(), { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const datosPago = await request.json();
    const pagoValido = PagoUpdateSchema.parse(datosPago);
    const [result] = await conexiondb.query<ResultSetHeader>("UPDATE pagos SET ? WHERE id = ?", [pagoValido, pagoValido.id]);
    if (result.affectedRows > 0) {
      return Response.json({ mensaje: "Pago actualizado" }, { status: 200 });
    }
    return Response.json(respuestaError(), { status: 400 });
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if(!id) return Response.json(respuestaError({ message: "Falta el id del pago" }), { status: 400 });
    await conexiondb.query("DELETE FROM pagos WHERE id = ?", [id]);
    return Response.json(respuesta(), { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const conn = await conexiondb.getConnection();
  try {
    const id = request.nextUrl.searchParams.get("id");
    const [pago] = await conn.query("SELECT * FROM pagostienda WHERE cliente = ? ORDER BY id DESC", [id]);
    return Response.json(pago);
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 400 });
  }finally{
    conn.release()
  }
}
