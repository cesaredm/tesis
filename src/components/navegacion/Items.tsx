"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { classNames } from "primereact/utils";

const menuItems = [
  { label: "Dashboard", icon: "pi pi-home", href: "/work" },
  {
    label: "Facturación",
    icon: "pi pi-shopping-cart",
    href: "/work/facturacion",
  },
  { label: "Reportes", icon: "pi pi-chart-bar", href: "/work/reportes" },
  { label: "inventario", icon: "pi pi-box", href: "/work/inventario" },
  { label: "Clientes", icon: "pi pi-users", href: "/work/clientes" },
  { label: "Empleados", icon: "pi pi-users", href: "/work/empleados" },
  { label: "Usuarios", icon: "pi pi-user", href: "/work/usuarios" },
  //{ label: "Configuración", icon: "pi pi-cog", href: "/work/configuracion" },
];
export function Items({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  return (
    <div className="min-h-[88vh] md:min-h-[92vh] flex flex-col justify-between">
      <ul className="list-none p-2 m-0">
        {menuItems.map((item, index) => (
          <li key={index} className="mb-2 hover:bg-surface-hover rounded-lg">
            <Link
              href={item.href}
              className={classNames(
                "flex items-center",
                collapsed ? "justify-center" : "",
                "cursor-pointer p-3 border-round-lg hover:bg-surface-hover transition-colors transition-duration-150 text-color",
                "no-underline",
                pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== "/work") ? "border-l-2 border-primary bg-primary/30 rounded-lg" : ""
              )}
            >
              <i className={classNames("text-xl", item.icon)}></i>
              {!collapsed && <span className="ml-3 font-medium">{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
      <div className="p-2">
        <Link href="/auth/logout" className={classNames("flex items-center", collapsed ? "justify-center" : "", "cursor-pointer p-3 border-round-lg hover:bg-surface-hover transition-colors transition-duration-150 rounded-lg", "no-underline")}>
          <i className="text-xl pi pi-sign-out"></i>
          {!collapsed && <span className="ml-3 font-medium">Cerrar Sesión</span>}
        </Link>
      </div>
    </div>
  );
}
