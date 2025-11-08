"use client";
import React, { useState } from "react";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import SwitchTheme from "../SwitchTheme";
import { AvatarUser } from "./Avatar";
import MenuMobile from "./MenuMobile";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Items } from "./Items";

interface MenuNavProps {
  className?: string;
  isStatic?: boolean;
  children?: React.ReactNode;
}

export function MenuNav({ children }: MenuNavProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { isMobile } = useIsMobile();

  return (
    <div className="flex flex-col sticky top-0 z-50 min-w-[100vw] overflow-hidden">
      <div className="flex justify-between items-center pt-1 pb-1 pl-4 pr-4 bg-surface-card border border-surface-border">
        <div className="flex justify-between items-center w-[15rem]">
          <h3 className="text-lg font-bold">Mega Hogar</h3>
          {!isMobile && <Button icon="pi pi-bars" onClick={() => setCollapsed(!collapsed)} className="p-button-text p-button-rounded" />}
          {isMobile && <MenuMobile isVisible={true} />}
        </div>
        <div className="flex items-center gap-2">
          <SwitchTheme />
          <AvatarUser />
        </div>
      </div>
      <section className="flex">
        {!isMobile && (
          <aside className={classNames("bg-surface-card min-h-[94vh] transition-all duration-300 border-r border-surface-border flex flex-col justify-between pb-4", collapsed ? "w-[5rem]" : "w-[15rem]")}>
            <Items collapsed={collapsed} />
          </aside>
        )}

        <section className="p-3 w-full">{children}</section>
      </section>
    </div>
  );
}
