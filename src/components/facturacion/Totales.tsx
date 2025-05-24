import { useFacturaStore } from "@/store/factura.store";
import { formatDecimal } from "@/utils/helpers";
import { useCallback, useEffect } from "react";

export function Totales() {
  const { detalles, setTotales, totales, reloadView } = useFacturaStore((state) => state);

  const calcularTotales = useCallback(() => {
    const d = Array.from(detalles.values());
    const subtotal = d.reduce((acc, item) => acc + item.importe, 0);
    const descuento = d.reduce((acc, item) => acc + (item.precioOriginal - item.precio), 0);
    const total = subtotal - descuento;
    setTotales({ subtotal, descuento, total });
  }, [reloadView, setTotales]);

  useEffect(() => {
    calcularTotales();
  }, [reloadView]);

  return (
    <div className="grid grid-cols-3 text-right">
      <article>
        <p className="font-bold text-sm">Subtotal</p>
        <p className="font-bold text-2xl text-right">{formatDecimal(totales.subtotal)}</p>
      </article>
      <article>
        <p className="font-bold text-sm">Descuentos</p>
        <p className="font-bold text-2xl text-right">{formatDecimal(totales.descuento)}</p>
      </article>
      <article>
        <p className="font-bold text-sm">Total</p>
        <p className="font-bold text-2xl text-right">{formatDecimal(totales.total)}</p>
      </article>
    </div>
  );
}
