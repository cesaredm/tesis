"use client";
import {
  DataTable,
  DataTableExpandedRows,
  DataTableFilterMeta,
  DataTableFilterMetaData,
  DataTableValueArray,
} from "primereact/datatable";
import { useGetPedidosQuery } from "@/hooks/pedidos";
import { Column } from "primereact/column";
import { useState } from "react";
import { DetallesPedido, Pedido } from "@/types";
import { formatDecimal } from "@/utils/helpers";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Spinner } from "@/components/Spinner";
import Link from "next/link";

export function TablaPedidos() {
  const { data: pedidos, isLoading } = useGetPedidosQuery();
  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  function ExpandeRow(data: Pedido) {
    return (
      <div>
        <DataTable value={data.detalles} header={`Pedido # ${data.id}`}>
          <Column header={"Cant"} field={"cantidad"} />
          <Column header={"Descripcion"} field={"descripcion"} />
          <Column header={"Precio"} field={"precio"} body={(row: DetallesPedido) => formatDecimal(row.precio)} />
          <Column header={"Importe"} field={"importe"} body={(row: DetallesPedido) => formatDecimal(row.importe)} />
        </DataTable>
      </div>
    );
  }

  const allowExpansion = (row: Pedido) => {
    return row?.detalles!.length > 0;
  };

  function AccionesTemplate(row: Pedido) {
    return (
      <div>
        <Link href={"/work/inventario/pedidos/pagoPedido?pedido=" + row.id}>
          <Button icon={"pi pi-money-bill"} size={"small"} severity={"success"} text />
        </Link>
      </div>
    );
  }

  function onChangeGlobalFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      global: { ...prev.global, value },
    }));
  }

  const HeaderTable = (
    <div className={"flex justify-end"}>
      <IconField>
        <InputIcon className={"pi pi-search"} />
        <InputText placeholder={"Buscar..."} onChange={onChangeGlobalFilter} />
      </IconField>
    </div>
  );

  return (
    <div>
      <DataTable
        value={pedidos}
        dataKey={"id"}
        size={"small"}
        showGridlines
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={ExpandeRow}
        filters={filters}
        globalFilterFields={["nombreProveedor", "id"]}
        header={HeaderTable}
        emptyMessage={isLoading ? <Spinner /> : "No hay pedidos"}
      >
        <Column expander={true} headerStyle={{ width: "3rem" }} />
        <Column body={AccionesTemplate} headerStyle={{ width: "3rem" }} />
        <Column header={"# Pedido"} field={"id"} sortable />
        <Column header={"Fecha"} field={"fecha"} sortable />
        <Column header={"Proveedor"} field={"nombreProveedor"} sortable />
        <Column header={"estado"} field={"estado"} sortable />
        <Column header={"Total"} field={"total"} body={(row: Pedido) => formatDecimal(row.total)} />
      </DataTable>
    </div>
  );
}