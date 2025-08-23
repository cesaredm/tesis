"use client";
import { InputText } from "primereact/inputtext";
import { BoxForm } from "../shared/BoxForm";
import { HeaderForm } from "../shared/HeaderForm";
import { useForm } from "react-hook-form";
import { ClienteSave } from "@/domain/entities/Clientes";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

export function CrearCliente() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ClienteSave>();

    const onSubmit = (data: ClienteSave) => {
        console.log(data);
        reset();
    };

  return (
    <section className="w-full lg:w-4/5 mx-auto">
      <HeaderForm title="Crear Cliente" description="Agrega un nuevo cliente" />
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
            <Button label="Guardar" size="small" icon="pi pi-check" type="submit" />
        </footer>
      </form>
    </section>
  );
}
