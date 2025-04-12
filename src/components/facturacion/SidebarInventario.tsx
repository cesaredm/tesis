import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { Inventario } from "./Inventario";
import { Button } from "primereact/button";

export function SidebarInventario() {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <span className="">
      <Button label="Inventario" size="small" severity="info" icon="pi pi-box" onClick={()=>setVisible(true)} />
      <Sidebar visible={visible} className="p-sidebar-md" onHide={() => setVisible(false)}>
        <div>
          <Inventario />
        </div>
      </Sidebar>
    </span>
  );
}
