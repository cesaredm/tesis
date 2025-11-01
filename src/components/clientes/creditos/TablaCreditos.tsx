"use client";
import { HeaderForm } from "@/components/shared/HeaderForm";
import { useCreditosQuery } from "@/hooks/useCreditos";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export function TablaCreditos({ cliente }: { cliente: number }) {
  const { data: creditos, isLoading, isError } = useCreditosQuery(cliente);
  return (
    <div>
      <HeaderForm title="Creditos" description="Lista de creditos" />
      <DataTable value={creditos} dataKey="numeroCredito" loading={isLoading} emptyMessage={isError ? "Error al cargar los datos" : "No hay datos disponibles"} showGridlines rowHover stripedRows paginator rows={10} rowsPerPageOptions={[10, 25, 50]}>
        <Column header="Fecha Emision Factura" field="fechaEmisionFactura" />
        <Column header="Cliente" field="clientefullname" />
        <Column header="Aval" field="aval" />
        <Column header="Monto" field="total" />
        <Column header="# Factura" field="numeroFactura" />
        <Column header="# Credito" field="numeroCredito" />
      </DataTable>
    </div>
  );
}
