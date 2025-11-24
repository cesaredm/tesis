"use client";
import { useGuardarFactura } from "@/hooks/useFacturacion";
import { useFacturaStore } from "@/store/factura.store";
import { toastError, toastSuccess } from "@/utils/formatToast";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import TicketFactura from "../tickets/TicketFactura";

export function BotonesGuardar() {
  const { factura, detalles, limpiarTodo, setRespuestaFactura } = useFacturaStore((state) => state);
  const [print, setPrint] = useState(false);
  const toast = useRef<Toast>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  const { mutate: guardarFactura, isPending, isSuccess, isError, error, data } = useGuardarFactura();
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

  useEffect(() => {
    if (isSuccess) {
      toast.current?.show(toastSuccess(data));
      if (print) {
        setRespuestaFactura(data)
        // @ts-expect-error para impresion
        ticketRef.current?.print();
      }

      if (!print) limpiarTodo();
    }

    if (isError) {
      toast.current?.show(toastError(error));
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Toast ref={toast} />
      <TicketFactura ref={ticketRef} />
      <Button label="Cobrar" size="small" icon="pi pi-money-bill" disabled={detalles.size == 0} onClick={() => guardar(false)} loading={isPending} />
      <Button label="Imprimir" size="small" icon="pi pi-print" disabled={detalles.size == 0} onClick={() => guardar(true)} loading={isPending} />
    </>
  );
}
