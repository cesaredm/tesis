import { auth } from "@/auth";
import { conexiondb } from "@/db/dbconfig";
import { DetalleFacturaSchema, FacturaSchema } from "@/schemas/facturacion.schema";
import { KardexSchema } from "@/schemas/productos.schema";
import { respuesta } from "@/utils/respuestas";
import { format } from "@formkit/tempo";
import { ResultSetHeader } from "mysql2";
import { ZodError } from "zod";

export async function POST(request: Request) {
  const conn = await conexiondb.getConnection();
  try {
    const sesion = await auth();
    const empleado = sesion?.user?.empleado;
    const body = await request.json();
    const listaDetalles = body.detalles;
    const { detalles, ...factura } = body.factura;
    const facturaValidada = FacturaSchema.parse(factura);
    await conn.beginTransaction();
    const [resFactura] = await conn.query<ResultSetHeader>("INSERT INTO facturas SET ?", [{ ...facturaValidada, empleado }]);
    for (const detalle of listaDetalles) {
      const detalleValidado = DetalleFacturaSchema.parse({ ...detalle, factura: resFactura.insertId });
      await conn.query("INSERT INTO detalles SET ?", [detalleValidado]);
      await conn.query("UPDATE productos SET stock = stock - ? WHERE id = ?", [detalleValidado.cantidad, detalleValidado.producto]);
      const kardexValidaddo = KardexSchema.parse({
        fecha: format({ date: new Date(), format: "YYYY-MM-DD HH:mm:ss", tz: "America/Tegucigalpa" }),
        cantidad: detalleValidado.cantidad,
        producto: detalleValidado.producto,
        tipoMovimiento: "Salida",
        empleado,
        nota: "Por venta de factura #" + resFactura.insertId,
      });
      await conn.query("INSERT INTO kardex SET ?", [kardexValidaddo]);
    }
    await conn.commit();
    return Response.json(respuesta(), { status: 201 });
  } catch (error) {
    await conn.rollback();
    console.log(error);
    if (error instanceof ZodError) {
      return Response.json(respuesta({ error: error.errors.map((e) => e.message).join(", ") }), { status: 400 });
    }
    return Response.json(respuesta({ error: "Error al crear la factura" }), { status: 400 });
  }
}
