import { auth } from "@/auth";
import { conexiondb } from "@/db/dbconfig";
import { respuesta, respuestaError } from "@/utils/respuestas";
import { format } from "@formkit/tempo";
import { RowDataPacket } from "mysql2";
import { z } from "zod";

const SchemaDevolver = z.object({
  id: z.number({ required_error: "El id es requerido", invalid_type_error: "El id debe ser un número" }),
  cantidad: z.number({ required_error: "La cantidad es requerida", invalid_type_error: "La cantidad debe ser un número" }),
  producto: z.number({ required_error: "El producto es requerido", invalid_type_error: "El producto debe ser un número" }),
  factura: z.number({ required_error: "El id de la factura es requerido", invalid_type_error: "El id de la factura debe ser un número" }),
});

function calcularNuevoImporte(cantidad: number, precio: number) {
  return cantidad * precio;
}

export async function POST(req: Request) {
  const data = await req.json();
  const conn = await conexiondb.getConnection();
  const sesion = await auth();
  //@ts-expect-error holla
  const empleado = sesion?.user?.empleado;
  try {
    await conn.beginTransaction();
    const [detalle] = await conn.query<RowDataPacket[]>("SELECT * from detalles where id = ?", [data.id]);
    const { cantidad: cantidadComprada, factura, precio, producto } = detalle[0];

    const datosValidos = SchemaDevolver.parse({ ...data, producto, factura });
    await conn.query("UPDATE detalles SET cantidad = cantidad - ?, importe = importe - ? WHERE id = ?", [datosValidos.cantidad, calcularNuevoImporte(datosValidos.cantidad, precio), datosValidos.id]);
    await conn.query("UPDATE productos SET stock = stock + ? WHERE id = ?", [datosValidos.cantidad, datosValidos.producto]);
    await conn.query("INSERT INTO kardex SET ?", [
      {
        producto: datosValidos.producto,
        fecha: format({ date: new Date(), format: "YYYY-MM-DD HH:mm:ss", tz: "America/Tegucigalpa" }),
        tipoMovimiento: "Entrada",
        cantidad: datosValidos.cantidad,
        empleado,
        nota: "Por devolución de factura #" + datosValidos.factura,
      },
    ]);
    await conn.commit();
    return Response.json(respuesta());
  } catch (error: any) {
    console.log(error);
    await conn.rollback();
    if (error instanceof z.ZodError) {
      return Response.json(respuestaError({ error: error.issues.map((issue) => issue.message).join(", \n ") }));
    }
    if (error.sqlState == "22003") {
      return Response.json(respuestaError({ error: "No se puede devolver más cantidad de la que se ha comprado" }), { status: 400 });
    }
    return Response.json(respuestaError());
  } finally {
    conn.destroy();
  }
}
