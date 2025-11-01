import { TablaCreditos } from "@/components/clientes/creditos/TablaCreditos";
import { Credito } from "@/domain/entities/Creditos";
import { Suspense } from "react";
import { Spinner } from "@/components/shared/Spinner";

export default async function CreditosClientePage({ params }: { params: { idcliente: string } }) {
  const { idcliente } = await params;

  return (
    <section>
      <TablaCreditos cliente={Number(idcliente)} />
    </section>
  );
}
