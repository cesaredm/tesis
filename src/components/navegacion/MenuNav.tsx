"use client";
import React, { useState } from "react";
import Link from "next/link";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import SwitchTheme from "../SwitchTheme";
import { usePathname } from "next/navigation";
import { AvatarUser } from "./Avatar";
import MenuMobile from "./MenuMobile";

interface MenuNavProps {
  className?: string;
  isStatic?: boolean;
  children?: React.ReactNode;
}

export function MenuNav({ className, isStatic = false, children }: MenuNavProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", icon: "pi pi-home", href: "/work" },
    {
      label: "Facturación",
      icon: "pi pi-shopping-cart",
      href: "/work/facturacion",
    },
    { label: "inventario", icon: "pi pi-box", href: "/work/inventario" },
    { label: "Clientes", icon: "pi pi-users", href: "/work/clientes" },
    { label: "Empleados", icon: "pi pi-users", href: "/work/empleados" },
    { label: "Reportes", icon: "pi pi-chart-bar", href: "/work/reportes" },
    { label: "Configuración", icon: "pi pi-cog", href: "/work/configuracion" },
  ];

  return (
    <div className="flex flex-col sticky top-0 z-50 min-w-[100vw] overflow-hidden">
      <div className="flex justify-between items-center pt-1 pb-1 pl-4 pr-4 bg-surface-card border border-surface-border">
        <div className="flex justify-between items-center w-[15rem]">
          <h3 className="text-lg font-bold">Mega Hogar</h3>
          <Button icon="pi pi-bars" onClick={() => setCollapsed(!collapsed)} className="p-button-text p-button-rounded" />
        </div>
        <div className="flex items-center gap-2">
          <SwitchTheme />
          <AvatarUser />
        </div>
      </div>
      <section className="flex">
        <aside className={classNames("bg-surface-card min-h-[94vh] transition-all duration-300 border-r border-surface-border flex flex-col justify-between pb-4", collapsed ? "w-[5rem]" : "w-[15rem]")}>
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
        </aside>
        <section className="p-3 w-full">{children}</section>
      </section>
    </div>
  );
}
