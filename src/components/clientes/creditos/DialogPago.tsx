"use client";

import { BoxForm } from "@/components/shared/BoxForm";
import { PagoSave } from "@/domain/entities/Pagos";
import { useGenerarPagoMutation } from "@/hooks/clientes";
import { toastError, toastSuccess } from "@/utils/formatToast";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";

interface Props {
  credito: number;
}
export function DialogPago({ credito }: Props) {
  const { mutate: generarPago, isPending, isError, isSuccess, error, data } = useGenerarPagoMutation();
  const [visible, setVisible] = useState(false);
  const {
    register,
    control,
    formState: { errors },
    setValue,
    reset,
    handleSubmit,
  } = useForm<PagoSave>({ defaultValues: { credito, monto: 0 } });

  const toast = useRef<Toast>(null);

  function onSubmitPago(data: PagoSave) {
    generarPago(data);
  }

  const Footer = (
    <div>
      <Button type="button" label="Cancelar" icon="pi pi-times" size="small" text loading={isPending} onClick={()=>reset()} />
      <Button type="submit" form="form-pago" label="Guardar" icon="pi pi-check" size="small" loading={isPending} />
    </div>
  );

  useEffect(() => {
    if (isSuccess) {
      setVisible(false);
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
      <Button icon="pi pi-money-bill" severity="success" text tooltip="Generar pago" onClick={() => setVisible(true)} />
      <Dialog header="Generar pago" visible={visible} onHide={() => setVisible(false)} footer={Footer} style={{ width: "400px" }}>
        <form onSubmit={handleSubmit(onSubmitPago)} id="form-pago">
          <section className="grid grid-cols-1 gap-1">
            <Controller
              name="fecha"
              control={control}
              rules={{ required: "campo requerido" }}
              render={({ field }) => (
                <BoxForm>
                  <label htmlFor="">Fecha</label>
                  <Calendar value={field.value as Date} onChange={(e) => field.onChange(e.value)} dateFormat="dd MM yy" showIcon showTime />
                  {errors.fecha && <p className="text-red-500">{errors.fecha.message}</p>}
                </BoxForm>
              )}
            />
            <BoxForm>
              <label htmlFor="">Credito</label>
              <InputText {...register("credito", { required: "campo requerido" })} keyfilter={"int"} readOnly />
              {errors.credito && <p className="text-red-500">{errors.credito.message}</p>}
            </BoxForm>

            <Controller
              name="monto"
              control={control}
              rules={{ required: "compo requerido", validate: (value) => value > 0 || "El monto debe ser mayor a 0" }}
              render={({ field }) => (
                <BoxForm>
                  <label htmlFor="">Monto</label>
                  <InputNumber value={field.value} onChange={({ value }) => field.onChange(value)} mode="currency" currency="HND" locale="es-NI" maxFractionDigits={2} minFractionDigits={2} />
                  {errors.monto && <p className="text-red-500">{errors.monto.message}</p>}
                </BoxForm>
              )}
            />
          </section>
        </form>
      </Dialog>
    </>
  );
}
