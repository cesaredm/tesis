"use client";
import React, { useState } from "react";
import Link from "next/link";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";

interface MenuNavProps {
  className?: string;
  isStatic?: boolean;
  children?: React.ReactNode;
}

export function MenuNav({ className, isStatic = false, children }: MenuNavProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: "pi pi-home", href: "/dashboard" },
    { label: "Facturación", icon: "pi pi-file", href: "/facturacion" },
    { label: "Productos", icon: "pi pi-shopping-cart", href: "/productos" },
    { label: "Clientes", icon: "pi pi-users", href: "/clientes" },
    { label: "Reportes", icon: "pi pi-chart-bar", href: "/reportes" },
    { label: "Configuración", icon: "pi pi-cog", href: "/configuracion" },
  ];

  return (
    <div className="flex flex-col sticky top-0 z-50">
      <div className="flex justify-between items-center p-2 w-full bg-surface-card">
        <Button
          icon="pi pi-bars"
          onClick={() => setCollapsed(!collapsed)}
          className="p-button-text p-button-rounded"
        />
      </div>
      <section className="flex">
        <aside
          className={classNames(
            "bg-surface-card min-h-[93.5vh] transition-all duration-300 border-right-1 border-gray-200",
            collapsed ? "w-5rem" : "w-30rem"
          )}
        >
          <ul className="list-none p-2 m-0">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="mb-2 hover:bg-surface-hover rounded-lg"
              >
                <Link
                  href={item.href}
                  className={classNames(
                    "flex items-center",
                    collapsed ? "justify-center" : "",
                    "cursor-pointer p-3 border-round-lg hover:surface-200 transition-colors transition-duration-150 text-color",
                    "no-underline"
                  )}
                >
                  <i className={classNames("text-xl", item.icon)}></i>
                  {!collapsed && (
                    <span className="ml-3 font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <section className="p-3">
            {children}
        </section>
      </section>
    </div>
  );
}
