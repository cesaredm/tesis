"use client";
import { useActualizarMarcaMutation, useGuardarMarcaMutation } from "@/hooks/marcas";
import { isAxiosError } from "@/utils/axiosConfig";
import { MarcaSave, MarcaUpdate } from "@/types/marca";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export function FormularioMarca({ marca }: { marca?: MarcaUpdate }) {
  // hooks => use
  const { mutate: guardarMarca, isPending, isSuccess, isError, error, data } = useGuardarMarcaMutation();
  const { mutate: actualizarMarca, isPending: isPendingUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate, error: errorUpdate, data: dataUpdate } = useActualizarMarcaMutation();
  const [isModeEdit, setIsModeEdit] = useState(false);
  const toast = useRef<Toast>(null);
  const {
    register,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<MarcaSave | MarcaUpdate>();

  const router = useRouter();

  //Funcionalidad o logica
  function hanlderSubmit(datos: MarcaSave | MarcaUpdate) {
    if (marca && isModeEdit) {
      actualizarMarca(datos as MarcaUpdate);
    }

    if (!marca && !isModeEdit) {
      guardarMarca(datos as MarcaSave);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.current?.show(data);
      reset();
    }

    if (isError) {
      if (isAxiosError(error)) {
        toast.current?.show(error.response?.data);
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error al guardar la marca",
          life: 3000,
        });
      }
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccessUpdate) {
      toast.current?.show(dataUpdate);
      setIsModeEdit(false);
      reset();
      router.push("/work/inventario/marcas");
    }
    if (isErrorUpdate) {
      if (isAxiosError(errorUpdate)) {
        toast.current?.show(errorUpdate.response?.data);
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error al actualizar la marca",
          life: 3000,
        });
      }
    }
  }, [isSuccessUpdate, isErrorUpdate]);

  useEffect(() => {
    console.log(marca);
    if (marca) {
      setValue("nombre", marca.nombre);
      setValue("id", marca.id);
      setIsModeEdit(true);
    }
  }, [marca]);

  // UI
  return (
    <div>
      <Toast ref={toast} position="top-center" />
      <div>
        <h1 className="text-2xl font-bold">Crear Marca</h1>
        <p className="text-sm text-gray-500">Formulario para crear una nueva Marca.</p>
        <form action="" onSubmit={handleSubmit(hanlderSubmit)}>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col">
              <label htmlFor="">Nombre de marca</label>
              <InputText {...register("nombre", { required: "El nombre es requerido" })} />
              {errors.nombre && <small className="p-error">{errors.nombre.message}</small>}
            </div>

            <div className="flex justify-end mt-2">
              <Button label={marca ? "Actualizar" : "Guardar"} icon={isPending ? "pi pi-spin pi-spinner" : "pi pi-check"} size="small" disabled={isPending} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
