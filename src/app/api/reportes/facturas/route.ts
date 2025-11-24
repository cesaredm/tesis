import { conexiondb } from "@/db/dbconfig";
import { respuestaError } from "@/utils/respuestas";
import { RowDataPacket } from "mysql2";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const conn = await conexiondb.getConnection();
  try {
    //const fecha = params.fecha;
    const fecha = request.nextUrl.searchParams.get("fecha");
    const [facturas] = await conn.query<RowDataPacket[]>("SELECT * FROM facturastienda where date(fecha) = ?", [fecha]);

    for (const factura of facturas) {
      const [detalles] = await conn.query<RowDataPacket[]>("SELECT d.id, d.cantidad, d.precio, d.importe, d.precioVenta,p.descripcion, p.modelo, p.marca, p.id producto FROM detalles d join inventariotienda p on d.producto = p.id where d.factura = ?", [factura.id]);
      factura.detalles = detalles;
    }

    return Response.json(facturas, { status: 200, statusText: "ok" });
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 500 });
  } finally {
    conn.release();
  }
}
