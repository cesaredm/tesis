import { TablaFactura } from "@/components/facturacion/Factura";
import { Inventario } from "@/components/facturacion/Inventario";

export default function Facturacion() {
  return (
    <div>
      <Inventario />
      <TablaFactura />
    </div>
  );
}
