import { conexiondb } from "@/db/dbconfig";
import { respuestaError } from "@/utils/respuestas";

export async function GET(request: Request) {
    const conn = await conexiondb.getConnection();
    try {
       const [avales] = await conn.query("SELECT * FROM avalestienda"); 
       return Response.json(avales)
    } catch (error) {
       console.log(error) 
       return Response.json(respuestaError(), {status: 500})
    }
}