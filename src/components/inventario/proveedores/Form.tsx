"use client";

import { useGuardarProveedorMutation } from "@/hooks/proveedores";
import { Proveedor } from "@/types/proveedor";
import { isAxiosError } from "@/utils/axiosConfig";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

export function Form({ proveedor }: { proveedor?: Proveedor }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<Proveedor>();
  const { mutate: guardarProveedor, isPending, isSuccess, isError, error, data } = useGuardarProveedorMutation();

  const toast = useRef<Toast>(null);

  const onSubmit = (data: Proveedor) => {
    if (!proveedor) {
      guardarProveedor(data);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      toast.current?.show(data);
    }
    if (isError) {
      if (isAxiosError(error)) {
        toast.current?.show({
          severity: error.response?.data.severity,
          summary: error.response?.data.summary,
          detail: error.response?.data.detail + " " + error.response?.data.error,
          life: 3000,
        });
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error al guardar el proveedor",
          life: 3000,
        });
      }
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <Toast ref={toast} />
      <h1 className="text-2xl font-bold">Crear Proveedor</h1>
      <p className="text-sm text-gray-500">Formulario para crear un nuevo proveedor.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-1">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <div className="flex flex-col gap-2">
            <label htmlFor="nombre" className="text-sm font-semibold">
              Nombre
            </label>
            <InputText {...register("nombre", { required: "Este campo es requerido" })} />
            {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="telefono" className="text-sm font-semibold">
              Teléfono
            </label>
            <InputText {...register("telefono", { required: "Este campo es requerido" })} />
            {errors.telefono && <span className="text-red-500 text-sm">{errors.telefono.message}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="cuentaBancaria" className="text-sm font-semibold">
              Cuenta Bancaria
            </label>
            <InputText {...register("cuentaBancaria")} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="vendedor" className="text-sm font-semibold">
              Vendedor
            </label>
            <InputText {...register("vendedor", { required: "Este campo es requerido" })} />
            {errors.vendedor && <span className="text-red-500 text-sm">{errors.vendedor.message}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="telefonoVendedor" className="text-sm font-semibold">
              Teléfono Vendedor
            </label>
            <InputText {...register("telefonoVendedor", { required: "Este campo es requerido" })} />
            {errors.telefonoVendedor && <span className="text-red-500 text-sm">{errors.telefonoVendedor.message}</span>}
          </div>
        </section>
        <section className="flex justify-end gap-1">
          <Button label="Limpiar" icon="pi pi-erase" size="small" text type="button" onClick={() => reset()} disabled={isPending} />
          <Button label="Guardar" icon={isPending ? "pi pi-spin pi-spinner" : "pi pi-check"} size="small" type="submit" disabled={isPending} />
        </section>
      </form>
    </div>
  );
}
