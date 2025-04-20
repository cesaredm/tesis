import { respuesta, respuestaError } from "@/utils/respuestas";
import { conexiondb } from "@/db/dbconfig";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { format } from "@formkit/tempo";
import { auth } from "@/auth";
import { z } from "zod";
import { NextRequest } from "next/server";

const productoSchema = z.object({
  codigoBarra: z.string().optional().nullable(),
  descripcion: z.string({ required_error: "La descripción es requerida" }),
  modelo: z.string().optional().nullable(),
  precioCosto: z.number().optional().nullable(),
  precioVenta: z.number({ required_error: "El precio de venta es requerido", invalid_type_error: "El precio de venta debe ser un número" }).positive({ message: "El precio de venta debe ser un número positivo" }),
  stock: z.number({ required_error: "El stock es requerido", invalid_type_error: "El stock debe ser un número" }).positive({ message: "El stock debe ser un número positivo" }),
  marca: z.number({ required_error: "La marca es requerida", invalid_type_error: "La marca debe ser un número" }).positive({ message: "La marca debe ser un número positivo" }).int("La marca debe ser un número entero"),
});

const idSchema = z.object({
  id: z.number(),
});

const productosUpdateSchema = productoSchema.extend({
  id: z.number(),
});

export async function GET() {
  const conn = await conexiondb.getConnection();
  try {
    const [productos] = await conn.query<RowDataPacket[]>("SELECT * FROM inventariotienda WHERE estado=1 ORDER BY id DESC");
    return Response.json(productos);
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 404 });
  } finally {
    conn.destroy();
  }
}

export async function POST(req: NextRequest) {
  const user = await auth();
  // @ts-ignore
  const empleado = user?.user?.empleado;
  const conn = await conexiondb.getConnection();
  try {
    const { codigoBarra, descripcion, modelo, precioCosto, precioVenta, stock, marca } = await req.json();
    const parsedData = productoSchema.parse({ codigoBarra, descripcion, modelo, precioCosto, precioVenta, stock, marca });
    await conn.beginTransaction();
    const [res] = await conn.query<ResultSetHeader>("INSERT INTO productos SET ?", [parsedData]);
    const [resKardex] = await conn.query<ResultSetHeader>("INSERT INTO kardex SET ?", [
      { producto: res.insertId, fecha: format({ date: new Date(), format: "YYYY-MM-DD HH:mm:ss", tz: "America/Tegucigalpa" }), tipoMovimiento: "Ingreso", cantidad: parsedData.stock, empleado, nota: "Inventario inicial" },
    ]);
    await conn.commit();
    if (res.affectedRows > 0 && resKardex.affectedRows > 0) {
      return Response.json(respuesta(), { status: 200 });
    }
    return Response.json(respuestaError(), { status: 404 });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) return Response.json(respuestaError({ error: error.issues.map((issue) => issue.message).join(", \n ") }), { status: 400 });
    return Response.json(respuestaError(), { status: 404 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, codigoBarra, descripcion, modelo, precioCosto, precioVenta, stock, marca } = await req.json();
    const parsedData = productosUpdateSchema.parse({id, codigoBarra, descripcion, modelo, precioCosto, precioVenta, stock, marca });
    const [res] = await conexiondb.query<ResultSetHeader>("UPDATE productos SET codigoBarra = ?, descripcion = ?, modelo = ?, precioCosto = ?, precioVenta = ?, stock = ?, marca = ? WHERE id = ?", [
      parsedData.codigoBarra,
      parsedData.descripcion,
      parsedData.modelo,
      parsedData.precioCosto,
      parsedData.precioVenta,
      parsedData.stock,
      parsedData.marca,
      parsedData.id,
    ]);

    if (res.affectedRows > 0) {
      return Response.json(respuesta(), { status: 200 });
    }

    return Response.json(respuestaError(), { status: 404 });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) return Response.json(respuestaError({ error: error.issues.map((issue) => issue.message).join(", \n ") }), { status: 400 });
    return Response.json(respuestaError(), { status: 404 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { productos } = await req.json();
    for (const producto of productos) {
      await conexiondb.query<ResultSetHeader>("UPDATE productos SET estado=0 WHERE id = ?", [producto]);
    }
    return Response.json(respuesta(), { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError(), { status: 404 });
  }
}
