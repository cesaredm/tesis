import { TableProductos } from "@/components/inventario/productos/TablaProductos";
import { Suspense } from "react";

export default function CrearProductos() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <TableProductos />
      </Suspense>
    </div>
  );
}
