"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const apartado = {
  "/work/inventario": "Resumen",
  "/work/inventario/productos": "Productos",
  "/work/inventario/marcas": "Marcas",
  "/work/inventario/proveedores": "Proveedores",
  "/work/inventario/pedidos": "Pedidos",
};

export function HeaderLayout() {
  const pathname = usePathname();

  function ButtonSection({ title, icon }: { title: string; icon: string }) {
    return (
      <span className={`p-2 border border-surface-border flex items-center gap-2 rounded-lg hover:bg-surface-hover hover:cursor-pointer hover:border-primary`}>
        <i className={icon}></i>
        {title}
      </span>
    );
  }

  return (
    <div>
      <header className="flex justify-between border-b border-surface-border p-2 mb-2">
        <h1 className="text-2xl font-semibold">
          {apartado[pathname as keyof typeof apartado] || 'Inventario'}
        </h1>
        <article className="flex gap-1">
          <Link href={"/work/inventario"}>
            <ButtonSection title="Resumen" icon="pi pi-chart-line" />
          </Link>
          <Link href={"/work/inventario/productos"}>
            <ButtonSection title="Productos" icon="pi pi-box" />
          </Link>
          <Link href={"/work/inventario/marcas"}>
            <ButtonSection title="Marcas" icon="pi pi-tag" />
          </Link>
          <ButtonSection title="Proveedores" icon="pi pi-truck" />
          <ButtonSection title="Pedidos" icon="pi pi-file" />
        </article>
      </header>
    </div>
  );
}
