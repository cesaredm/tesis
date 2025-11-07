import { TablaPagosCliente } from "@/components/clientes/creditos/TablaPagosCliente";

export default async function PagosClientePage({ params }: { params: { cliente: string } }) {
  const { cliente } = await params;

  return (
    <section>
      <TablaPagosCliente cliente={Number(cliente)} />
    </section>
  );
}
