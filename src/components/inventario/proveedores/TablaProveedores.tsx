"use client";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEliminarProveedorMutation, useGetProveedoresQuery } from "@/hooks/proveedores";
import { Spinner } from "@/components/Spinner";
import { Proveedor } from "@/types";
import { Fragment, useEffect } from "react";
import { Button } from "primereact/button";
import Link from "next/link";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useState, useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { isAxiosError } from "@/utils/axiosConfig";
import { FilterMatchMode } from "primereact/api";

export function TablaProveedores() {
  const { data, isLoading } = useGetProveedoresQuery();
  const [seleccion, setSelection] = useState<Proveedor>();
  const { mutate, isPending, isSuccess, isError, error, data: dataDelete } = useEliminarProveedorMutation();
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const toast = useRef<Toast>(null);

  function onGlobalFilterChange(e:React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFilters((prev)=>{
      return { ...prev, global: { value, matchMode: FilterMatchMode.CONTAINS } };
    });
  }

  const HeaderTable = (
    <div className="flex justify-between items-center flex-wrap gap-1">
      <div>
        <Button size="small" label="Eliminar" severity="danger" icon="pi pi-trash" disabled={!seleccion} onClick={confirmarEliminacion} />
      </div>
      <div>
        <IconField>
          <InputIcon className="pi pi-search" />
          <InputText placeholder="Buscar..." onChange={onGlobalFilterChange} />
        </IconField>
      </div>
    </div>
  );

  function confirmarEliminacion() {
    confirmDialog({
      message: "¿Está seguro de que desea eliminar este proveedor?",
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Eliminar",
      rejectLabel: "Cancelar",
      acceptClassName: "p-button-danger",
      accept: () => {
        // Aquí va la lógica para eliminar el proveedor
        if (seleccion) mutate(seleccion?.id);
      },
    });
  }

  function AccionesTabla(row: Proveedor) {
    return (
      <Fragment>
        <Link href={{ pathname: "/work/inventario/proveedores/edit", query: { proveedor: JSON.stringify(row) } }}>
          <Button icon="pi pi-pencil" severity="success" rounded text size="small" />
        </Link>
      </Fragment>
    );
  }

  useEffect(() => {
    if (isSuccess) {
      toast.current?.show(dataDelete);
      setSelection(undefined);
    }

    if (isError) {
      if (isAxiosError(error)) {
        toast.current?.show({
          ...error.response?.data,
          detail: error.response?.data.message + " - " + error.response?.data.error,
          life: 3000,
        });
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error al eliminar el proveedor",
          life: 3000,
        });
      }
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <ConfirmDialog />
      <Toast ref={toast} position="center" />
      <DataTable
        value={data}
        paginator
        paginatorTemplate={"CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"}
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} proveedores"
        rows={10}
        rowsPerPageOptions={[10, 25, 50, 100]}
        header={HeaderTable}
        emptyMessage={isLoading ? <Spinner /> : "No hay proveedores registrados"}
        showGridlines
        rowHover
        dataKey={"id"}
        size="small"
        selectionMode={"single"}
        selection={seleccion}
        onSelectionChange={(e) => setSelection(e.value as Proveedor)}
        filters={filters}
        globalFilterFields={["nombre", "telefono", "cuentaBancaria", "vendedor", "telefonoVendedor"]}
      >
        <Column body={AccionesTabla} headerStyle={{ width: "3rem" }} />
        <Column field="nombre" header="Nombre" sortable />
        <Column field="telefono" header="Teléfono" sortable />
        <Column field="cuentaBancaria" header="Cuenta Bancaria" sortable />
        <Column field="vendedor" header="Vendedor" sortable />
        <Column field="telefonoVendedor" header="Teléfono Vendedor" sortable />
      </DataTable>
    </div>
  );
}
