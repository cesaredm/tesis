"use client";
import { useGetProductosQuery } from "@/hooks/productos";
import { Producto } from "@/types";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export function Inventario() {
  const { data, isLoading } = useGetProductosQuery();
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  function onGlobalFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFilters((filters) => {
      return { ...filters, global: {...filters.global, value} };
    });
  }

  const Header = (
    <div className="flex">
      <IconField>
        <InputIcon className="pi pi-search" />
        <InputText placeholder="Buscar..." onChange={onGlobalFilterChange} />
      </IconField>
    </div>
  );

  function AccionesTable(row: Producto){
    return(
      <div>
        <Button icon="pi pi-plus" size="small" />
      </div>
    )
  }

  return (
    <div>
      <DataTable showGridlines value={data} filters={filters} header={Header} globalFilterFields={["codigoBarra", "descripcion"]} size="small">
        <Column body={AccionesTable} />
        <Column header="Cod. Barras" field="codigoBarra" />
        <Column header="Descripcion" field="descripcion" />
        <Column header="Existencia" field="stock" />
        <Column header="Precio Venta" field="precioVenta" />
      </DataTable>
    </div>
  );
}
