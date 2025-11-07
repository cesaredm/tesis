"use client";

import { Pago } from "@/domain/entities/Pagos";
import { useEliminarPagoMutation, useGetPagosQuery } from "@/hooks/clientes";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { toastError, toastSuccess } from "@/utils/formatToast";

export function TablaPagosCliente({ cliente }: { cliente: number }) {
  const { data: pagos, isLoading, isError, error } = useGetPagosQuery(cliente);
  const { mutate: eliminarPago, isPending, isError: isDeleteError, isSuccess: isSuccessEliminar, error: deleteError, data: dataEliminar } = useEliminarPagoMutation();

  const toast = useRef<Toast>(null);

  function confirmarEliminacion(id: number, e: any) {
    confirmPopup({
      target: e.currentTarget,
      message: "¿Seguro que quiere eliminar este pago?",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: () => eliminarPago(id),
    });
  }

  function AccionesTemplate(row: Pago) {
    return (
      <div className="flex gap-0.5">
        <Button severity="danger" text icon="pi pi-trash" size="small" onClick={(e) => confirmarEliminacion(row.id, e)} loading={isPending} />
      </div>
    );
  }

  useEffect(() => {
    if (isSuccessEliminar) {
      toast.current?.show(toastSuccess(dataEliminar));
    }
    if (isDeleteError) {
      toast.current?.show(toastError(deleteError));
    }
  }, [isSuccessEliminar, isDeleteError]);

  return (
    <div>
      <ConfirmPopup />
      <Toast ref={toast} />
      <DataTable
        value={pagos}
        header={`Pagos realizados por el cliente #${cliente}`}
        loading={isLoading}
        emptyMessage={isError ? "Oops. Algo salió mal 😓" : "No se encontraron pagos."}
        dataKey="id"
        showGridlines
        size="small"
        rowsPerPageOptions={[10, 50, 100, 500]}
        rows={10}
        paginator
      >
        <Column body={AccionesTemplate} headerStyle={{ width: "3rem" }} />
        <Column field="monto" header="Monto" />
        <Column field="f" header="Fecha" />
        <Column field="credito" header="# Crédito" />
      </DataTable>
    </div>
  );
}
