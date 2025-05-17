"use client";

import { DataTable } from "primereact/datatable";
import { usePedidosStore } from "@/store/pedidos.store";
import { Column } from "primereact/column";
import { DetallesPedidoSave } from "@/types";
import { Productos } from "./Productos";
import { useEffect, useState } from "react";
import { formatDecimal } from "@/utils/helpers";
import { useGetProveedoresQuery } from "@/hooks/proveedores";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

export function Pedido() {
  const { pedido, detalles, setPedido, reload, setReload, clear } = usePedidosStore((state) => state);
  const { data: proveedores } = useGetProveedoresQuery();
  const [total, setTotal] = useState<number>(0);

  function calcularTotal() {
    const d = Array.from(detalles.values());
    const total:number = d.reduce((acc, item) => acc += Number(item.importe), 0);
    setTotal(total);
  }

  function DescripcionTemplate(row: DetallesPedidoSave) {
    return (
      <div>
        <p>{row.descripcion} </p>
        <p>
          {row.cantidad} x {formatDecimal(row.precio)} = {formatDecimal(row.importe)}
        </p>
      </div>
    );
  }

  const HeaderTable = (
    <div className="flex flex-wrap gap-1 items-center">
      <Productos />
      <div>
        <Dropdown options={proveedores} placeholder="Seleccione un proveedor" optionLabel="nombre" optionValue="id" filter emptyFilterMessage="No hay coincidencias" emptyMessage="No hay proveedores" className="w-full" />
      </div>
      <div className="flex flex-col">
        <Dropdown options={["Pendiente", "Cancelado"]} defaultValue={"Cancelado"} className="w-full" />
      </div>
      <Button icon="pi pi-eraser" size="small" onClick={clear} />
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

  return (
    <div>
      <DataTable value={Array.from(detalles.values())} className="datatable-responsive" header={HeaderTable} emptyMessage="Factura vacia." size="small" footer={FooterTable}>
        <Column body={DescripcionTemplate} header="Descripcion" />
      </DataTable>
    </div>
  );
}
