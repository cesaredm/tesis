"use client";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { BoxForm } from "../shared/BoxForm";
import { useRef, useState } from "react";
import { Nullable } from "primereact/ts-helpers";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { facturasServices } from "@/servicios/facturas.services";
import { Factura } from "@/domain/entities/Facturas";
import { Toast } from "primereact/toast";
import { toastError } from "@/utils/formatToast";
import { format } from "@formkit/tempo";

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
          <Button label="Buscar" icon="pi pi-search" loading={loading} onClick={getFacturas} />
        </section>
      </BoxForm>
    </section>
  );

  async function getFacturas() {
    try {
      setLoading(true);
      const f = format({ date: fecha, format: "yyyy-MM-dd", tz: "America/Tegucigalpa" });
      console.log(f);
      const facturas = await facturasServices.getFacturas(f);
      setFacturas(facturas);
      console.log(facturas);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.current?.show(toastError(error));
    }
  }

  return (
    <div>
      <DataTable value={facturas} header={Header}>
        <Column field={"id"} header={"No. Factura"} />
        <Column field={"f"} header={"Fecha"} />
      </DataTable>
    </div>
  );
}
