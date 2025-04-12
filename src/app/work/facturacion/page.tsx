import { TablaFactura } from "@/components/facturacion/Factura";
import { Inventario } from "@/components/facturacion/Inventario";

export default function Facturacion() {
  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-3/5">
        <TablaFactura />
      </div>
    </div>
  );
}
