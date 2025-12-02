"use client";

import { Producto } from "@/domain/entities/Productos";
import { useGetFullProductosQuery, useReIntegrarProductoMutation } from "@/hooks/productos";
import { toastError, toastSuccess } from "@/utils/formatToast";
import { formatDecimal } from "@/utils/helpers";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";

export function TablaFullProductos() {
  const { data: productos, isLoading } = useGetFullProductosQuery();
  const { mutate: reIntegrarProducto, isPending: isReIntegrando, error: errorReIntegrar, isError: isErrorReIntegrar, isSuccess: isSuccessReIntegrar, data: dataReIntegrar } = useReIntegrarProductoMutation();
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const toast = useRef<Toast>(null);

  const Header = (
    <div className="flex justify-end">
      <IconField>
        <InputIcon className="pi pi-search" />
        <InputText placeholder="Buscar" onChange={(e) => setFilters((prev) => ({ ...prev, global: { ...prev.global, value: e.target.value } }))} />
      </IconField>
    </div>
  );

  function AccionesTemplate(row: Producto) {
    return (
      <div className="">
        <Button
          icon="pi pi-refresh"
          text
          onClick={() => {
            confirmDialog({
              message: "¿Está seguro de re-integrar el producto?",
              header: "Confirmar Re-integración",
              icon: "pi pi-exclamation-triangle",
              accept: () => reIntegrarProducto(row.id),
            });
          }}
          loading={isReIntegrando}
          disabled={row.estado === 1}
        />
      </div>
    );
  }

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

  useEffect(() => {
    if (isSuccessReIntegrar) {
      toast.current?.show(toastSuccess(dataReIntegrar));
    }
    if (isErrorReIntegrar) {
      toast.current?.show(toastError(errorReIntegrar));
    }
  }, [isSuccessReIntegrar, isErrorReIntegrar]);

  return (
    <div>
      <ConfirmDialog />
      <Toast ref={toast} />
      <DataTable value={productos} loading={isLoading} dataKey={"id"} filters={filters} globalFilterFields={["id", "descripcion", "marca", "modelo"]} header={Header} rows={10} showGridlines size="small" paginator rowsPerPageOptions={[10, 50, 100]}>
        <Column body={AccionesTemplate} headerStyle={{ width: "4rem" }} />
        <Column field="codigoBarra" header="Codigo Barras" />
        <Column field="descripcion" header="Descripción" />
        <Column field="precioCosto" header="PrecioCosto" body={PrecioCostoTable} />
        <Column field="precioVenta" header="Precio venta" body={PrecioVentaTable} />
        <Column field="modelo" header="Modelo" />
        <Column field="stock" header="Existencia" />
        <Column field="marca" header="Marca" />
        <Column field="estado" header="Estado" body={(rowData) => (rowData.estado === 1 ? <Tag value="Activo" severity="success" /> : <Tag value="Inactivo" severity="danger" />)} />
      </DataTable>
    </div>
  );
}
