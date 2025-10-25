"use client";
import { InputText } from "primereact/inputtext";
import { BoxForm } from "../shared/BoxForm";
import { HeaderForm } from "../shared/HeaderForm";
import { useForm } from "react-hook-form";
import { Cliente, ClienteSave } from "@/domain/entities/Clientes";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useActualizarClienteMutation, useGuardarClienteMutation } from "@/hooks/clientes";
import { useEffect, useRef, useState } from "react";
import { toastError, toastSuccess } from "@/utils/formatToast";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

export function CrearCliente({ cliente }: { cliente?: Cliente }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<ClienteSave | Cliente>();
  const router = useRouter();
  const { mutate: guardar, isPending: isPendingGuardar, isSuccess: isSuccessGuardar, isError: isErrorGuardar, error: errorGuardar, data: dataGuardar } = useGuardarClienteMutation();
  const { mutate: actualizarCliente, isPending: isPendingActualizar, isSuccess: isSuccessActualizar, isError: isErrorActualizar, data: dataActualizar, error: errorActualizar } = useActualizarClienteMutation();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const toast = useRef<Toast>(null);

  const onSubmit = (data: ClienteSave | Cliente) => {
    if (isEditMode && cliente) {
      actualizarCliente(data as Cliente);
    } else {
      guardar(data);
    }
  };

  useEffect(() => {
    if (isSuccessGuardar) {
      toast.current?.show(toastSuccess(dataGuardar));
      reset();
    }

    if (isErrorGuardar) {
      toast.current?.show(toastError(errorGuardar));
    }
  }, [isSuccessGuardar, isErrorGuardar]);

  useEffect(() => {
    if (isSuccessActualizar) {
      toast.current?.show(toastSuccess(dataActualizar));
      reset();
      router.push("/work/clientes/crear"); 
    }

    if (isErrorActualizar) {
      toast.current?.show(toastError(errorActualizar));
    }
  }, [isSuccessActualizar, isErrorActualizar]);

  useEffect(() => {
    if (cliente) {
      setIsEditMode(true);
      setValue("id", cliente.id);
      setValue("nombres", cliente.nombres);
      setValue("apellidos", cliente.apellidos);
      setValue("dni", cliente.dni);
      setValue("direccion", cliente.direccion);
      setValue("departamento", cliente.departamento);
      setValue("municipio", cliente.municipio);
      setValue("barrio", cliente.barrio);
      setValue("lugarTrabajo", cliente.lugarTrabajo);
      setValue("telefono", cliente.telefono);
    }
  }, [cliente]);

  return (
    <section className="w-full lg:w-4/5 mx-auto">
      <Toast ref={toast} />
      <HeaderForm title={isEditMode ? "Editar Cliente" : "Crear Cliente"} description={isEditMode ? "Edita datos de cliente" : "Agregue la información del cliente"} />
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-1">
          <BoxForm>
            <label htmlFor="">Nombres</label>
            <InputText {...register("nombres", { required: "campo requerido" })} />
            {errors.nombres && <span className="text-red-500">{errors.nombres.message}</span>}
          </BoxForm>
          <BoxForm>
            <label htmlFor="">Apellidos</label>
            <InputText {...register("apellidos", { required: "campo requerido" })} />
            {errors.apellidos && <span className="text-red-500">{errors.apellidos.message}</span>}
          </BoxForm>
          <BoxForm>
            <label htmlFor="">DNI</label>
            <InputText {...register("dni", { required: "campo requerido" })} />
            {errors.dni && <span className="text-red-500">{errors.dni.message}</span>}
          </BoxForm>
          <BoxForm>
            <label htmlFor="">Dirección</label>
            <InputTextarea rows={1} autoResize {...register("direccion", { required: "campo requerido" })} />
            {errors.direccion && <span className="text-red-500">{errors.direccion.message}</span>}
          </BoxForm>
          <BoxForm>
            <label htmlFor="">Departamento</label>
            <InputText {...register("departamento", { required: "campo requerido" })} />
            {errors.departamento && <span className="text-red-500">{errors.departamento.message}</span>}
          </BoxForm>
          <BoxForm>
            <label htmlFor="">Municipio</label>
            <InputText {...register("municipio", { required: "campo requerido" })} />
            {errors.municipio && <span className="text-red-500">{errors.municipio.message}</span>}
          </BoxForm>
          <BoxForm>
            <label htmlFor="">Barrio</label>
            <InputText {...register("barrio", { required: "campo requerido" })} />
            {errors.barrio && <span className="text-red-500">{errors.barrio.message}</span>}
          </BoxForm>
          <BoxForm>
            <label htmlFor="">Lugar de Trabajo</label>
            <InputText {...register("lugarTrabajo", { required: "campo requerido" })} />
            {errors.lugarTrabajo && <span className="text-red-500">{errors.lugarTrabajo.message}</span>}
          </BoxForm>
          <BoxForm>
            <label htmlFor="">Telefono</label>
            <InputText {...register("telefono", { required: "campo requerido" })} />
            {errors.telefono && <span className="text-red-500">{errors.telefono.message}</span>}
          </BoxForm>
        </section>
        <footer className="mt-2 flex justify-end gap-2">
          <Button label="Cancelar" size="small" icon="pi pi-times" text type="button" onClick={() => reset()} />
          <Button label={isEditMode ? "Actualizar" : "Guardar"} size="small" icon="pi pi-check" type="submit" loading={isPendingGuardar || isPendingActualizar} />
        </footer>
      </form>
    </section>
  );
}
