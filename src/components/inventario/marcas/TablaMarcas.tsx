"use client";
import { DataTable } from "primereact/datatable";
import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { useEliminarMarcasMutation, useGetMarcasQuery } from "@/hooks/marcas";
import { Marca } from "@/types";
import { Spinner } from "@/components/Spinner";
import { Toast } from "primereact/toast";
import { isAxiosError } from "@/utils/axiosConfig";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Link from "next/link";

export function TablaMarcas() {
  const { data: marcas, isLoading } = useGetMarcasQuery();
  const { mutate: eliminarMarcas, isPending, isSuccess, isError, error, data } = useEliminarMarcasMutation();
  const [seleccion, setSeleccion] = useState<Marca[]>([]);
  const toast = useRef<Toast>(null);

  function eliminar() {
    const ids = seleccion.map((marca) => marca.id);
    eliminarMarcas(ids);
  }

  function confirmarEliminacion() {
    confirmDialog({
      message: "¿Seguro que quiere eliminar estas marcas?",
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: () => eliminar(),
    });
  }

  const Header = (
    <div className="flex items-center justify-between flex-wrap">
      <div>
        <Button icon="pi pi-trash" label="Eliminar" size="small" severity="danger" disabled={seleccion.length === 0 || isPending} onClick={confirmarEliminacion} />
      </div>
      <div>
        <IconField>
          <InputIcon className="pi pi-search" />
          <InputText placeholder="Buscar..." />
        </IconField>
      </div>
    </div>
  );

  function Acciones(row: Marca) {
    return (
      <div>
        <Link href={{ pathname: "/work/inventario/marcas/edit", query: { marca: JSON.stringify(row) } }}>
          <Button icon="pi pi-pencil" size="small" severity="success" text />
        </Link>
      </div>
    );
  }

  useEffect(() => {
    if (isSuccess) {
      toast.current?.show(data);
      setSeleccion([]);
    }
    if (isError) {
      if (isAxiosError(error)) {
        toast.current?.show({ ...error.response?.data, detail: error.response?.data.detail + " - " + error.response?.data.error });
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error al eliminar la marca",
          life: 3000,
        });
      }
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <Toast ref={toast} />
      <DataTable
        value={marcas}
        header={Header}
        showGridlines
        emptyMessage={isLoading ? <Spinner /> : "No hay datos."}
        size="small"
        selectionMode="multiple"
        selection={seleccion}
        onSelectionChange={(e) => setSeleccion(e.value)}
        rowHover
        rows={10}
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} marcas"
        rowsPerPageOptions={[10, 50, 100]}
        removableSort
        sortMode="multiple"
        dataKey="id"
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        <Column body={Acciones} headerStyle={{ width: "4rem" }} />
        <Column header="Marca" field="nombre" />
      </DataTable>
      <ConfirmDialog />
    </div>
  );
}
