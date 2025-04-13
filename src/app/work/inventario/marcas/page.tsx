import { FormularioMarca } from "@/components/inventario/marcas/FormularioMarca";
import { TablaMarcas } from "@/components/inventario/marcas/TablaMarcas";

export default function Page() {
  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-2/4">
      <TablaMarcas />
      </div>
    </div>
  );
}
