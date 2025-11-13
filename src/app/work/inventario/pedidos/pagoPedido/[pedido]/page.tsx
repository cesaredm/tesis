import { TablaPagosPedidos } from "@/components/inventario/pedidos/TablaPagosPedidos";

interface Props {
  params: Promise<{
    pedido: string;
  }>;
}
export default async function PagePagosCredito({ params }: Props) {
  const { pedido } = await params;

  return (
    <div>
      <div className={"w-full md:w-1/2 mx-auto"}>
        <h1 className="text-2xl font-bold">Lista de pagos del pedidos #{pedido}</h1>
        <TablaPagosPedidos pedido={pedido} />
      </div>
    </div>
  );
}
