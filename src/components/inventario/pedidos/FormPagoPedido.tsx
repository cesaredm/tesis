"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

interface PagoPedido {
  pedido: number;
  monto: number;
  fecha: Date;
}

function BoxForm({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      {children}
    </div>
  );
}

export function FormPagoPedido({ pedido }: { pedido: number }) {
  const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm<PagoPedido>({
    defaultValues: {
      pedido: Number(pedido),
      fecha: new Date(),
    },
  });

  function onSubmit(data: PagoPedido) {
    console.log(data)
  }

  return (
    <div>
      <div>
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
                  <Calendar value={field.value} onChange={(e) => field.onChange(e.value)} showIcon locale={"es"} />
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