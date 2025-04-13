"use client";
import { MarcaSave } from "@/types/marca";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";

export function FormularioMarca() {
  // hooks => use
  const toast = useRef<Toast>(null);

  //Funcionalidad o logica
  function guardar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const datos = new FormData(form);
    const nombre = datos.get("nombre");

    if (!nombre) {
      toast.current?.show({
        severity: "warn",
        summary: "Advertencia",
        detail: `El nombre de la marca no puede estar vacio`,
        life: 3000,
      });
      return;
    }

    toast.current?.show({
      severity: "success",
      summary: "Exito",
      detail: `Se guardo con exito la marca ${datos.get("nombre")}`,
      life: 3000,
    });
  }

  // UI
  return (
    <div>
      <Toast ref={toast} position="top-center" />
      <div>
        <form action="" onSubmit={guardar}>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col">
              <label htmlFor="">Nombre de marca</label>
              <InputText name="nombre" />
            </div>

            <div>
              <Button label="Guardar" icon="pi pi-check" size="small" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
