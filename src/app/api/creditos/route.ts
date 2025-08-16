import { respuestaError } from "@/utils/respuestas";
import { conexiondb } from "@/db/dbconfig";
import { RowDataPacket } from "mysql2";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const conn = await conexiondb.getConnection();
  try {
    const cliente = req.nextUrl.searchParams.get("cliente");
    const [creditos] = await conn.query<RowDataPacket[]>("SELECT * from creditostienda WHERE cliente = ?", [cliente]);
    for (const credito of creditos) {
      const [detalles] = await conn.query("SELECT * FROM detalles WHERE factura = ?", [credito.numeroFactura]);
      credito.detalles = detalles;
    }
    return Response.json(creditos);
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 400 });
  }
}
