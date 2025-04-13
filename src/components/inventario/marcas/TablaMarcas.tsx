"use client";
import { DataTable } from "primereact/datatable";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { FormularioMarca } from "./FormularioMarca";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";

export function TablaMarcas() {
  const [vsidebar, setVsidebar] = useState<boolean>(false);

  const Header = (
    <div className="flex items-center justify-between flex-wrap">
      <div>
        <Button icon="pi pi-plus" label="Nuevo" size="small" severity="success" onClick={()=>setVsidebar(true)} />
      </div>
      <div>
        <IconField>
            <InputIcon className="pi pi-search" />
            <InputText placeholder="Buscar..." />
        </IconField>
      </div>
    </div>
  );

  function Acciones(row){
    return (
      <div>
        <Button icon="pi pi-pencil" label="Editar" size="small" severity="info" />
      </div>
    );
  }

  return (
    <div>
      <Sidebar visible={vsidebar} onHide={()=>setVsidebar(false)}>
        <FormularioMarca />
      </Sidebar>
      <DataTable header={Header} showGridlines emptyMessage="Sin marcas">
        <Column header="Marca" />
        <Column body={Acciones} />
      </DataTable>
    </div>
  );
}
