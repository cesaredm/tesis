"use client";
import { useGetProductosQuery } from "@/hooks/productos";
import { useFacturaStore } from "@/store/factura.store";
import { Producto } from "@/domain/entities/Productos";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { facturasServices } from "@/servicios/facturas.services";

export function Inventario() {
  const { data: inventario, isLoading } = useGetProductosQuery();
  const { detalles, setReloadView, reloadView } = useFacturaStore((state) => state);
  const [producto, setProducto] = useState<Producto | null>(null);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const op = useRef<OverlayPanel>(null);
  const toast = useRef<Toast>(null);

  function agregarProducto(producto: Producto, cantidad: number) {
    const filter = inventario?.find((item) => item.id === producto.id);
    if (!filter) return;
    const respuesta = facturasServices.agregarDetale(producto, cantidad, detalles);
    if (respuesta.severity === "error") {
      toast.current?.show(respuesta);
      return;
    }
    setReloadView(reloadView + 1);
  }

  function onGlobalFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFilters((filters) => {
      return { ...filters, global: { ...filters.global, value } };
    });
  }

  function onSubmitAgregarProducto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const cantidad = Number(data.get("cantidad"));
    if (!cantidad || !producto) return;
    agregarProducto(producto, cantidad);
    setProducto(null);
    op.current?.hide();
    setReloadView(reloadView + 1);
  }

  const Header = (
    <div className="flex">
      <IconField>
        <InputIcon className="pi pi-search" />
        <InputText placeholder="Buscar..." onChange={onGlobalFilterChange} />
      </IconField>
    </div>
  );

  function AccionesTable(row: Producto) {
    return (
      <div>
        <Button
          icon="pi pi-plus"
          size="small"
          onClick={(e) => {
            op.current?.toggle(e);
            setProducto(row);
          }}
        />
      </div>
    );
  }

  function DescripcionTable(row: Producto) {
    return (
      <section>
        <header>
          <h3 className="text-primary text-xl font-semibold">{row.descripcion}</h3>
        </header>
        <section className="grid grid-cols-2">
          <p className="flex gap-1 items-center">
            <i className="pi pi-barcode" />
            {row.codigoBarra}
          </p>
          <p className="flex gap-1 items-center">
            <i className="pi pi-money-bill" />
            {row.precioVenta}
          </p>
          <p className="flex gap-1 items-center">
            <i className="pi pi-box" />
            {row.stock}
          </p>
          <p className="flex gap-1 items-center">
            <i className="pi pi-tag" />
            {row.marca}
          </p>
        </section>
      </section>
    );
  }

  return (
    <div>
      <Toast ref={toast} />
      <DataTable showGridlines value={inventario} filters={filters} header={Header} rows={20} scrollable scrollHeight="80vh" globalFilterFields={["codigoBarra", "descripcion"]} paginator rowsPerPageOptions={[20, 50, 100, 200]} size="small" loading={isLoading}>
        <Column body={AccionesTable} headerStyle={{ width: "3em" }} />
        <Column header="Descripcion" body={DescripcionTable} />
      </DataTable>
      <OverlayPanel ref={op}>
        <form action="" onSubmit={onSubmitAgregarProducto}>
          <div className="p-inputgroup">
            <InputText keyfilter={"int"} name="cantidad" autoFocus />
            <Button icon="pi pi-plus" />
          </div>
        </form>
      </OverlayPanel>
    </div>
  );
}
