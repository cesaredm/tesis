import { auth } from "@/auth";
import { conexiondb } from "@/db/dbconfig";
import { respuesta, respuestaError } from "@/utils/respuestas";
import { format } from "@formkit/tempo";
import { z } from "zod";
import { KardexSchema } from "@/schemas/productos.schema";

export async function POST(request: Request) {
  const conn = await conexiondb.getConnection();
  try {
    const sesion = await auth();
    const movimiento = await request.json();
    const movimientoValidado = KardexSchema.parse({
      ...movimiento,
      empleado: sesion?.user?.empleado,
      fecha: format({ date: new Date(), format: "YYYY-MM-DD HH:mm:ss", tz: "America/Tegucigalpa" }),
    });
    await conn.beginTransaction();
    if (movimientoValidado.tipoMovimiento === "Ingreso") {
      await conn.query("UPDATE productos SET stock = stock + ? WHERE id = ?", [movimientoValidado.cantidad, movimientoValidado.producto]);
    }
    if (movimientoValidado.tipoMovimiento === "Salida") {
      await conn.query("UPDATE productos SET stock = stock - ? WHERE id = ?", [movimientoValidado.cantidad, movimientoValidado.producto]);
    }
    await conn.query("INSERT INTO kardex (producto, fecha, cantidad, tipoMovimiento, empleado, nota) VALUES (?, ?, ?, ?, ?, ?)", [
      movimientoValidado.producto,
      movimientoValidado.fecha,
      movimientoValidado.cantidad,
      movimientoValidado.tipoMovimiento,
      movimientoValidado.empleado,
      movimientoValidado.nota,
    ]);
    await conn.commit();
    return Response.json(respuesta("Movimiento de kardex creado exitosamente"), { status: 201 });
  } catch (error) {
    console.log("Error en la ruta POST de kardex:", error);
    await conn.rollback();
    if (error instanceof z.ZodError) {
      return Response.json(respuestaError({ error: error.errors.map((e) => e.message).join(", ") }), { status: 400 });
    }
    return Response.json(respuestaError(), { status: 400 });
  }
}
