"use client";
import { DataTable } from "primereact/datatable";
import { usePedidosStore } from "@/store/pedidos.store";
import { Column } from "primereact/column";
import { DetallesPedidoSave, PedidoSave } from "@/types";
import { Productos } from "./Productos";
import React, { useEffect, useRef, useState } from "react";
import { formatDecimal } from "@/utils/helpers";
import { useGetProveedoresQuery } from "@/hooks/proveedores";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputText } from "primereact/inputtext";
import { format } from "@formkit/tempo";
import { Toast } from "primereact/toast";
import { useGuardarPedidoMutation } from "@/hooks/pedidos";
import { toastError, toastSuccess } from "@/utils/formatToast";

export function Pedido() {
  const { pedido, detalles, setPedido, reload, setReload, clear } = usePedidosStore((state) => state);
  const { data: proveedores } = useGetProveedoresQuery();
  const { mutate: guardarPedido, isPending, isSuccess, isError, error, data } = useGuardarPedidoMutation();
  const [total, setTotal] = useState<number>(0);
  const [producto, setProducto] = useState<DetallesPedidoSave>();
  const [inputVisibleId, setInputVisibleId] = useState<number | null>(null);
  const op = useRef<OverlayPanel>(null);
  const toast = useRef<Toast>(null);

  function calcularTotal() {
    const d = Array.from(detalles.values());
    const total: number = d.reduce((acc, item) => (acc += Number(item.importe)), 0);
    setTotal(total);
  }

  function agregarMasProducto(e: React.MouseEvent<HTMLElement>, producto: DetallesPedidoSave) {
    op.current?.toggle(e);
    setProducto(producto);
  }

  function bajarCantidad(producto: DetallesPedidoSave) {
    const detalle = detalles.get(producto.producto);
    if (detalle) {
      detalle.cantidad -= 1;
      detalle.importe -= producto.precio;
      if (detalle.cantidad > 0) detalles.set(producto.producto, detalle);
      else detalles.delete(producto.producto);
      setReload(reload + 1);
    }
  }

  function AccionesTemplate(row: DetallesPedidoSave) {
    return (
      <div className="flex gap-1">
        <Button icon="pi pi-plus" onClick={(e) => agregarMasProducto(e, row)} />
        <Button icon="pi pi-minus" onClick={(e) => bajarCantidad(row)} />
      </div>
    );
  }

  function onSubmitPrecio(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newPrecio: number = Number(data.get("precio"));
    if (producto) {
      const detalle = detalles.get(producto?.producto);
      if (detalle) {
        detalle.precio = newPrecio;
        detalle.importe = Number(producto.cantidad) * newPrecio;
        detalles.set(producto.producto, detalle);
        setReload(reload + 1);
        setInputVisibleId(null);
      }
    }
  }

  function FormEditPrecio() {
    return (
      <form onSubmit={onSubmitPrecio} className="inline-block">
        <div className="p-inputgroup">
          <InputText required name="precio" autoFocus />
          <Button type="button" icon="pi pi-times" onClick={() => setInputVisibleId(null)} />
        </div>
      </form>
    );
  }

  function DescripcionTemplate(row: DetallesPedidoSave) {
    return (
      <div>
        <p>{row.descripcion} </p>
        <div>
          {row.cantidad} x {inputVisibleId === row.producto ? <FormEditPrecio /> : formatDecimal(row.precio)} = {formatDecimal(row.importe)}
          <span
            className="pi pi-pencil text-green-400 p-2 rounded-2xl m-2 hover:cursor-pointer"
            onClick={() => {
              setInputVisibleId(row.producto);
              setProducto(row);
            }}
          />
        </div>
      </div>
    );
  }

  function onSubmitCantidad(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const cantidad: number = Number(data.get("cantidad")) + Number(producto?.cantidad);
    const importe: number = cantidad * Number(producto?.precio);
    if (producto) {
      const detalle = detalles.get(producto.producto);
      if (detalle) {
        detalle.cantidad = cantidad;
        detalle.importe = importe;
        detalles.set(producto.producto, detalle);
        setReload(reload + 1);
        op.current?.hide();
      }
    }
  }

  function onChangePedido(e: DropdownChangeEvent) {
    // @ts-ignore
    setPedido({ ...pedido, [e.target.name]: e.value });
  }

  function guardar() {
    if (pedido?.proveedor && pedido?.estado && detalles.size > 0) {
      const pedidoParsed: PedidoSave = {
        ...pedido,
        fecha: format({ date: new Date(), format: "YYYY-MM-DD HH:mm:ss", tz: "America/Tegucigalpa" }),
      };
      guardarPedido({ pedido: pedidoParsed, detalles: Array.from(detalles.values()) });
      console.log("guaedarPedido");
      console.log(pedidoParsed);
      console.log(detalles);
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se puede guardar el pedido, por falta de datos.",
        life: 3000,
      });
    }
  }

  const HeaderTable = (
    <div className="flex flex-wrap gap-1 items-center">
      <Productos />
      <div>
        <Dropdown
          options={proveedores}
          name="proveedor"
          placeholder="Seleccione un proveedor"
          optionLabel="nombre"
          optionValue="id"
          filter
          emptyFilterMessage="No hay coincidencias"
          emptyMessage="No hay proveedores"
          className="w-full"
          onChange={onChangePedido}
          value={pedido?.proveedor}
        />
      </div>
      <div className="flex flex-col">
        <Dropdown options={["Pendiente", "Cancelado"]} defaultValue={"Cancelado"} name="estado" onChange={onChangePedido} value={pedido?.estado} className="w-full" />
      </div>
      <Button icon="pi pi-eraser" size="small" onClick={clear} />
      <Button icon={isPending ? "pi pi-spin pi-spinner" : "pi pi-check"} label="Guardar" size="small" onClick={guardar} disabled={isPending || detalles.size === 0} />
    </div>
  );

  const FooterTable = (
    <div className="flex flex-wrap gap-1 items-center justify-end">
      <div className="flex flex-col">
        <label>Total</label>
        <span className="text-2xl">L. {formatDecimal(total)}</span>
      </div>
    </div>
  );

  useEffect(() => {
    calcularTotal();
  }, [reload]);

  useEffect(() => {
    if (isSuccess) {
      toast.current?.show(toastSuccess(data));
      clear();
    }
    if (isError) {
      toast?.current?.show(toastError(error));
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <Toast ref={toast} />
      <OverlayPanel ref={op}>
        <form onSubmit={onSubmitCantidad}>
          <div className="p-inputgroup">
            <InputText keyfilter={"int"} name="cantidad" required autoFocus />
            <Button size="small" icon="pi pi-check" />
          </div>
        </form>
      </OverlayPanel>
      <DataTable value={Array.from(detalles.values())} className="datatable-responsive" header={HeaderTable} emptyMessage="Pedido vacia." size="small" footer={FooterTable} showGridlines>
        <Column body={AccionesTemplate} headerStyle={{ width: "3rem" }} />
        <Column body={DescripcionTemplate} header="Descripcion" />
      </DataTable>
    </div>
  );
}
