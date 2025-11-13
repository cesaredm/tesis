import { respuesta, respuestaError } from "@/utils/respuestas";
import { conexiondb } from "@/db/dbconfig";
import { z, ZodError } from "zod";
import { NextRequest } from "next/server";

const PagoPedidoSchema = z.object({
  pedido: z.number({ required_error: "El pedido es requerido", invalid_type_error: "El pedido debe ser un número" }).int("El pedido debe ser un número entero").positive("El pedido debe ser un número positivo"),
  fecha: z.string({ required_error: "La fecha es requerida", invalid_type_error: "La fecha debe ser una cadena" }),
  monto: z.number({ required_error: "El monto es requerido", invalid_type_error: "El monto debe ser un número" }).positive("El monto debe ser un número positivo").min(0.01, "El monto debe ser mayor a 0.01"),
});
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const pagoValidado = PagoPedidoSchema.parse(data);
    await conexiondb.query("INSERT INTO pagospedidos SET ?", [pagoValidado]);
    return Response.json(respuesta(), { status: 200 });
  } catch (error: any) {
    console.log(error);
    if (error instanceof ZodError) return Response.json(respuestaError({ error: error.issues.map((issue) => issue.message).join(", ") }), { status: 400 });
    return Response.json(respuestaError({ error: error.sqlMessage }), { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const conn = await conexiondb.getConnection();
  try {
    const params = req.nextUrl.searchParams;
    const id = params.get("pedido");

    if (!id) return Response.json(respuestaError({ error: "El id es requerido" }), { status: 400 });

    const [pagos] = await conn.query("SELECT *, DATE_FORMAT(fecha, '%d-%m-%Y %r') f FROM pagospedidos WHERE pedido = ?", [id]);

    return Response.json(pagos, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError({ error: "Error al procesar la solicitud" }), { status: 500 });
  } finally {
    conn.release();
  }
}

export async function DELETE(req: NextRequest) {
  const conn = await conexiondb.getConnection();
  try {
    const params = req.nextUrl.searchParams;
    const id = params.get("id");
    if (!id) return Response.json(respuestaError({ error: "El id es requerido" }), { status: 400 });
    await conn.query("DELETE FROM pagospedidos WHERE id = ?", [id]);
    return Response.json(respuesta(), { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError({ error: "Error al procesar la solicitud" }), { status: 500 });
  } finally {
    conn.release();
  }
}
