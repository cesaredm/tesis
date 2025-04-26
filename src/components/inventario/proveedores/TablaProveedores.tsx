"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useGetProveedoresQuery } from "@/hooks/proveedores";
import { Spinner } from "@/components/Spinner";

export function TablaProveedores() {
  const { data, isLoading } = useGetProveedoresQuery();
  console.log(data);
  return (
    <div>
      <DataTable
        value={data}
        paginator
        paginatorTemplate={"CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"}
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} proveedores"
        rows={10}
        rowsPerPageOptions={[10, 25, 50, 100]}
        header="Proveedores"
        emptyMessage={isLoading ? <Spinner /> : "No hay proveedores registrados"}
        showGridlines
        rowHover
        dataKey={"id"}
        size="small"
      >
        <Column field="nombre" header="Nombre" sortable />
        <Column field="telefono" header="Teléfono" sortable />
        <Column field="cuentaBancaria" header="Cuenta Bancaria" sortable />
        <Column field="vendedor" header="Vendedor" sortable />
        <Column field="telefonoVendedor" header="Teléfono Vendedor" sortable />
      </DataTable>
    </div>
  );
}
