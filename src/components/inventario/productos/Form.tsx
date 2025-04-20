"use client";

import { useGetMarcasQuery } from "@/hooks/marcas";
import { useGuardarProductoMutation } from "@/hooks/productos";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Toast } from "primereact/toast";
import { isAxiosError } from "@/utils/axiosConfig";

function BoxForm({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>;
}

interface Inputs {
  codigoBarra: string;
  descripcion: string;
  modelo: string;
  precioCosto: number;
  precioVenta: number;
  stock: number;
  marca: number;
}

export function Form() {
  const { data: marcas, isLoading } = useGetMarcasQuery();
  const { mutate: guardar, isError, error, isPending, data, isSuccess } = useGuardarProductoMutation();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
    control,
  } = useForm<Inputs>();

  const toast = useRef<Toast>(null);

  function handleFormSubmit(data: Inputs) {
    guardar(data);
  }

  useEffect(() => {
    if (isError) {
      toast.current?.show({
        severity: isAxiosError(error) ? error.response?.data.severity : "warn",
        summary: isAxiosError(error) ? error.response?.data.summary : "Error",
        detail: isAxiosError(error) ? error.response?.data.detail + error.response?.data.error : "Error al guardar el producto",
        life: 3000,
      });
    }
    if (isSuccess) {
      toast.current?.show({
        severity: data.severity,
        summary: data.summary,
        detail: data.detail,
        life: 3000,
      });
      reset();
    }
  }, [isError, isSuccess]);

  return (
    <div className="border border-surface-border p-2 rounded-lg bg-surface-card">
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1">
          <BoxForm>
            <label htmlFor="">Codigo Barras</label>
            <InputText keyfilter={"alphanum"} {...register("codigoBarra")} />
          </BoxForm>
          <BoxForm>
            <label htmlFor="">Descripción*</label>
            <InputText {...register("descripcion", { required: "Este campo es requerido" })} />
            {errors.descripcion && <small className="text-red-500">{errors.descripcion.message}</small>}
          </BoxForm>
          <BoxForm>
            <label htmlFor="">Modelo</label>
            <InputText {...register("modelo")} />
          </BoxForm>
          <Controller
            name="precioCosto"
            control={control}
            render={({ field }) => (
              <BoxForm>
                <label htmlFor="">Precio Costo</label>
                <InputNumber value={field.value} onChange={({ value }) => field.onChange(value)} locale="en-us" mode="currency" currency="HNL" maxFractionDigits={2} minFractionDigits={2} />
              </BoxForm>
            )}
          />

          <Controller
            name="precioVenta"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <BoxForm>
                <label htmlFor="">Precio Venta*</label>
                <InputNumber value={field.value} onChange={({ value }) => field.onChange(value)} locale="en-us" mode="currency" currency="HNL" maxFractionDigits={2} minFractionDigits={2} />
                {errors.precioVenta && <small className="text-red-500">{errors.precioVenta.message}</small>}
              </BoxForm>
            )}
          />

          <Controller
            name="stock"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <BoxForm>
                <label htmlFor="">Stock*</label>
                <InputNumber value={field.value} onChange={({ value }) => field.onChange(value)} locale="en-us" mode="decimal" maxFractionDigits={2} minFractionDigits={2} />
                {errors.precioVenta && <small className="text-red-500">{errors.precioVenta.message}</small>}
              </BoxForm>
            )}
          />

          <Controller
            name="marca"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <BoxForm>
                <label htmlFor="">Marca*</label>
                <Dropdown options={marcas} optionLabel="nombre" value={field.value} optionValue="id" onChange={(e) => field.onChange(e.value)} filter />
                {errors.marca && <small className="text-red-500">{errors.marca.message}</small>}
              </BoxForm>
            )}
          />
        </div>
        <div className="flex gap-1 justify-end mt-2">
          <Button label="Limpiar" icon="pi pi-eraser" size="small" text type="button" />
          <Button label="Guardar" icon={isPending ? "pi pi-spin pi-spinner" : "pi pi-check"} size="small" type="submit" disabled={isPending} />
        </div>
      </form>
    </div>
  );
}
