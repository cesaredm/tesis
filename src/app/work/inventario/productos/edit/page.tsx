import { Form } from "@/components/inventario/productos/Form";

export default async function EditPage({ searchParams }: { searchParams: { producto: string } }) {
  const producto: { producto: string } = await searchParams;

  return (
    <div>
      <div className="w-full lg:w-2/4 mx-auto">
        <Form producto={JSON.parse(producto.producto)} />
      </div>
    </div>
  );
}
