"use client";
import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useGuardarPagoPedidoMutation, useGuardarPedidoMutation } from "@/hooks/pedidos";
import { PagoPedidoSave } from "@/types";
import { Toast } from "primereact/toast";
import { toastError, toastSuccess } from "@/utils/formatToast";

function BoxForm({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      {children}
    </div>
  );
}

export function FormPagoPedido({ pedido }: { pedido: number }) {
  const {mutate: guardarPago, isPending, isSuccess, isError, error, data} = useGuardarPagoPedidoMutation()
  const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm<PagoPedidoSave>({
    defaultValues: {
      pedido: Number(pedido),
      fecha: new Date(),
    },
  });
  const toast = useRef<Toast>(null);

  function onSubmit(data: PagoPedidoSave) {
    guardarPago(data);
  }

  useEffect(() => {
    if (isSuccess) {
     reset() 
      toast.current?.show(toastSuccess(data))
    }
    if (isError) {
      toast.current?.show(toastError(error))
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <div>
        <Toast ref={toast} />
        <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
          <div className={"grid grid-cols-1 md:grid-cols-2 gap-1"}>
            <Controller
              name={"fecha"}
              control={control}
              rules={{
                required: "campo requerido",
              }}
              render={({ field }) => (
                <BoxForm>
                  <label>Fecha</label>
                  <Calendar value={field.value as Date} onChange={(e) => field.onChange(e.value)} showIcon locale={"es"} />
                  {errors.fecha && <span className={'text-red-500'}>{errors.fecha.message}</span>}
                </BoxForm>
              )}
            />

            <Controller
              name={'monto'}
              control={control}
              rules={{
                required: "campo requerido",
              }}
              render={({ field }) => (
                <BoxForm>
                  <label>Monto</label>
                  <InputNumber value={field.value} onChange={(e) => field.onChange(e.value)} locale={"es-HN"} mode={"currency"} currency={"HNL"} minFractionDigits={2}
                               maxFractionDigits={2} />
                  {errors.monto && <span className={'text-red-500'}>{errors.monto.message}</span>}
                </BoxForm>
              )}
            />
          </div>
          <div className={"flex justify-end gap-1"}>
            <Button label={"limpiar"} icon={"pi pi-eraser"} size={"small"} severity={"info"} onClick={() => reset()} />
            <Button label={"Guardar"} icon={"pi pi-check"} size={"small"} type={"submit"} />
          </div>
        </form>
      </div>
    </div>
  );
}