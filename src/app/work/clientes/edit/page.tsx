import { CrearCliente } from "@/components/clientes/CrearCliente";

export default function EditClientePage({ searchParams }: { searchParams: { cliente: string} }) {
  const { cliente } = searchParams;
  return (
    <div>
      <CrearCliente cliente={JSON.parse(cliente)} />
    </div>
  );
}
