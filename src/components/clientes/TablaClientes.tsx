"use client";

import { useGetClientesQuery } from "@/hooks/clientes";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Spinner } from "../shared/Spinner";
import { Column } from "primereact/column";
import { HeaderForm } from "../shared/HeaderForm";
import { Button } from "primereact/button";
import { Cliente } from "@/domain/entities/Clientes";
import { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

export function TablaClientes() {
  const { data: clientes, isLoading, isError } = useGetClientesQuery();
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  function AccionesTemplate(row: Cliente) {
    return (
      <div>
        <Button severity="success" icon="pi pi-pencil" size="small" />
      </div>
    );
  }

  function onChangeGlobalFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFilters((prev) => {
      return {
        ...prev,
        global: { ...prev.global, value },
      };
    });
  }

  const Header = (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
      <h2 className="text-xl font-bold">Clientes</h2>
      <IconField>
        <InputIcon className="pi pi-search" />
        <InputText placeholder="Buscar..." onChange={onChangeGlobalFilter} />
      </IconField>
    </div>
  );

  return (
    <section>
      <HeaderForm description="Lista de clientes" title="Clientes" />
      <DataTable value={clientes} header={Header} dataKey={"idCliente"} emptyMessage={isLoading ? <Spinner /> : isError ? "Error al cargar los datos" : "No hay datos disponibles"} showGridlines rowHover stripedRows filters={filters} globalFilterFields={["nombreCompleto", "dni", "direccion", "departamento", "municipio", "barrio", "lugarTrabajo", "telefono"]} paginator rows={10} rowsPerPageOptions={[10, 25, 50]}>
        <Column body={AccionesTemplate} headerStyle={{ width: "3rem" }} />
        <Column header="Nombre completo" field="nombreCompleto" />
        <Column header="DNI" field="dni" />
        <Column header="Dirección" field="direccion" />
        <Column header="Departamento" field="departamento" />
        <Column header="Municipio" field="municipio" />
        <Column header="Barrio" field="barrio" />
        <Column header="Lugar de trabajo" field="lugarTrabajo" />
        <Column header="Teléfono" field="telefono" />
      </DataTable>
    </section>
  );
}
