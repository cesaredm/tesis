"use client";

import { PagoPedido } from "@/domain/entities/Pedidos";
import { useEliminarPagoPedidoMutation, useGetPagosPedido } from "@/hooks/pedidos";
import { toastError, toastSuccess } from "@/utils/formatToast";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";

export function TablaPagosPedidos({ pedido }: { pedido: string }) {
  const { data: pagos, isLoading, isError } = useGetPagosPedido(Number(pedido));
  const { mutate: eliminarPago, isPending, isError: isDeleteError, isSuccess, error, data } = useEliminarPagoPedidoMutation();
  const toast = useRef<Toast>(null);

  function eliminar(e: React.MouseEvent<HTMLButtonElement>, pago: number) {
    confirmPopup({
      target: e.currentTarget,
      message: "¿Seguro que quiere eliminar este pago?",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: () => eliminarPago(pago),
    });
  }

  function AccionesTemplate(row: PagoPedido) {
    return <Button size="small" icon="pi pi-trash" severity="danger" text loading={isPending} onClick={(e) => eliminar(e, row.id)} />;
  }

  useEffect(() => {
    if (isSuccess) {
      toast.current?.show(toastSuccess(data));
    }

    if (isDeleteError) {
      toast.current?.show(toastError(error));
    }
  }, [isSuccess, isDeleteError]);

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmPopup />
      <DataTable value={pagos} size="small" loading={isLoading} showGridlines dataKey={"id"} emptyMessage={isError ? "Oops ha ocurrido un error" : "No hay pagos registrados"}>
        <Column body={AccionesTemplate} headerStyle={{ width: "3rem", minWidth: "3rem" }} />
        <Column field={"f"} header={"Fecha"} />
        <Column field="monto" header="Monto" />
        <Column field="pedido" header="Pedido" />
      </DataTable>
    </div>
  );
}
