"use client";
import { FormularioMarca } from "@/components/inventario/marcas/FormularioMarca";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";

export default function Inventario() {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div>
      <Button label="Crear marca" onClick={() => setVisible(true)} />
      <Sidebar visible={visible} position="right" header="Marca" onHide={() => setVisible(false)}>
        <FormularioMarca />
      </Sidebar>
    </div>
  );
}
