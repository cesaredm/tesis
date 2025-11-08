import { CrearCliente } from "@/components/clientes/CrearCliente";

interface Props{
  searchParams: Promise<{cliente: string}>
}

export default async function EditClientePage({ searchParams }: Props) {
  const { cliente } = await searchParams;
  return (
    <div>
      <CrearCliente cliente={JSON.parse(cliente)} />
    </div>
  );
}
