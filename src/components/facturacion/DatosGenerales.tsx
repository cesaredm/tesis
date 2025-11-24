import { InputText } from "primereact/inputtext";
import { BoxForm } from "../shared/BoxForm";
import { useFacturaStore } from "@/store/factura.store";
import { Dropdown } from "primereact/dropdown";
import { useGetAvalesQuery, useGetClientesQuery } from "@/hooks/clientes";
import { Button } from "primereact/button";
import { useEffect } from "react";

export function DatosGenerales() {
  const { factura, setCampoFactura, setAval, setCliente } = useFacturaStore((state) => state);
  const { data: clientes, isLoading: isLoadingClientes } = useGetClientesQuery();
  const { data: avales, isLoading: isLoadingAvales } = useGetAvalesQuery();

  function onChangeComprador(e: React.ChangeEvent<HTMLInputElement>) {
    setCampoFactura("comprador", e.target.value);
  }

  useEffect(() => {}, [factura.comprador]);

  return (
    <div>
      <section className="flex flex-wrap gap-2">
        <div className="flex flex-col gap-1 w-full lg:w-1/4">
          <label htmlFor="">Cliente</label>
          <Dropdown
            onChange={(e) => {
              setCampoFactura("cliente", e.value);
              const cliente = clientes?.find((c) => c.idCliente === e.value);
              setCliente(cliente?.nombreCompleto || "");
            }}
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
            onChange={(e) => {
              setCampoFactura("aval", e.value);
              const aval = avales?.find((a) => a.id === e.value);
              setAval(aval?.nombreCompleto || "");
            }}
            options={avales?.filter((a) => a.cliente != factura.cliente)}
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
      <div className="flex">
        <BoxForm>
          <label htmlFor="">Comprador</label>
          <InputText value={factura.comprador} onChange={onChangeComprador} />
        </BoxForm>
      </div>
    </div>
  );
}
