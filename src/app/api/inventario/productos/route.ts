import { respuesta, respuestaError } from "@/utils/respuestas";
import { conexiondb } from "@/db/dbconfig";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export async function GET() {
  const conn = await conexiondb.getConnection();
  try {
    const [productos] = await conn.query<RowDataPacket[]>("SELECT * FROM inventariotienda");
    return Response.json(productos);
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 404 });
  } finally {
    conn.destroy();
  }
}

export async function POST(req: Request) {
  try {
    const { codigoBarra, descripcion, modelo, precioCosto, precioVenta, stock, marca } = await req.json();
    const [res] = await conexiondb.query<ResultSetHeader>("INSERT INTO inventariotienda (codigoBarra, descripcion, modelo, precioCosto, precioVenta, stock, marca) SET ?", [
      { codigoBarra, descripcion, modelo, precioCosto, precioVenta, stock, marca },
    ]);
    if (res.affectedRows > 0) {
      return Response.json(respuesta(), { status: 200 });
    }
    return Response.json(respuestaError(), { status: 404 });
  } catch (error) {
    console.log(error);

    return Response.json(respuestaError(), { status: 404 });
  }
}

export async function UPDATE(req: Request) {
  try {
    const { codigoBarra, descripcion, modelo, precioCosto, precioVenta, stock, marca } = await req.json();
    const [res] = await conexiondb.query<ResultSetHeader>("UPDATE productos SET codigoBarra = ?, descripcion = ?, modelo = ?, precioCosto = ?, precioVenta = ?, stock = ?, marca = ? WHERE id = ?", [
      codigoBarra,
      descripcion,
      modelo,
      precioCosto,
      precioVenta,
      stock,
      marca,
      codigoBarra,
    ]);

    if (res.affectedRows > 0) {
      return Response.json(respuesta(), { status: 200 });
    }

    return Response.json(respuestaError(), { status: 404 });
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 404 });
  }
}
