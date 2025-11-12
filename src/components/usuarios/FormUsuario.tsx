"use client";
import { useGetEmpleadosQuery } from "@/hooks/useEmpleados";
import { useForm, Controller } from "react-hook-form";
import { BoxForm } from "../shared/BoxForm";
import { Usuario, UsuarioSave, UsuarioUpdate } from "@/domain/entities/Usuario";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { HeaderForm } from "../shared/HeaderForm";
import { useActualizarUsuarioMutation, useGetUsuariosQuery, useGuardarUsuarioMutation } from "@/hooks/useUsuarios";
import { useEffect, useRef } from "react";
import { toastError, toastSuccess } from "@/utils/formatToast";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

export function FormUsuario({ usuario }: { usuario?: string }) {
  const { data: empleados, isLoading } = useGetEmpleadosQuery();
  const { mutate: guardarUsuario, isPending, isSuccess, isError, error, data } = useGuardarUsuarioMutation();
  const { mutate: actualizarUsuario, isPending: isPendingUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate, error: errorUpdate, data: dataUpdate } = useActualizarUsuarioMutation();
  const { data: usuarios, isLoading: isLoadingUsuarios } = useGetUsuariosQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<UsuarioSave | UsuarioUpdate>();
  const toast = useRef<Toast>(null);
  const router = useRouter();

  function onSubmitUsuario(data: UsuarioSave | UsuarioUpdate) {
    if (usuario && !isPendingUpdate) {
      actualizarUsuario(data as UsuarioUpdate);
    }

    if (!usuario && !isPending) {
      guardarUsuario(data);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.current?.show(toastSuccess(data));
      reset();
    }
    if (isError) {
      toast.current?.show(toastError(error));
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccessUpdate) {
      toast.current?.show(toastSuccess(dataUpdate));
      reset();
      router.replace("/work/usuarios/crear");
    }
    if (isErrorUpdate) {
      toast.current?.show(toastError(errorUpdate));
    }
  }, [isSuccessUpdate, isErrorUpdate]);

  useEffect(() => {
    if (usuario && usuarios) {
      const usuariofind: Usuario = usuarios?.find((u) => u.id == Number(usuario)) as Usuario;
      setValue("id", usuariofind.id);
      setValue("empleado", Number(usuariofind.empleado));
      setValue("usuario", usuariofind.usuario);
      setValue("permiso", usuariofind.permiso);
    }
  }, [usuario, isLoadingUsuarios]);

  return (
    <div>
      <Toast ref={toast} />
      <HeaderForm title={usuario ? "Actualizar usuario" : "Crear usuario"} description={usuario ? "Actualice los datos del usuario" : "Ingrese los datos del nuevo usuario"} />
      <form action="" onSubmit={handleSubmit(onSubmitUsuario)}>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <Controller
            name="empleado"
            control={control}
            rules={{ required: "campo requerido" }}
            render={({ field }) => (
              <BoxForm>
                <label htmlFor="">Colaborador</label>
                <Dropdown options={empleados} optionLabel="nombres" optionValue="idempleado" value={field.value} onChange={(e) => field.onChange(e.value)} loading={isLoading} />
                {errors.empleado && <span className="text-red-400">{errors.empleado.message}</span>}
              </BoxForm>
            )}
          />
          <BoxForm>
            <label htmlFor="">Nombre de usuario</label>
            <InputText {...register("usuario", { required: "campo requerido" })} autoComplete="off" />
            {errors.usuario && <span className="text-red-400">{errors.usuario.message}</span>}
          </BoxForm>
          <Controller
            name="password"
            control={control}
            rules={{ required: "campo requerido" }}
            defaultValue=""
            render={({ field }) => (
              <BoxForm>
                <label htmlFor="">Contraseña</label>
                <div className="p-fluid">
                  <Password feedback={false} toggleMask autoComplete="off" value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                </div>
                {errors.password && <span className="text-red-400">{errors.password.message}</span>}
              </BoxForm>
            )}
          />

          <Controller
            name="permiso"
            control={control}
            rules={{ required: "campo requerido" }}
            render={({ field }) => (
              <BoxForm>
                <label htmlFor="">Permiso</label>
                <Dropdown options={["Admin", "Ventas"]} value={field.value} onChange={(e) => field.onChange(e.value)} />
                {errors.permiso && <span className="text-red-400">{errors.permiso.message}</span>}
              </BoxForm>
            )}
          />
        </section>
        <footer className="flex justify-end gap-2 mt-2">
          <Button label="Limpiar" type="button" onClick={() => reset()} icon="pi pi-times" text size="small" loading={isPending} />
          <Button label={usuario ? "Actualizar" : "Guardar"} type="submit" icon="pi pi-check" size="small" loading={isPending} />
        </footer>
      </form>
    </div>
  );
}
