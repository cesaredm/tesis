"use client";
import { Divider } from "primereact/divider";
import { CardReportes } from "@/components/reportes/CardReportes";
import { BoxForm } from "@/components/shared/BoxForm";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { reportesUseCases } from "@/domain/usecases/ReportesUseCases";
import { Estado } from "@/domain/entities/Reportes";
import { Button } from "primereact/button";
import { Spinner2 } from "@/components/shared/Spinner2";
import { InputSwitch } from "primereact/inputswitch";

export default function EstadoDiarioPage() {
  const [fecha1, setFecha1] = useState<Date | null>(new Date());
  const [fecha2, setFecha2] = useState<Date | null>(new Date());
  const [estado, setEstado] = useState<Estado>({
    ventasEfectivo: 0,
    ventasCreditos: 0,
    salidasEfectivo: 0,
    entradasEfectivo: 0,
    existenciaCaja: 0,
  });
  const [loading, setLoading] = useState(false);
  const [isMensual, setIsMensual] = useState(false);

  async function getEstadoDiario() {
    if (fecha1) {
      setLoading(true);
      const [data, error] = await reportesUseCases.getEstadoDiario(fecha1);
      if (data) {
        setEstado(data);
      }

      if (error) {
        console.log(error);
      }
      setLoading(false);
    }
  }

  async function getEstadoMensual() {
    if (fecha1 && fecha2) {
      setLoading(true);
      const [data, error] = await reportesUseCases.getEstadoMensual(fecha1, fecha2);
      if (data) {
        setEstado(data);
      }

      if (error) {
        console.log(error);
      }
      setLoading(false);
    }
  }

  async function generarReporte(){
    if(isMensual){
      await getEstadoMensual();
    }else{
      await getEstadoDiario();
    }
  }

  return (
    <div className="w-1/2 m-auto flex flex-col gap-2">
      <header className="flex justify-between">
        <BoxForm>
          <label htmlFor="">fechas de filtro</label>
          <div className="flex gap-1 flex-wrap">
            <Calendar placeholder="De" value={fecha1} showIcon dateFormat="DD, dd/mm/yy" onChange={(e) => setFecha1(e.value as Date)} />
            {isMensual && <Calendar placeholder="Hasta" value={fecha2} showIcon dateFormat="DD, dd/mm/yy" onChange={(e) => setFecha2(e.value as Date)} />}
            <Button size="small" label="Actualizar" onClick={generarReporte} icon="pi pi-refresh" loading={loading} />
          </div>
        </BoxForm>
        <BoxForm>
          <label htmlFor="">{isMensual ? "Mes" : "Diario"}</label>
          <InputSwitch checked={isMensual} onChange={(e) => setIsMensual(e.value)} />
        </BoxForm>
      </header>
      <Divider />

      {loading ? (
        <Spinner2 />
      ) : (
        <>
          <CardReportes title="Ventas de Efectivo" description="Total de facturas emitidas en el dia" monto={estado.ventasEfectivo} imageSrc="/reportes/efectivo.png" />

          <CardReportes title="Ventas de Creditos" description="Total de facturas emitidas en el dia" monto={estado.ventasCreditos} imageSrc="/reportes/creditos.png" />
          <CardReportes title="Salida de Efectivo" description="Total de facturas emitidas en el dia" monto={estado.salidasEfectivo} imageSrc="/reportes/salida.png" />
          <CardReportes title="Entrada de Efectivo" description="Total de facturas emitidas en el dia" monto={estado.entradasEfectivo} imageSrc="/reportes/ingresos.png" />
          <Divider />
          <CardReportes title="Total de Efectivo en Caja" description="Total de facturas emitidas en el dia" monto={estado.existenciaCaja} imageSrc="/reportes/existenciaCaja.png" />
        </>
      )}
    </div>
  );
}
