import { DetallesPedidoSave, PedidoSave } from "@/types";
import { create } from "zustand";

interface PedidoStore {
  pedido: PedidoSave | null;
  detalles: Map<string | number, DetallesPedidoSave>;
  reload: number;
  setPedido: (pedido: PedidoSave) => void;
  setReload: (reload: number) => void;
  clear: () => void;
}

export const usePedidosStore = create<PedidoStore>((set, get) => ({
  pedido: null,
  detalles: new Map<string | number, DetallesPedidoSave>(),
  reload: 0,
  setPedido: (pedido: PedidoSave) => set({ pedido }),
  setReload: (reload: number) => set({ reload }),
  clear: () => {
    get().detalles.clear();
    set({ pedido: null, reload: 0 });
  },
}));
