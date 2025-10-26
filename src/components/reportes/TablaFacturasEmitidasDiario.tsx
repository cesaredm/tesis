"use client";
import { Calendar } from "primereact/calendar";
import { DataTable, DataTableExpandedRows, DataTableValueArray } from "primereact/datatable";
import { BoxForm } from "../shared/BoxForm";
import { useRef, useState } from "react";
import { Nullable } from "primereact/ts-helpers";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { getFacturas } from "@/servicios/facturas.services";
import { Factura } from "@/domain/entities/Facturas";
import { Toast } from "primereact/toast";
import { toastError } from "@/utils/formatToast";
import { formatDecimal } from "@/utils/helpers";

export function FacturasEmitidasDiario() {
  const [fecha, setFecha] = useState<Nullable<Date>>(new Date());
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);
  const toast = useRef<Toast>(null);

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

  function ExpandedRowsTemplate(data: Factura) {
    return (
      <DataTable value={data.detalles} className="m-0" dataKey="id" showGridlines header={"Detalles de la factura #" + data.id} size="small">
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

  return (
    <div>
      <DataTable value={facturas} header={Header} dataKey={"id"} loading={loading} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={ExpandedRowsTemplate} size="small" showGridlines stripedRows rowHover rows={7} rowsPerPageOptions={[7,20,50,100,500]} paginator>
        <Column expander headerStyle={{ width: "3rem" }} />
        <Column field={"id"} header={"# Factura"} />
        <Column field={"f"} header={"Fecha"} />
        <Column field={"total"} body={TotalTemplate} header={"total"} />
        <Column field={"clientefullname"} header={"Cliente"} />
        <Column field={"avalfullname"} header={"Aval"} />
        <Column field={"empleadofullname"} header={"Colaborador"} />
      </DataTable>
    </div>
  );
}
