import { TablaCreditos } from "@/components/clientes/creditos/TablaCreditos";

export default async function CreditosClientePage({ params }: { params: { idcliente: string } }) {
  const { idcliente } = await params;

  return (
    <section>
      <TablaCreditos cliente={Number(idcliente)} />
    </section>
  );
}
