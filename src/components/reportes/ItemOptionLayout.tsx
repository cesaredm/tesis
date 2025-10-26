"use client";
import React, { useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useRouter } from "next/navigation";

interface Option {
  label: string;
  link: string;
  icon: string;
}

const options: Option[] = [{ label: "Facturas Emitidas", link: "/work/reportes/facturasEmitida", icon: "pi pi-fw pi-file" },
{ label: "Estado diario", link: "/work/reportes/estadoDiario", icon: "pi pi-chart-pie" }
];

export function ItemOptionLayout() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const router = useRouter()

  const selectedCountryTemplate = (option: Option, props: any) => {
    if (option) {
      return (
        <div className="flex items-center gap-2">
          <i className={option.icon}></i>
          <div>{option.label}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option: Option) => {
    return (
      <div className="flex items-center gap-2">
        <i className={option.icon}></i>
        <div>{option.label}</div>
      </div>
    );
  };

  const panelFooterTemplate = () => {
    return (
      <div className="py-2 px-3">
        {selectedOption ? (
          <span>
            <b>{selectedOption.label}</b> Seleccionada.
          </span>
        ) : (
          "Opcion no seleccinada."
        )}
      </div>
    );
  };

  function onOptionChange(e: DropdownChangeEvent) {
    setSelectedOption(e.value);
    router.replace(e.value.link)
  }

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedOption}
        onChange={onOptionChange}
        options={options}
        optionLabel="label"
        placeholder="Selecciona una opcion de reporte"
        valueTemplate={selectedCountryTemplate}
        itemTemplate={countryOptionTemplate}
        className="w-full md:w-14rem"
        panelFooterTemplate={panelFooterTemplate}
      />
    </div>
  );
}
