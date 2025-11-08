import { TablaCreditos } from "@/components/clientes/creditos/TablaCreditos";

interface Props {
  params: Promise<{
    idcliente: string;
  }>;
}

export default async function CreditosClientePage({ params }: Props) {
  const { idcliente } = await params;

  return (
    <section>
      <TablaCreditos cliente={Number(idcliente)} />
    </section>
  );
}
