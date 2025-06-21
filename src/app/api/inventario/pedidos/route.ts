import { conexiondb } from "@/db/dbconfig";
import { respuesta, respuestaError } from "@/utils/respuestas";
import { preprocess, z } from "zod";
import { ResultSetHeader, RowDataPacket } from "mysql2";

function parseNumber(value: unknown) {
  return Number(value);
}

const PedidoSchema = z.object({
  proveedor: z.number({
    required_error: "El proveedor es requerido",
    invalid_type_error: "El proveedor debe ser un número",
  }).positive({ message: "El proveedor debe ser un número positivo" }).int("El proveedor debe ser un número entero"),
  fecha: z.string({
    required_error: "La fecha es requerida",
    invalid_type_error: "La fecha debe ser una cadena",
  }).min(1, { message: "La fecha es requerida" }),
  estado: z.string({
    required_error: "El estado es requerido",
    invalid_type_error: "El estado debe ser una cadena",
  }).min(1, { message: "El estado es requerido" }),
});

const PedidoSchemaUpdate = PedidoSchema.extend({
  id: z.number({
    required_error: "El id es requerido",
    invalid_type_error: "El id debe ser un número",
  }).positive({ message: "El id debe ser un número positivo" }).int("El id debe ser un número entero"),
});

const DetalleSchema = z.object({
  pedido: z.number({
    required_error: "El pedido es requerido",
    invalid_type_error: "El pedido debe ser un número",
  }).positive({ message: "El pedido debe ser un número positivo" }).int("El pedido debe ser un número entero"),
  producto: z.number({
    required_error: "El producto es requerido",
    invalid_type_error: "El producto debe ser un número",
  }).positive({ message: "El producto debe ser un número positivo" }).int("El producto debe ser un número entero"),
  precio: preprocess(parseNumber, z.number({
    required_error: "El precio es requerido",
    invalid_type_error: "El precio debe ser un número",
  }).positive({ message: "El precio debe ser un número positivo" })),
  cantidad: z.number({
    required_error: "La cantidad es requerido",
    invalid_type_error: "La cantidad debe ser un número",
  }).positive({ message: "La cantidad debe ser un número positivo" }),
  importe: z.number({
    required_error: "El importe es requerido",
    invalid_type_error: "El importe debe ser un número",
  }).positive({ message: "El importe debe ser un número positivo" }),
});

export async function POST(req: Request) {
  const conn = await conexiondb.getConnection();
  try {
    const { pedido, detalles } = await req.json();
    const parsedData = PedidoSchema.parse(pedido);
    await conn.beginTransaction();
    const [result] = await conn.query<ResultSetHeader>("INSERT INTO pedidos SET ?", [parsedData]);
    if (result.affectedRows > 0) {
      for (const detalle of detalles) {
        const parsedDetalle = DetalleSchema.parse({...detalle, pedido: result.insertId});
        await conn.query<ResultSetHeader>("INSERT INTO productoproveedor SET ?", [parsedDetalle]);
      }
      await conn.commit();
      return Response.json(respuesta(), { status: 200 });
    }
    await conn.rollback();
    return Response.json(respuestaError(), { status: 404 });
  } catch (error) {
    console.log(error);
    conn.rollback();
    if (error instanceof z.ZodError) {
      return Response.json(respuestaError({ error: error.issues.map((issue) => issue.message).join(", \n ") }), { status: 400 });
    }
    return Response.json(respuestaError(), { status: 400 });
  } finally {
    conn.release();
  }
}

export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    const { id, proveedor, fecha, estado } = PedidoSchemaUpdate.parse(data);
    const [result] = await conexiondb.query<ResultSetHeader>("UPDATE pedidos SET proveedor=?, fecha=?, estado=? WHERE id = ?", [proveedor, fecha, estado, id]);
    if (result.affectedRows > 0) {
      return Response.json(respuesta(), { status: 200 });
    } else {
      return Response.json(respuestaError({ error: "Error al actualizar el pedido" }), { status: 400 });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return Response.json(respuestaError({ error: error.issues.map((issue) => issue.message).join(", \n ") }), { status: 400 });
    }
    return Response.json(respuestaError({ error: "Error al actualizar el pedido" }), { status: 400 });
  }
}

export async function GET() {
  try {
    const [pedidos] = await conexiondb.query<RowDataPacket[]>("SELECT p.*,DATE_FORMAT(p.fecha, '%d-%m-%Y %r') f FROM pedidostienda p");
    for (const pedido of pedidos) {
      const [detalles] = await conexiondb.query<RowDataPacket[]>("SELECT pp.*, p.descripcion, m.nombre marca FROM productoproveedor pp inner join productos p on pp.producto=p.id inner join marca m on p.marca=m.id WHERE pp.pedido = ?", [pedido.id]);
      pedido.detalles = detalles;
    }
    return Response.json(pedidos, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(respuestaError({ error: "Error al obtener los pedidos" }), { status: 400 });
  }
}
