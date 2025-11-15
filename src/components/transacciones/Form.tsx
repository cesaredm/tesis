"use client";

import { TransaccionSave } from "@/domain/entities/Transacciones";
import { useSaveTransaccionMutation } from "@/hooks/useTransacciones";
import { useForm, Controller } from "react-hook-form";
import { BoxForm } from "../shared/BoxForm";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { toastError, toastSuccess } from "@/utils/formatToast";

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TransaccionSave>();
  const { mutate: saveTransaccion, isPending, isSuccess, isError, error, data } = useSaveTransaccionMutation();
  const toast = useRef<Toast>(null);

  function onSubmit(data: TransaccionSave) {
    saveTransaccion(data);
  }

  useEffect(() => {
    if (isSuccess) {
      reset();
      toast.current?.show(toastSuccess(data));
    }
    if (isError) {
      toast.current?.show(toastError(error));
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <Controller
            name="fecha"
            control={control}
            rules={{ required: "campo requerida" }}
            defaultValue={new Date()}
            render={({ field }) => (
              <BoxForm>
                <label htmlFor="">Fecha</label>
                <Calendar showIcon value={field.value as Date} onChange={(e) => field.onChange(e.target.value)} />
                {errors.fecha && <span className="text-red-500">{errors.fecha.message}</span>}
              </BoxForm>
            )}
          />
          <Controller
            name="tipo"
            control={control}
            rules={{ required: "campo requerida" }}
            defaultValue="salida"
            render={({ field }) => (
              <BoxForm>
                <label htmlFor="">Tipo</label>
                <Dropdown value={field.value} options={["salida", "entrada"]} onChange={(e) => field.onChange(e.value)} />
                {errors.tipo && <span className="text-red-500">{errors.tipo.message}</span>}
              </BoxForm>
            )}
          />
          <Controller
            name="monto"
            control={control}
            rules={{ required: "campo requerida" }}
            render={({ field }) => (
              <BoxForm>
                <label htmlFor="">Monto</label>
                <InputNumber locale="es-HN" value={field.value} onChange={(e) => field.onChange(e.value)} mode="currency" currency="HNL" />
                {errors.monto && <span className="text-red-500">{errors.monto.message}</span>}
              </BoxForm>
            )}
          />
          <BoxForm>
            <label htmlFor="">Nota</label>
            <InputTextarea {...register("anotacion", { required: "campo requerida" })} rows={1} autoResize />
            {errors.anotacion && <span className="text-red-500">{errors.anotacion.message}</span>}
          </BoxForm>
        </section>
        <footer className="mt-2 flex justify-end">
          <Button type="button" loading={isPending} size="small" label="Cancelar" icon="pi pi-times" text />
          <Button type="submit" loading={isPending} size="small" label="Guardar" icon="pi pi-check" />
        </footer>
      </form>
    </>
  );
}
