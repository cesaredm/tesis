import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { Inventario } from "./Inventario";
import { Button } from "primereact/button";
import { useIsMobile } from "@/hooks/useIsMobile";

export function SidebarInventario() {
  const [visible, setVisible] = useState<boolean>(false);
  const {isMobile} = useIsMobile()
  return (
    <>
      <Button label="Inventario" size="small" severity="info" icon="pi pi-box" onClick={()=>setVisible(true)} />
      <Sidebar visible={visible} className="p-sidebar-md" fullScreen={isMobile} onHide={() => setVisible(false)}>
        <div>
          <Inventario />
        </div>
      </Sidebar>
    </>
  );
}
