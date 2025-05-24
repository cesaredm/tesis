"use client";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { useGetProductosQuery } from "@/hooks/productos";
import { Spinner } from "@/components/Spinner";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useRef, useState } from "react";
import { DetalleSave, DetallesPedidoSave, Producto } from "@/types";
import { formatDecimal } from "@/utils/helpers";
import { FilterMatchMode } from "primereact/api";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { usePedidosStore } from "@/store/pedidos.store";

export function Productos() {
  const { data, isLoading } = useGetProductosQuery();
  const { clear, detalles, pedido, setPedido, setReload, reload } = usePedidosStore((state) => state);
  const [visible, setVisible] = useState(false);
  const [producto, setProducto] = useState<Producto>();
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const op = useRef<OverlayPanel>(null);

  function onChangeGlobalFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFilters((filters) => ({
      ...filters,
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    }));
  }

  const Header = () => {
    return (
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Inventario</h1>
        <IconField>
          <InputIcon className="pi pi-search" />
          <InputText placeholder="Buscar..." onChange={onChangeGlobalFilter} />
        </IconField>
      </div>
    );
  };

  function DescripcionTemplate(row: Producto) {
    return (
      <div>
        <header className="font-semibold text-xl">
          {row.descripcion} - {row.marca}
        </header>
        <section className="grid grid-cols-2 gap-1">
          <span className="flex gap-2 items-center">
            <i className="pi pi-money-bill" />
            {formatDecimal(row.precioCosto)}
          </span>
          <span className="flex gap-2 items-center">
            <i className="pi pi-box" />
            {formatDecimal(row.stock)}
          </span>
        </section>
      </div>
    );
  }

  function AccionesTemplate(row: Producto) {
    return (
      <div className="flex gap-2">
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

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let importe: number = 0;
    const formData = new FormData(e.currentTarget);
    const cantidad = Number(formData.get("cantidad"));
    if (cantidad > 0 && producto) {
      importe = producto.precioCosto * cantidad;
      if (detalles.has(producto.id)) {
        const detalle = detalles.get(producto.id);
        if (detalle) {
          detalle.cantidad += cantidad;
          detalle.importe += importe;
          detalles.set(producto.id, detalle);
        }

        setReload(reload+1);
        op.current?.hide();
        return;
      }

      detalles.set(producto.id, {
        producto: producto.id,
        precio: producto.precioCosto,
        descripcion: producto.descripcion,
        stock: producto.stock,
        marca: producto.marca,
        cantidad,
        importe,
      });

      setReload(reload + 1);
      op.current?.hide();
    }
  }

  return (
    <span>
      <Button onClick={() => setVisible(true)} size="small" icon="pi pi-box" />
      <Sidebar visible={visible} className="p-sidebar-md" onHide={() => setVisible(false)}>
        <DataTable
          value={data}
          emptyMessage={isLoading ? <Spinner /> : "No hay productos"}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          className="datatable-responsive"
          scrollable
          scrollHeight="400px"
          header={Header}
          filters={filters}
          globalFilterFields={["descripcion", "marca"]}
          size="small"
        >
          <Column body={AccionesTemplate} headerStyle={{ width: "3rem" }} />
          <Column field="descripcion" header="DESCRIPCION" body={DescripcionTemplate} />
        </DataTable>
        <OverlayPanel ref={op}>
          <form onSubmit={onSubmit}>
            <div className="p-inputgroup flex-1">
              <InputText keyfilter={"pnum"} name="cantidad" required autoFocus />
              <Button type="submit" icon="pi pi-check" />
            </div>
          </form>
        </OverlayPanel>
      </Sidebar>
    </span>
  );
}
