import React, { useState} from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Items } from "./Items";

export default function MenuMobile({ isVisible = false }: { isVisible: boolean }) {
  const [visible, setVisible] = useState(isVisible);

  return (
    <div className="card flex justify-content-center">
      <Button icon="pi pi-bars" onClick={() => setVisible(true)} className="p-button-text p-button-rounded" />
      <Sidebar visible={visible} header="Menu principal" onHide={() => setVisible(false)}>
        <Items collapsed={false} />
      </Sidebar>
    </div>
  );
}
