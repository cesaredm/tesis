import { FacturaSave, DetalleSave } from "@/domain/entities/Facturas";
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
  setCampoFactura: (campo: string, value: any) => void;
  setFactura: (factura: FacturaSave) => void;
  setReloadView: (reloadView: number) => void;
  setTotales: (totales: { subtotal: number; descuento: number; total: number }) => void;
  limpiarTodo: () => void;
}

const initialFactura: FacturaSave = {
  fecha: new Date(),
  aval: null,
  cliente: null,
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
  setCampoFactura: (campo: string, value: any) => set((state) => ({ factura: { ...state.factura, [campo]: value } })),
  setReloadView: (reloadView: number) => set({ reloadView }),
  setFactura: (factura: FacturaSave) => set({ factura }),
  setTotales: (totales: { subtotal: number; descuento: number; total: number }) => set({ totales }),
  limpiarTodo: () => {
    set({ factura: initialFactura, detalles: new Map<string | number, DetalleSave>(), totales: { subtotal: 0, descuento: 0, total: 0 }, reloadView: 0});
  },
}));
