"use client";
import { useCrearMovimientoKardexMutation } from "@/hooks/kardex";
import { KardexSave } from "@/types/kardex";
import { toastError, toastSuccess } from "@/utils/formatToast";
import { useSearchParams } from "next/navigation";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Fragment, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

function BoxForm({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>;
}

export function FormKardex() {
  const { mutate: crear, isPending, isError, isSuccess, error, data } = useCrearMovimientoKardexMutation();
  const params = useSearchParams();
  console.log("Parametros de la URL:", params.get("p"));
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<KardexSave>();
  const toast = useRef<Toast>(null);

  function onSubmit(data: KardexSave) {
    const productoId = params.get("p");
    if (productoId)
      crear({
        ...data,
        producto: parseInt(productoId), // Asegurarse de que el ID del producto sea un número
      });
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
    <Fragment>
      <Toast ref={toast} />
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <section className="grid grid-cols-1 gap-1">
          <Controller
            name="tipoMovimiento"
            control={control}
            rules={{ required: "este campo es requerido" }}
            render={({ field }) => (
              <BoxForm>
                <label htmlFor="">Movimiento</label>
                <Dropdown options={["Ingreso", "Salida"]} value={field.value} onChange={(e) => field.onChange(e.value)} />
                {errors.tipoMovimiento && <span className="text-red-500">{errors.tipoMovimiento.message}</span>}
              </BoxForm>
            )}
          />
          <Controller
            name="cantidad"
            control={control}
            rules={{ required: "este campo es requerido" }}
            render={({ field }) => (
              <BoxForm>
                <label htmlFor="">Cantidad</label>
                <InputNumber value={field.value} onChange={({ value }) => field.onChange(value)} locale="es-NI" mode="decimal" maxFractionDigits={2} minFractionDigits={2} />
                {errors.cantidad && <span className="text-red-500">{errors.cantidad.message}</span>}
              </BoxForm>
            )}
          />
          <BoxForm>
            <label htmlFor="">Nota</label>
            <InputTextarea {...register("nota", { required: "este campo es requerido" })} />
          </BoxForm>
        </section>
        <section className="flex justify-end mt-2 gap-1">
          <Button label="Cancelar" text icon="pi pi-times" size="small" onClick={() => reset()} />
          <Button label="Guardar" type="submit" size="small" icon="pi pi-check" />
        </section>
      </form>
    </Fragment>
  );
}
