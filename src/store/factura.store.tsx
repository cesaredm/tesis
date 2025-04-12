import { FacturaSave, DetalleSave } from "@/types";
import { create } from "zustand";

interface FacturaStore {
  factura: FacturaSave;
  detalles: Map<string | number, DetalleSave>;
  totales: {
    subtotal: number;
    descuento: number;
    total: number;
  };
  reloadView: number;
  setFactura: (factura: FacturaSave) => void;
  setReloadView: (reloadView: number) => void;
  setTotales: (totales: { subtotal: number; descuento: number; total: number }) => void;
}

const initialFactura: FacturaSave = {
  fecha: new Date(),
  credito: null,
};

export const useFacturaStore = create<FacturaStore>((set) => ({
  factura: initialFactura,
  detalles: new Map<string | number, DetalleSave>(),
  totales: {
    subtotal: 0,
    descuento: 0,
    total: 0,
  },
  reloadView: 0,
  setReloadView: (reloadView: number) => set({ reloadView }),
  setFactura: (factura: FacturaSave) => set({ factura }),
  setTotales: (totales: { subtotal: number; descuento: number; total: number }) => set({ totales }),
}));
