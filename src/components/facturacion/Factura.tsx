"use client";
import { useGetProductosQuery } from "@/hooks/productos";
import { useFacturaStore } from "@/store/factura.store";
import { DetalleSave, Factura } from "@/domain/entities/Facturas";
import { Producto } from "@/domain/entities/Productos";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { ButtonGroup } from "primereact/buttongroup";
import { Button } from "primereact/button";
import { SidebarInventario } from "./SidebarInventario";
import { Totales } from "./Totales";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { formatDecimal } from "@/utils/helpers";
import { OverlayPanel } from "primereact/overlaypanel";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { useGetAvalesQuery, useGetClientesQuery } from "@/hooks/clientes";
import { facturasServices } from "@/servicios/facturas.services";
import { useGuardarFactura } from "@/hooks/useFacturacion";
import { toastError, toastSuccess } from "@/utils/formatToast";
import { Panel } from "primereact/panel";
import { Card } from "primereact/card";

export function TablaFactura() {
  const { detalles, setReloadView, reloadView, factura, setCampoFactura, limpiarTodo } = useFacturaStore((state) => state);
  const { data: inventario } = useGetProductosQuery();
  const { data: clientes, isLoading: isLoadingClientes } = useGetClientesQuery();
  const { data: avales, isLoading: isLoadingAvales } = useGetAvalesQuery();
  const [seleccion, setSeleccion] = useState<DetalleSave[]>([]);
  const [print, setPrint] = useState(false);
  const toast = useRef<Toast>(null);
  const opAdd = useRef<OverlayPanel>(null);
  const opDescuento = useRef<OverlayPanel>(null);
  const [detalle, setDetalle] = useState<DetalleSave>();
  const { mutate: guardarFactura, isPending, isSuccess, isError, error, data } = useGuardarFactura();

  function agregarProducto(producto: Producto, cantidad: number) {
    const respuesta = facturasServices.agregarDetale(producto, cantidad, detalles);
    if (respuesta.severity === "error") {
      toast.current?.show(respuesta);
      return;
    }
    setReloadView(reloadView + 1);
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

  function guardar(print: boolean) {
    if (!isPending) {
      console.log({ factura, detalles: Array.from(detalles.values()) });
      guardarFactura({
        factura,
        detalles: Array.from(detalles.values()),
      });
      setPrint(print);
    }
  }

  function AccionesTemplate(row: DetalleSave) {
    return (
      <div className="p-buttonset">
        <ButtonGroup>
          <Button
            icon="pi pi-plus"
            size="small"
            onClick={(e) => {
              opAdd.current?.toggle(e);
              setDetalle(row);
            }}
          />
          <Button icon="pi pi-minus" size="small" onClick={() => disminuiCantidadEnFactura(row)} />
          <Button
            icon="pi pi-tag"
            size="small"
            onClick={(e) => {
              opDescuento.current?.toggle(e);
              setDetalle(row);
            }}
          />
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
    <div className="flex flex-col gap-2">
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
          <Button label="Cobrar" size="small" icon="pi pi-money-bill" disabled={detalles.size == 0} onClick={() => guardar(false)} loading={isPending} />
          <Button label="Imprimir" size="small" icon="pi pi-print" disabled={detalles.size == 0} onClick={() => guardar(true)} loading={isPending} />
        </ButtonGroup>
      </div>
    </div>
  );

  function DatosCredito() {
    return (
      <section className="flex flex-wrap gap-2">
        <div className="flex flex-col gap-1 w-full lg:w-1/4">
          <label htmlFor="">Cliente</label>
          <Dropdown
            onChange={(e) => setCampoFactura("cliente", e.value)}
            options={clientes}
            value={factura.cliente}
            optionLabel="nombreCompleto"
            optionValue="idCliente"
            placeholder="Selecciona un cliente"
            filter
            emptyMessage={isLoadingClientes ? "Cargando..." : "No se encontraron clientes."}
          />
        </div>
        <div className="flex flex-col gap-1 w-full lg:w-1/4">
          <label htmlFor="">Aval</label>
          <Dropdown
            onChange={(e) => setCampoFactura("aval", e.value)}
            options={avales}
            value={factura.aval}
            optionLabel="nombreCompleto"
            optionValue="id"
            placeholder="Selecciona un cliente"
            filter
            emptyMessage={isLoadingAvales ? "Cargando..." : "No se encontraron avales."}
          />
        </div>
        <div className="flex items-end">
          <Button
            icon="pi pi-times"
            label="Quitar"
            onClick={() => {
              setCampoFactura("cliente", null);
              setCampoFactura("aval", null);
            }}
            disabled={!factura.cliente || !factura.aval}
          />
        </div>
      </section>
    );
  }

  const FooterTable = (
    <div>
      <Totales />
    </div>
  );

  useEffect(() => {
    if (isSuccess) {
      toast.current?.show(toastSuccess(data));
      limpiarTodo();
      if (print) {
        setTimeout(() => {
          window.print();
        }, 1000);
      }
    }

    if (isError) {
      toast.current?.show(toastError(error));
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <Toast ref={toast} />
      <OverlayPanel ref={opAdd}>
        <form action="" onSubmit={agregarMasProductoDesdeFactura}>
          <div>
            <label htmlFor="">Cantidad</label>
            <div className="p-inputgroup">
              <InputNumber mode="decimal" minFractionDigits={2} maxFractionDigits={2} locale="en-ni" name="cantidad" autoFocus required />
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
              <InputNumber mode="decimal" minFractionDigits={2} maxFractionDigits={2} locale="en-ni" name="descuento" autoFocus required />
              <Button icon="pi pi-check" />
            </div>
          </div>
        </form>
      </OverlayPanel>
      <Card>
        <Panel header="Datos de crédito" className="mb-2">
          <DatosCredito />
        </Panel>
        <DataTable value={Array.from(detalles.values())} selectionMode={"multiple"} header={Header} footer={FooterTable} selection={seleccion} onSelectionChange={({ value }) => setSeleccion(value)} emptyMessage="Factura vacia." showGridlines>
          <Column body={AccionesTemplate} headerStyle={{ width: "12rem" }} />
          <Column body={DescripcionTable} header={"Descripción"} />
        </DataTable>
      </Card>
    </div>
  );
}
