"use client";
import { useGetProductosQuery } from "@/hooks/productos";
import { useFacturaStore } from "@/store/factura.store";
import { DetalleSave, Factura, Producto } from "@/types";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { ButtonGroup } from "primereact/buttongroup";
import { Button } from "primereact/button";
import { SidebarInventario } from "./SidebarInventario";
import { Totales } from "./Totales";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { formatDecimal } from "@/utils/helpers";

export function TablaFactura() {
  const { detalles, setReloadView, reloadView } = useFacturaStore((state) => state);
  const { data: inventario } = useGetProductosQuery();
  const [seleccion, setSeleccion] = useState<DetalleSave[]>([]);
  const toast = useRef<Toast>(null);

  function agregarProducto(producto: Producto, cantidad: number) {
    /*const filter = inventario?.find((item) => item.id === producto.id);
    if (!filter) return;*/

    const detalleExistente = detalles.get(producto.id);
    if (detalleExistente) {
      if(detalleExistente.stock < (cantidad + detalleExistente.cantidad)){
        toast.current?.show({ severity: "error", summary: "Error", detail: "Producto no cuenta con suficiente stock para la venta.", life: 3000 });
        return;
      }
      const cantidadTotal = detalleExistente.cantidad + cantidad;
      detalleExistente.cantidad = cantidadTotal;
      detalleExistente.importe = cantidadTotal * detalleExistente.precio;
      detalles.set(producto.id, detalleExistente);
      setReloadView(reloadView + 1);
    } else {
      const detalle: DetalleSave = {
        ...producto,
        precio: producto.precioVenta,
        cantidad: cantidad,
        importe: cantidad * producto.precioVenta,
        precioOriginal: producto.precioVenta,
      };

      detalles.set(producto.id, detalle);
      setReloadView(reloadView + 1);
    }
  }

  function onSubmitCodigoBarra(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const codigoBarra = formData.get("codigoBarra")?.toString();
    const filter = inventario?.find((item) => item.codigoBarra === codigoBarra);
    if (!filter) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Producto no encontrado", life: 3000 });
      return;
    }

    if (filter.stock < 1) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Producto sin stock", life: 3000 });
      return;
    }
    agregarProducto(filter, 1);
    form.reset();
  }

  function eliminarArticulos() {
    seleccion.forEach((item) => {
      detalles.delete(item.id);
    });
    setReloadView(reloadView + 1);
    setSeleccion([]);
  }

  function DescripcionTable(row: DetalleSave) {
    const importe = row.cantidad * row.precio;
    const descuento = row.precioOriginal - row.precio;
    return (
      <div>
        <div className="flex justify-between">
          <span className="text-xl font-semibold">
            {row.descripcion} {row.marca}
          </span>
          <span className="text-xl">
            {row.cantidad} x {formatDecimal(row.precio)} = {formatDecimal(importe)}
          </span>
        </div>
        {descuento > 0 && (
          <div className="text-green-400">
            <span>Descuento: {descuento} c/u</span>
          </div>
        )}
      </div>
    );
  }

  const Header = (
    <div className="flex items-center gap-1">
      <form action="" onSubmit={onSubmitCodigoBarra}>
        <IconField>
          <InputIcon className="pi pi-barcode" />
          <InputText name="codigoBarra" required />
        </IconField>
      </form>

      <ButtonGroup>
        <Button label="Eliminar art." size="small" severity="warning" icon="pi pi-eraser" onClick={eliminarArticulos} />
        <SidebarInventario />
        <Button label="Cobrar" size="small" icon="pi pi-money-bill" disabled={detalles.size == 0} />
        <Button label="Imprimir" size="small" icon="pi pi-print" disabled={detalles.size == 0} />
      </ButtonGroup>
    </div>
  );

  const FooterTable = (
    <div>
      <Totales />
    </div>
  );

  return (
    <div>
      <Toast ref={toast} />
      <DataTable value={Array.from(detalles.values())} selectionMode={"multiple"} header={Header} footer={FooterTable} selection={seleccion} onSelectionChange={({ value }) => setSeleccion(value)} emptyMessage="Factura vacia.">
        <Column body={DescripcionTable} header={"Descripción"} />
      </DataTable>
    </div>
  );
}
