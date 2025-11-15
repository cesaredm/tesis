"use client";

import { Calendar } from "primereact/calendar";
import { BoxForm } from "../shared/BoxForm";
import React, { useEffect, useRef, useState } from "react";
import { Transaccion } from "@/domain/entities/Transacciones";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatDecimal } from "@/utils/helpers";
import { getTransacciones, useDeleteTransaccionMutation } from "@/hooks/useTransacciones";
import { Toast } from "primereact/toast";
import { toastError, toastSuccess } from "@/utils/formatToast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

export function TablaTransacciones() {
  const [fecha, setFecha] = useState<Date>(new Date());
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: eliminarTransaccion, isPending, isSuccess, error, isError, data } = useDeleteTransaccionMutation();
  const toast = useRef<Toast>(null);

  async function getTransaccionesFecha() {
    if (loading) return;

    setLoading(true);
    const [data, error] = await getTransacciones(fecha);
    if (data) {
      setTransacciones(data);
    }
    if (error) {
      toast.current?.show(toastError(error));
    }
    setLoading(false);
  }

  async function onSubmitTransacciones(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await getTransaccionesFecha();
  }

  function eliminar(e: React.MouseEvent<HTMLButtonElement>, id: number) {
    confirmPopup({
      target: e.currentTarget,
      message: "¿Estás seguro de eliminar esta transacción?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        eliminarTransaccion(id);
      },
      acceptClassName: "p-button-danger",
      acceptIcon: "pi pi-trash",
      rejectIcon: "pi pi-times",
    });
  }

  const Header = (
    <div className="flex">
      <form action="" onSubmit={onSubmitTransacciones}>
        <BoxForm>
          <label htmlFor="">Fecha</label>
          <span className="flex gap-1">
            <Calendar required showIcon onChange={(e) => setFecha(e.value as Date)} value={fecha} />
            <Button icon={"pi pi-sync"} size="small" type="submit" loading={loading} />
          </span>
        </BoxForm>
      </form>
    </div>
  );

  function AccionesTemplate(row: Transaccion) {
    return (
      <>
        <Button icon={"pi pi-trash"} size="small" severity="danger" text loading={isPending} onClick={(e) => eliminar(e, row.id)} />
      </>
    );
  }

  useEffect(() => {
    if (isSuccess) {
      toast.current?.show(toastSuccess(data));
      getTransaccionesFecha();
    }
    if (isError) toast.current?.show(toastError(error));
  }, [isSuccess, isError]);

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmPopup />
      <DataTable
        value={transacciones}
        dataKey={"id"}
        header={Header}
        showGridlines
        size="small"
        paginator
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        rowsPerPageOptions={[10, 50, 100, 500]}
        currentPageReportTemplate={"Mostrando {first} a {last} de {totalRecords} registros"}
      >
        <Column field="acciones" headerStyle={{ width: "3rem", minWidth: "3rem" }} body={AccionesTemplate} />
        <Column field="id" header="ID" />
        <Column field="monto" header="Monto" body={(rowData) => <span className="text-end">{formatDecimal(rowData.monto)}</span>} />
        <Column field="tipo" header="Tipo" />
        <Column field="anotacion" header="anotacion" />
        <Column field="f" header="Fecha" />
      </DataTable>
    </div>
  );
}
