"use client";

import { Usuario } from "@/domain/entities/Usuario";
import { useGetUsuariosQuery } from "@/hooks/useUsuarios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export function TablaUsuarios() {
  const { usuarios, isLoading } = useGetUsuariosQuery();

  function ColaboradorTemplate(row: Usuario) {
    return (
      <div>
        {row?.nombres} {row.apellidos}
      </div>
    );
  }

  function AccionesTemplate(row: Usuario) {
    return (
      <div className="flex gap-1">
        <Button size="small" text icon="pi pi-pencil" severity="success" />
        <Button size="small" severity="danger" text icon="pi pi-trash" />
      </div>
    );
  }

  return (
    <div>
      <DataTable value={usuarios} loading={isLoading} paginator rows={10} dataKey={"id"} showGridlines size="small" rowsPerPageOptions={[10, 50, 100, 500]}>
        <Column body={AccionesTemplate} headerStyle={{width:'7rem'}} />
        <Column field="usuario" header="Usuario" />
        <Column field="permiso" header="Permiso" />
        <Column header="Colaborador" body={ColaboradorTemplate} />
      </DataTable>
    </div>
  );
}
