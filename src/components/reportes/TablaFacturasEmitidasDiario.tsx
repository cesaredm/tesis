"use client";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { BoxForm } from "../shared/BoxForm";
import { useRef, useState } from "react";
import { Nullable } from "primereact/ts-helpers";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { getFacturas } from "@/servicios/facturas.services";
import { Factura } from "@/domain/entities/Facturas";
import { Toast } from "primereact/toast";
import { toastError } from "@/utils/formatToast";

export function FacturasEmitidasDiario() {
  const [fecha, setFecha] = useState<Nullable<Date>>(new Date());
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);

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

  return (
    <div>
      <DataTable value={facturas} header={Header}>
        <Column field={"id"} header={"# Factura"} />
        <Column field={"f"} header={"Fecha"} />
        <Column field={"total"} header={"total"} />
        <Column field={"Cliente"} header={"Cliente"} />
        <Column field={"Colaborador"} header={"Colaborador"} />
        <Column field={"Aval"} header={"Aval"} />
      </DataTable>
    </div>
  );
}
