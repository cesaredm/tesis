import { formatDecimal } from "@/utils/helpers";
import Image from "next/image";
import { Divider } from "primereact/divider";

function CardReportes({ title, description, monto, imageSrc }: { title: string; description: string; monto: number; imageSrc: string }) {
  return (
    <div className="flex border border-primary/40 h-[4rem] rounded-2xl hover:bg-primary/20 hover:cursor-pointer">
      <div className="w-1/12 flex justify-center items-center h-full bg-primary/10 rounded-l-2xl">
        <Image src={imageSrc} alt="icono de factura" width={32} height={32} />
      </div>
      <div className="flex justify-between w-11/12 items-center px-2">
        <div>
          <span className="text-lg">{title}</span>
        </div>
        <div>
          <p className="text-2xl font-semibold">L. {formatDecimal(monto)}</p>
        </div>
      </div>
    </div>
  );
}

export default function EstadoDiarioPage() {
  return (
    <div className="w-1/2 m-auto flex flex-col gap-2">
      <CardReportes title="Facturas Emitidas" description="Total de facturas emitidas en el dia" monto={12500} imageSrc="/reportes/efectivo.png" />
      <CardReportes title="Creditos Otorgados" description="Total de facturas emitidas en el dia" monto={10000} imageSrc="/reportes/creditos.png" />
      <CardReportes title="Salidda de efectivo" description="Total de facturas emitidas en el dia" monto={5505} imageSrc="/reportes/salida.png" />
      <CardReportes title="Ingresos de efectivo" description="Total de facturas emitidas en el dia" monto={0} imageSrc="/reportes/ingresos.png" />
      <Divider />
      <CardReportes title="Total de efectivo en caja" description="Total de facturas emitidas en el dia" monto={60040} imageSrc="/reportes/existenciaCaja.png" />
    </div>
  );
}
