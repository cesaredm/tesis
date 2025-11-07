"use client";
import { HeaderForm } from "@/components/shared/HeaderForm";
import { useCreditosQuery } from "@/hooks/useCreditos";
import { formatDecimal } from "@/utils/helpers";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableExpandedRows, DataTableValueArray } from "primereact/datatable";
import { useState } from "react";
import { DialogPago } from "./DialogPago";
import { Credito } from "@/domain/entities/Creditos";
import { Tag } from "primereact/tag";

export function TablaCreditos({ cliente }: { cliente: number }) {
  const { data: creditos, isLoading, isError } = useCreditosQuery(cliente);
  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);

  function ExpandedRowTemplate(row: any) {
    return (
      <DataTable value={row.detalles} header={`Factura # ${row.numeroFactura}`}>
        <Column header={"Cant"} field={"cantidad"} />
        <Column header={"Descripcion"} field={"descripcion"} />
        <Column header={"Precio"} field={"precio"} body={(row: any) => formatDecimal(row.precio)} />
        <Column header={"Importe"} field={"importe"} body={(row: any) => formatDecimal(row.importe)} />
      </DataTable>
    );
  }

  function MontoTemplate(row: Credito) {
    return <div className="text-end">{formatDecimal(row.total)}</div>;
  }
  function PagosTemplate(row: Credito) {
    return <div className="text-end">{formatDecimal(row.pagos)}</div>;
  }

  function AccionesTemplate(row: any) {
    return (
      <div>
        <DialogPago credito={row.numeroCredito} />
      </div>
    );
  }

  function EstadoTemplate(row: Credito){
    const saldo = Number(row.total) - Number(row.pagos);
    return (
      saldo > 0 ? <Tag severity={'warning'} value={'PENDIENTE'} /> : <Tag severity="success" value="PAGADO" />
    )
  }

  return (
    <div>
      <HeaderForm title="Creditos" description="Lista de creditos" />
      <DataTable
        value={creditos}
        dataKey="numeroCredito"
        loading={isLoading}
        emptyMessage={isError ? "Error al cargar los datos" : "No hay datos disponibles"}
        showGridlines
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        size="small"
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={ExpandedRowTemplate}
      >
        <Column expander headerStyle={{ width: "3rem" }} />
        <Column header="" body={AccionesTemplate} headerStyle={{ width: "2rem" }} />
        <Column header="Fecha Emision Factura" field="f" />
        <Column header="Cliente" field="clientefullname" />
        <Column header="Aval" field="aval" />
        <Column header="Monto" field="total" body={MontoTemplate} />
        <Column header="Pagos" field="pagos" body={PagosTemplate} />
        <Column header="# Factura" field="numeroFactura" />
        <Column header="# Credito" field="numeroCredito" />
        <Column header="Estado" field="estado" body={EstadoTemplate} />
      </DataTable>
    </div>
  );
}
