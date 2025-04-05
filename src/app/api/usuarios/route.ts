import { pool } from "@/db/dbconfig";
import { RowDataPacket } from "mysql2";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { usuario, password } = body;

    if (!usuario || !password) {
      return Response.json(
        {
          message: "Usuario y contraseña son requeridos",
        },
        { status: 400 }
      );
    }

    const [users] = await pool.query<RowDataPacket[]>(
      "SELECT u.usuario, u.empleado FROM usuarios u WHERE u.usuario=? AND u.password=?",
      [usuario, password]
    );

    if (!users || users.length === 0) {
      return Response.json(
        {
          message: "Usuario o contraseña incorrectos",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        message: "Usuario encontrado con éxito.",
        usuario: users[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en la autenticación:", error);
    return Response.json(
      {
        message: "Error en el servidor",
      },
      { status: 500 }
    );
  }
}
