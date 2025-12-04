"use client";
import { Calendar } from "primereact/calendar";
import { DataTable, DataTableExpandedRows, DataTableValueArray } from "primereact/datatable";
import { BoxForm } from "../shared/BoxForm";
import { useEffect, useRef, useState } from "react";
import { Nullable } from "primereact/ts-helpers";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { getFacturas } from "@/servicios/facturas.services";
import { Detalle, Factura } from "@/domain/entities/Facturas";
import { Toast } from "primereact/toast";
import { toastError, toastSuccess } from "@/utils/formatToast";
import { formatDecimal } from "@/utils/helpers";
import TicketFactura from "../tickets/TicketFactura";
import { useFacturaStore } from "@/store/factura.store";
import { useDevolverFactura } from "@/hooks/useFacturacion";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputNumber } from "primereact/inputnumber";
import { useSession } from "next-auth/react";
import { permisos } from "@/utils/permisos";

export function FacturasEmitidasDiario() {
  const { detalles, setAval, setCliente, setCampoFactura, setRespuestaFactura, setTotales } = useFacturaStore((state) => state);
  const { mutate: devolverFactura, isSuccess: isDevolucionSuccess, isError: isDevolucionError, error: errorDevolucion, data: dataDevolucion, isPending: isDevolucionPending } = useDevolverFactura();
  const {data} = useSession()
  const [cantidadDevolucion, setCantidadDevolucion] = useState<number | null>(null);
  const [productoDevolver, setProductoDevolver] = useState<Detalle | null>(null);
  const [fecha, setFecha] = useState<Nullable<Date>>(new Date());
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);
  const ticketRef = useRef<HTMLDivElement>(null);
  const toast = useRef<Toast>(null);
  const op = useRef<OverlayPanel>(null);

  async function getFacturasPorFecha() {
    if (!fecha) return;
    setLoading(true);
    const [data, error] = await getFacturas(fecha);

    if (error) toast.current?.show(toastError(error));

    if (data) {
      setFacturas(data);
    }

    setLoading(false);
  }

  function handleSubmitDevolucion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!cantidadDevolucion || cantidadDevolucion <= 0 || !productoDevolver) {
      toast.current?.show(toastError("Ingrese una cantidad válida"));
      return;
    }

    devolverFactura({
      id: productoDevolver.id,
      cantidad: cantidadDevolucion,
    });
  }

  function calcularTotales(detalles: Detalle[]) {
    return detalles.reduce(
      (totales, item) => {
        totales.total += Number(item.importe);
        totales.descuento += Number(item.precioVenta) - Number(item.precio);
        totales.subtotal += Number(item.precioVenta);
        return { ...totales };
      },
      { subtotal: 0, descuento: 0, total: 0 }
    );
  }

  function reImprimir(factura: Factura) {
    setCliente(factura.clientefullname || "");
    setAval(factura.avalfullname || "");
    setCampoFactura("comprador", factura.comprador);
    setCampoFactura("cliente", factura.clienteid);
    setCampoFactura("aval", factura.avalid);
    const totales = calcularTotales(factura.detalles);
    console.log(totales);
    setTotales(totales);
    setRespuestaFactura({
      numeroCorrelativo: Number(factura.id),
      empleado: Number(factura.empleadoid),
      fecha: factura.fecha,
    });

    factura.detalles.map((d: Detalle) => {
      detalles.set(d.producto, {
        cantidad: d.cantidad,
        // @ts-expect-error hola
        codigoBarra: d.codigoBarra,
        descripcion: d.descripcion,
        id: d.producto,
        idmarca: 1,
        importe: d.importe,
        marca: "",
        modelo: "",
        precio: d.precio,
        precioOriginal: d.precioVenta,
        precioCosto: 0,
        precioVenta: d.precioVenta,
        producto: d.producto,
        stock: 0,
      });
    });

    // @ts-expect-error para imprimir
    ticketRef.current?.print();
  }

  const Header = (
    <section className="flex flex-wrap gap-2">
      <BoxForm>
        <label htmlFor="">fecha de filtro</label>
        <section className="flex items-center gap-2">
          <Calendar onChange={(e) => setFecha(e.value)} value={fecha} showIcon dateFormat="dd/mm/yy" />
          <Button label="Buscar" icon="pi pi-search" loading={loading} onClick={getFacturasPorFecha} />
        </section>
      </BoxForm>
    </section>
  );

  function TotalTemplate(row: Factura) {
    return (
      <div className="flex justify-between text-end">
        <span>L.</span>
        <span>{formatDecimal(row.total)}</span>
      </div>
    );
  }
  function AccionesTemplate(row: Factura) {
    return <Button icon="pi pi-print" size="small" text onClick={() => reImprimir(row)} />;
  }
  function AccionesDetalleTemplate(row: Detalle) {
    return (
      <Button
        icon="pi pi-minus"
        size="small"
        tooltip="Devolver"
        onClick={(e) => {
          setProductoDevolver(row);
          op.current?.toggle(e);
        }}
        disabled={data?.user.permiso !== permisos.ADMIN}
      />
    );
  }

  function ExpandedRowsTemplate(data: Factura) {
    return (
      <DataTable value={data.detalles} className="m-0" dataKey="id" showGridlines header={"Detalles de la factura #" + data.id} size="small">
        <Column body={AccionesDetalleTemplate} headerStyle={{ width: "3rem" }} />
        <Column field="id" header="# ID" />
        <Column field="descripcion" header="Descripcion" />
        <Column field="cantidad" header="Cantidad" />
        <Column field="precio" header="Precio" />
        <Column field="importe" header="Importe" />
        <Column field="marca" header="Marca" />
        <Column field="modelo" header="Modelo" />
      </DataTable>
    );
  }

  useEffect(() => {
    if (isDevolucionSuccess) {
      toast.current?.show(toastSuccess(dataDevolucion));
      getFacturasPorFecha();
      op.current?.hide();
      setCantidadDevolucion(null)
    }

    if (isDevolucionError) {
      toast.current?.show(toastError(errorDevolucion));
    }
  }, [isDevolucionSuccess, isDevolucionError]);

  return (
    <div>
      <TicketFactura ref={ticketRef} />
      <Toast ref={toast} />
      <OverlayPanel ref={op}>
        <form onSubmit={handleSubmitDevolucion}>
          <BoxForm>
            <label htmlFor="">Cantidad</label>
            <InputNumber mode="decimal" locale="es-HN" value={cantidadDevolucion} onChange={(e) => setCantidadDevolucion(e.value)} minFractionDigits={2} maxFractionDigits={2} autoFocus onFocus={(e) => e.target.select()} required />
          </BoxForm>
          <footer className="flex justify-end mt-2">
            <Button label="Devolver" type="submit" size="small" loading={isDevolucionPending} />
          </footer>
        </form>
      </OverlayPanel>
      <DataTable
        value={facturas}
        header={Header}
        dataKey={"id"}
        loading={loading}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={ExpandedRowsTemplate}
        size="small"
        showGridlines
        stripedRows
        rowHover
        rows={7}
        rowsPerPageOptions={[7, 20, 50, 100, 500]}
        paginator
        scrollable
        scrollHeight="60vh"
      >
        <Column expander headerStyle={{ width: "3rem" }} />
        <Column body={AccionesTemplate} headerStyle={{ width: "3rem" }} />
        <Column field={"id"} header={"# Factura"} />
        <Column field={"f"} header={"Fecha"} />
        <Column field={"total"} body={TotalTemplate} header={"total"} />
        <Column field={"clientefullname"} header={"Cliente"} />
        <Column field={"avalfullname"} header={"Aval"} />
        <Column field={"comprador"} header={"Comprador"} />
        <Column field={"empleadofullname"} header={"Colaborador"} />
      </DataTable>
    </div>
  );
}
