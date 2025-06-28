import { conexiondb } from "@/db/dbconfig";
import { Suspense } from "react";
import { TablaKardex } from "@/components/inventario/kardex/TablaKardex";
import { Kardex } from "@/types/kardex";
import { Spinner2 } from "@/components/Spinner2";

async function getKardex(id: string) {
  "use server";
  const conn = await conexiondb.getConnection();
  try {
    const [rows] = await conn.query(`select k.*, DATE_FORMAT(k.fecha, '%d-%m-%Y ,%r') f, concat(e.nombres, ' ', e.apellidos) as fullnameempleado from kardex k INNER JOIN empleadostienda e on k.empleado = e.idempleado where producto = ?`, [id]);
    return rows;
  } catch (error) {
    console.log(error);
    return [];
  } finally {
    conn.release();
  }
}

export default async function({ searchParams }: { searchParams: { id: string, n: string } }) {
  const {id, n} = await searchParams;
  const mov = await getKardex(id);

  return (
    <div>
      <h4 className={'text-2xl font-bold text-primary text-center'}>{n}</h4>
      <Suspense fallback={<Spinner2 />}>
        <TablaKardex movimientos={mov as Kardex[]} />
      </Suspense>
    </div>
  );
}