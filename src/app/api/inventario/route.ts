import { conexiondb } from "@/db/dbconfig";
import { respuestaError } from "@/utils/respuestas";

export async function GET() {

  const conn = await conexiondb.getConnection()
  try {
    const [proveedores, marcas, pedidosPendientes, productos] = await Promise.all([
      conn.query("SELECT COUNT(id) as conteo FROM proveedores"),
      conn.query("SELECT COUNT(id) as conteo FROM marca"),
      conn.query("SELECT COUNT(id) as conteo FROM pedidos WHERE estado = 'pendiente'"),
      conn.query("SELECT COUNT(id) as conteo FROM productos WHERE estado = 1"),
    ]);


    return Response.json({
      proveedores: (proveedores as any)[0][0].conteo,
      marcas: (marcas as any)[0][0].conteo,
      pedidosPendientes: (pedidosPendientes as any)[0][0].conteo,
      productos: (productos as any)[0][0].conteo,
    });
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 400 });
  }finally{
    conn.release()
  }
}