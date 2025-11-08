"use client";
import { InputText } from "primereact/inputtext";
import { BoxForm } from "../shared/BoxForm";
import { HeaderForm } from "../shared/HeaderForm";
import { useForm } from "react-hook-form";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useEditarEmpleadoMutation, useGuardarEmpleadoMutation } from "@/hooks/useEmpleados";
import { useEffect, useRef, useState } from "react";
import { toastError, toastSuccess } from "@/utils/formatToast";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { Empleado, EmpleadoSave, EmpleadoUpdate } from "@/domain/entities/Empleado";

export function CrearEmpleado({ empleado }: { empleado?: Empleado }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<EmpleadoSave | EmpleadoUpdate>();
  const router = useRouter();
  const { mutate: guardar, isPending: isPendingGuardar, isSuccess: isSuccessGuardar, isError: isErrorGuardar, error: errorGuardar, data: dataGuardar } = useGuardarEmpleadoMutation();
  const { mutate: actualizarEmpleado, isPending: isPendingActualizar, isSuccess: isSuccessActualizar, isError: isErrorActualizar, data: dataActualizar, error: errorActualizar } = useEditarEmpleadoMutation();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const toast = useRef<Toast>(null);

  const onSubmit = (data: EmpleadoSave | EmpleadoUpdate) => {
    if (isEditMode && empleado) {
      actualizarEmpleado(data as EmpleadoUpdate);
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
      router.push("/work/empleados/crear");
    }

    if (isErrorActualizar) {
      toast.current?.show(toastError(errorActualizar));
    }
  }, [isSuccessActualizar, isErrorActualizar]);

  useEffect(() => {
    if (empleado) {
      setIsEditMode(true);
      setValue("id", empleado.id);
      setValue("nombres", empleado.nombres);
      setValue("apellidos", empleado.apellidos);
      setValue("dni", empleado.dni);
      setValue("direccion", empleado.direccion);
      setValue("departamento", empleado.departamento);
      setValue("municipio", empleado.municipio);
      setValue("barrio", empleado.barrio);
      setValue("lugarTrabajo", empleado.lugarTrabajo);
      setValue("telefono", empleado.telefono);
    }
  }, [empleado]);

  return (
    <section className="w-full lg:w-4/5 mx-auto">
      <Toast ref={toast} />
      <HeaderForm title={isEditMode ? "Editar Colaborador" : "Crear Colaborador"} description={isEditMode ? "Edita datos de colaborador" : "Agregue la información del colaborador"} />
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
          <Button label="Cancelar" size="small" icon="pi pi-times" text type="button" onClick={() => {reset(); router.push("/work/empleados/crear")}} />
          <Button label={isEditMode ? "Actualizar" : "Guardar"} size="small" icon="pi pi-check" type="submit" loading={isPendingGuardar || isPendingActualizar} />
        </footer>
      </form>
    </section>
  );
}
