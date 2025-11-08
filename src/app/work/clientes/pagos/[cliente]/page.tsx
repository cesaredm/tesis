import { TablaPagosCliente } from "@/components/clientes/creditos/TablaPagosCliente";

interface Props {
  params: Promise<{
    cliente: string;
  }>;
}

export default async function PagosClientePage({ params }: Props) {
  const { cliente } = await params;

  return (
    <section>
      <TablaPagosCliente cliente={Number(cliente)} />
    </section>
  );
}
