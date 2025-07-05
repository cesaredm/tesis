"use client";
import { Kardex } from "@/types/kardex";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export function TablaKardex({ movimientos }: { movimientos: Kardex[] }) {
  return (
    <div>
      <DataTable value={movimientos} showGridlines dataKey={"id"}>
        <Column field={"f"} header={"Fecha"} sortable />
        <Column field={"cantidad"} header={"Cantidad"} sortable />
        <Column field={"tipoMovimiento"} header={"Tipo Movimiento"} sortable />
        <Column field={"nota"} header={"Nota"} />
        <Column field={"fullnameempleado"} header={"Empleado"} />
      </DataTable>
    </div>
  );
}
