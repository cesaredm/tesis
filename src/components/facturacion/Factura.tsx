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
import { OverlayPanel } from "primereact/overlaypanel";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

export function TablaFactura() {
  const { detalles, setReloadView, reloadView } = useFacturaStore((state) => state);
  const { data: inventario } = useGetProductosQuery();
  const [seleccion, setSeleccion] = useState<DetalleSave[]>([]);
  const toast = useRef<Toast>(null);
  const opAdd = useRef<OverlayPanel>(null);
  const opDescuento = useRef<OverlayPanel>(null);
  const [detalle, setDetalle] = useState<DetalleSave>();

  function agregarProducto(producto: Producto, cantidad: number) {
    /*const filter = inventario?.find((item) => item.id === producto.id);
    if (!filter) return;*/

    const detalleExistente = detalles.get(producto.id);
    if (detalleExistente) {
      if (detalleExistente.stock < cantidad + detalleExistente.cantidad) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Producto no cuenta con suficiente stock para la venta.",
          life: 3000,
        });
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

  function agregarMasProductoDesdeFactura(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const cantidad: number = Number(formData.get("cantidad"));
    agregarProducto(detalle as Producto, cantidad);
    opAdd.current?.hide();
  }

  function eliminarArticulos() {
    seleccion.forEach((item) => {
      detalles.delete(item.id);
    });
    setReloadView(reloadView + 1);
    setSeleccion([]);
  }

  function aplicarDescuento(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const descuento = formData.get("descuento")?.toString().replace(/(,)/g, "");
    if (detalle) {
      const nuevoPrecio = Number(detalle.precio) - Number(descuento);
      console.log({ nuevoPrecio, precioCosto: detalle.precioCosto, precio: detalle.precio, descuento });
      const nuevoImporte = nuevoPrecio * Number(detalle.cantidad);
      if (Number(nuevoPrecio) >= Number(detalle.precioCosto)) {
        detalle.precio = nuevoPrecio;
        detalle.importe = nuevoImporte;
        detalles.set(detalle.id, detalle);
        setReloadView(reloadView + 1);
        opDescuento.current?.hide();
      } else {
        toast.current?.show({
          severity: "warn",
          summary: "Adevertencia.",
          detail: "El descuento excede el precio de costo del producto. > " + detalle.precioCosto,
          life: 3000,
        });
      }
    }
  }

  function disminuiCantidadEnFactura(row: DetalleSave) {
    if (row.cantidad > 1) {
      agregarProducto(row as Producto, -1);
      setReloadView(reloadView + 1);
      return;
    }
    detalles.delete(row.id);
    setReloadView(reloadView + 1);
  }

  function AccionesTemplate(row: DetalleSave) {
    return (
      <div className="p-buttonset">
        <ButtonGroup>
          <Button icon="pi pi-plus" size="small" onClick={(e) => {
            opAdd.current?.toggle(e);
            setDetalle(row);
          }} />
          <Button icon="pi pi-minus" size="small" onClick={() => disminuiCantidadEnFactura(row)} />
          <Button icon="pi pi-tag" size="small" onClick={(e) => {
            opDescuento.current?.toggle(e);
            setDetalle(row);
          }} />
        </ButtonGroup>
      </div>
    );
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
          <div className="text-green-400 tex">
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
      <OverlayPanel ref={opAdd}>
        <form action="" onSubmit={agregarMasProductoDesdeFactura}>
          <div>
            <label htmlFor="">Cantidad</label>
            <div className="p-inputgroup">
              <InputNumber mode="decimal" minFractionDigits={2} maxFractionDigits={2} locale="en-ni" name="cantidad"
                           autoFocus required />
              <Button icon="pi pi-check" />
            </div>
          </div>
        </form>
      </OverlayPanel>
      <OverlayPanel ref={opDescuento}>
        <form action="" onSubmit={aplicarDescuento}>
          <div>
            <label htmlFor="">Descuento</label>
            <div className="p-inputgroup">
              <InputNumber mode="decimal" minFractionDigits={2} maxFractionDigits={2} locale="en-ni" name="descuento"
                           autoFocus required />
              <Button icon="pi pi-check" />
            </div>
          </div>
        </form>
      </OverlayPanel>
      <DataTable value={Array.from(detalles.values())} selectionMode={"multiple"} header={Header} footer={FooterTable}
                 selection={seleccion} onSelectionChange={({ value }) => setSeleccion(value)}
                 emptyMessage="Factura vacia." showGridlines>
        <Column body={AccionesTemplate} headerStyle={{ width: "12rem" }} />
        <Column body={DescripcionTable} header={"Descripción"} />
      </DataTable>
    </div>
  );
}
