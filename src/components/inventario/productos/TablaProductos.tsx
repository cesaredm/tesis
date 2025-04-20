"use client";

import { useEliminarProductoMutation, useGetProductosQuery } from "@/hooks/productos";
import { Producto, RespuestaApi } from "@/types";
import { formatDecimal } from "@/utils/helpers";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { isAxiosError } from "@/utils/axiosConfig";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Link from "next/link";

export function TableProductos() {
  const { data: productos, isLoading } = useGetProductosQuery();
  const [seleccion, setSeleccion] = useState<Producto[]>([]);
  const { mutate: eliminar, isPending, error, isError, isSuccess, data } = useEliminarProductoMutation();
  const toast = useRef<Toast>(null);

  function eliminarHandler() {
    if (seleccion.length === 0) return;
    const ids = seleccion.map((item) => item.id);
    eliminar(ids);
  }

  function confirmarEliminacion() {
    confirmDialog({
      message: "¿Seguro que quiere eliminar estos productos?",
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: () => eliminarHandler(),
    });
  }

  const HeaderTable = (
    <div className="flex justify-between items-center">
      <div>
        <Button size="small" icon={isPending ? "pi pi-spin pi-spinner" : "pi pi-trash"} severity="danger" label="Eliminar" disabled={seleccion.length === 0 || isPending} onClick={confirmarEliminacion} />
      </div>
      <div>
        <IconField>
          <InputIcon className="pi pi-search" />
          <InputText placeholder="Buscar..." />
        </IconField>
      </div>
    </div>
  );

  function PrecioCostoTable(row: Producto) {
    return (
      <div className="flex gap-1 justify-end">
        <span className="text-sm font-semibold">{formatDecimal(row.precioCosto)}</span>
      </div>
    );
  }

  function PrecioVentaTable(row: Producto) {
    return (
      <div className="flex justify-end gap-1">
        <span className="text-sm font-semibold">{formatDecimal(row.precioVenta)}</span>
      </div>
    );
  }

  function Acciones(row: Producto) {
    return (
      <div className="flex gap-1">
        <Link href={{ pathname: "/work/inventario/productos/edit", query: { producto: JSON.stringify(row) } }}>
          <Button icon="pi pi-pencil" size="small" severity="success" text />
        </Link>
      </div>
    );
  }

  function tostada(data: RespuestaApi) {
    toast.current?.show(data);
  }

  useEffect(() => {
    if (isError) {
      if (isAxiosError(error)) {
        tostada(error.response?.data);
      }
    }
    if (isSuccess) {
      tostada(data);
    }
  }, [isError, isSuccess]);

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <DataTable
        value={productos}
        emptyMessage={isLoading ? <span className="pi pi-spin pi-spinner" /> : "No hay productos"}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 100, 200]}
        paginatorTemplate={"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"}
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} productos"
        size="small"
        showGridlines
        className="w-full"
        dataKey="id"
        header={HeaderTable}
        rowHover
        selectionMode={"multiple"}
        selection={seleccion}
        onSelectionChange={(e) => setSeleccion(e.value)}
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        <Column body={Acciones} headerStyle={{ width: "3rem" }} />
        <Column field="codigoBarra" header="Codigo Barras" />
        <Column field="descripcion" header="Descripción" />
        <Column field="precioCosto" header="PrecioCosto" body={PrecioCostoTable} />
        <Column field="precioVenta" header="Precio venta" body={PrecioVentaTable} />
        <Column field="modelo" header="Modelo" />
        <Column field="stock" header="Existencia" />
        <Column field="marca" header="Marca" />
      </DataTable>
    </div>
  );
}
