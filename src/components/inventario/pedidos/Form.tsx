"use client";

import { Pedido } from "./Pedido";
import { Productos } from "./Productos";

export function FormPedidos() {
  return (
    <div>
      <div className="w-full md:w-1/2 mx-auto">
        <h1 className="text-2xl font-bold">Crear pedido</h1>
        <p className="text-sm text-gray-500">Crear nuevo pedido.</p>
        <Pedido />
      </div>
    </div>
  );
}
