import { FormPagoPedido } from "@/components/inventario/pedidos/FormPagoPedido";

export default async function PageFormPagoCredito({ searchParams }: { searchParams: { pedido: number } }) {
  const pedido: { pedido: number } = await searchParams;
  return <div>
    <div className={'w-full md:w-1/2 mx-auto'}>
      <h1 className="text-2xl font-bold">Crear pago de pedido</h1>
      <p className="text-sm text-gray-500">Crear nuevo pago de pedido # {pedido.pedido}</p>
      <FormPagoPedido pedido={pedido.pedido} />
    </div>
  </div>;
}