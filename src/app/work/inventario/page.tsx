"use client";
import { useGetResumenInventarioQuery } from "@/hooks/productos";
import { formatDecimal } from "@/utils/helpers";
import { Spinner2 } from "@/components/Spinner2";

export default function Inventario() {
  const { data, isLoading, isError } = useGetResumenInventarioQuery();

  function Card({ title, icon, value }: { title: string, icon: string, value: number }) {
    return (
      <div className="shadow-2 p-3 border border-surface-border rounded-xl">
        <div className="flex justify-between mb-3">
          <div>
            <span className="block text-2xl font-medium mb-3">{title}</span>
            <div className="text-900 font-medium text-xl">{formatDecimal(value)}</div>
          </div>
          <div className="flex items-center justify-center bg-blue-100 rounded-xl"
               style={{ width: "2.5rem", height: "2.5rem" }}>
            <i className={`${icon} text-blue-500 text-2xl`}></i>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {
        isLoading && (
         <Spinner2 />
        )
      }
      {
        isError && (
          <div className="flex justify-center">
            <div className="text-2xl text-red-500">Ocurrio un error</div>
          </div>
        )
      }
      {
        !isLoading && data && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
            <Card title="Productos" icon="pi pi-box" value={data?.productos} />
            <Card title="Marcas" icon="pi pi-tag" value={data.marcas} />
            <Card title="Proveedores" icon="pi pi-truck" value={data.proveedores} />
            <Card title="Pedidos Pendientes" icon="pi pi-file" value={data.pedidosPendientes} />
          </div>
        )
      }

    </div>
  );
}
