"use client";

import { Empleado } from "@/domain/entities/Empleado";
import { useGetEmpleadosQuery } from "@/hooks/useEmpleados";
import { useRouter } from "next/navigation";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export function TablaEmpleados() {
  const { empleados, isLoadingEmpleados } = useGetEmpleadosQuery();
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const router = useRouter();

  function onChangeGlobalFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFilters({
      ...filters,
      global: { ...filters.global, value },
    });
  }

  const Header = (
    <div className="flex justify-end">
      <IconField>
        <InputIcon className="pi pi-search" />
        <InputText placeholder="Buscar..." onChange={onChangeGlobalFilter} />
      </IconField>
    </div>
  );

  function AccionesTemplate(row: Empleado) {
    return (
      <div className="flex gap-0.5">
        <Button severity="success" text icon="pi pi-pencil" size="small" onClick={() => router.push(`/work/empleados/edit?empleado=${JSON.stringify(row)}`)} />
      </div>
    );
  }

  return (
    <div>
      <DataTable
        value={empleados}
        header={Header}
        showGridlines
        dataKey={"id"}
        size="small"
        loading={isLoadingEmpleados}
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 100, 500]}
        filters={filters}
        globalFilterFields={["idempleado", "nombres", "apellidos", "direccion", "dni", "municipio", "barrio", "departamento"]} 
      >
        <Column body={AccionesTemplate} headerStyle={{ width: "3rem" }} />
        <Column header="#Id" field="idempleado" />
        <Column header="Nombres" field="nombres" />
        <Column header="Apellidos" field="apellidos" />
        <Column header="Dni" field="dni" />
        <Column header="Dirección" field="direccion" />
        <Column header="Depto" field="departamento" />
        <Column header="Municipio" field="municipio" />
        <Column header="Barrio" field="barrio" />
        <Column header="L. Trabajo" field="lugarTrabajo" />
        <Column header="Teléfono" field="telefono" />
      </DataTable>
    </div>
  );
}
