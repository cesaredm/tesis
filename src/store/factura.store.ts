import { FacturaSave, DetalleSave, RespuestaFactura } from "@/domain/entities/Facturas";
import { create } from "zustand";

interface FacturaStore {
  factura: FacturaSave;
  cliente: string;
  aval: string;
  detalles: Map<string | number, DetalleSave>;
  totales: {
    subtotal: number;
    descuento: number;
    total: number;
  };
  respuestaFactura: RespuestaFactura;
  reloadView: number;
  setCampoFactura: (campo: string, value: any) => void;
  setFactura: (factura: FacturaSave) => void;
  setReloadView: (reloadView: number) => void;
  setTotales: (totales: { subtotal: number; descuento: number; total: number }) => void;
  limpiarTodo: () => void;
  setRespuestaFactura: (respuestaFactura: RespuestaFactura) => void;
  setAval: (aval: string) => void;
  setCliente: (cliente: string) => void;
}

const initialFactura: FacturaSave = {
  fecha: new Date(),
  aval: null,
  cliente: null,
  comprador: "",
};

export const useFacturaStore = create<FacturaStore>((set, get) => ({
  factura: initialFactura,
  aval: "",
  cliente: "",
  detalles: new Map<string | number, DetalleSave>(),
  totales: {
    subtotal: 0,
    descuento: 0,
    total: 0,
  },
  reloadView: 0,
  respuestaFactura: {
    fecha: "",
    numeroCorrelativo: 0,
    empleado: 0,
  },
  setCampoFactura: (campo: string, value: any) => {
    const facturaState = get().factura;
    const factura = { ...facturaState, [campo]: value };
    set({ factura });
  },
  setReloadView: (reloadView: number) => set({ reloadView }),
  setFactura: (factura: FacturaSave) => set({ factura }),
  setTotales: (totales: { subtotal: number; descuento: number; total: number }) => set({ totales }),
  limpiarTodo: () => {
    set({ factura: initialFactura, detalles: new Map<string | number, DetalleSave>(), totales: { subtotal: 0, descuento: 0, total: 0 }, reloadView: 0 });
  },
  setRespuestaFactura: (respuestaFactura: RespuestaFactura) => set({ respuestaFactura }),
  setAval: (aval: string) => set({ aval }),
  setCliente: (cliente: string) => set({ cliente }),
}));
