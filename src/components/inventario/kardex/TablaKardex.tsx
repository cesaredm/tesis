'use client'
import { Kardex } from "@/types/kardex";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export function TablaKardex({movimientos}: {movimientos: Kardex[]}) {
  return <div>
    <DataTable
      value={movimientos}
    >
      <Column field={"f"} header={'Fecha'} />
      <Column field={"cantidad"} header={'Cantidad'} />
      <Column field={"tipoMovimiento"} header={'Tipo Movimiento'} />
      <Column field={"nota"} header={'Nota'} />
      <Column field={"fullnameempleado"} header={'Empleado'} />
    </DataTable>
  </div>;
}