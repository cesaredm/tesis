import { Form } from "@/components/inventario/productos/Form";
interface Props {
  searchParams: Promise<{ producto: string }>;
}
export default async function EditPage({ searchParams }: Props) {
  const producto: { producto: string } = await searchParams;

  return (
    <div>
      <div className="w-full lg:w-2/4 mx-auto">
        <Form producto={JSON.parse(producto.producto)} />
      </div>
    </div>
  );
}
