import { conexiondb } from "@/db/dbconfig";
import { respuestaError } from "@/utils/respuestas";

export async function GET() {
  try {
    const [proveedores, marcas, pedidosPendientes, productos] = await Promise.all([
      conexiondb.query("SELECT COUNT(id) as conteo FROM proveedores"),
      conexiondb.query("SELECT COUNT(id) as conteo FROM marca"),
      conexiondb.query("SELECT COUNT(id) as conteo FROM pedidos WHERE estado = 'pendiente'"),
      conexiondb.query("SELECT COUNT(id) as conteo FROM productos WHERE estado = 1"),
    ]);


    return Response.json({
      proveedores: (proveedores as any)[0][0].conteo,
      marcas: (marcas as any)[0][0].conteo,
      pedidosPendientes: (pedidosPendientes as any)[0][0].conteo,
      productos: (productos as any)[0][0].conteo,
    });
  } catch (error) {
    return Response.json(respuestaError(), { status: 400 });
  }
}