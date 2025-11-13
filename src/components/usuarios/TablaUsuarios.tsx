"use client";

import { Usuario } from "@/domain/entities/Usuario";
import { useEliminarUsuarioMutation, useGetUsuariosQuery } from "@/hooks/useUsuarios";
import { toastSuccess } from "@/utils/formatToast";
import Link from "next/link";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";

export function TablaUsuarios() {
  const { usuarios, isLoading } = useGetUsuariosQuery();
  const { mutate: EliminarUsuario, isPending, isError, isSuccess, error, data } = useEliminarUsuarioMutation();
  const toast = useRef<Toast>(null);

  function ColaboradorTemplate(row: Usuario) {
    return (
      <div>
        {row?.nombres} {row.apellidos}
      </div>
    );
  }

  function eliminar(e: React.MouseEvent<HTMLButtonElement>, id: number) {
    confirmPopup({
      target: e.currentTarget,
      message: "¿Seguro que quiere eliminar este usuario?",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: () => EliminarUsuario(id),
    });
  }

  function AccionesTemplate(row: Usuario) {
    return (
      <div className="flex gap-1">
        <Link href={`/work/usuarios/edit/${row.id}`}>
          <Button size="small" text icon="pi pi-pencil" severity="success" />
        </Link>
        <Button size="small" severity="danger" text icon="pi pi-trash" onClick={(e) => eliminar(e, row.id)} loading={isPending} />
      </div>
    );
  }

  useEffect(() => {
    if (isSuccess) {
      toast.current?.show(toastSuccess(data));
    }

    if (isError) {
      toast.current?.show(toastSuccess(error));
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <ConfirmPopup />
      <Toast ref={toast} />
      <DataTable value={usuarios} loading={isLoading} paginator rows={10} dataKey={"id"} showGridlines size="small" rowsPerPageOptions={[10, 50, 100, 500]}>
        <Column body={AccionesTemplate} headerStyle={{ width: "7rem" }} />
        <Column field="usuario" header="Usuario" />
        <Column field="permiso" header="Permiso" />
        <Column header="Colaborador" body={ColaboradorTemplate} />
      </DataTable>
    </div>
  );
}
