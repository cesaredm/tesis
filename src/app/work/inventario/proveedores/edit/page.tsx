import { Form } from "@/components/inventario/proveedores/Form";
interface Props {
  searchParams: Promise<{ proveedor: string }>;
}
export default async function EditProveedor({ searchParams }: Props) {
  const proveedor: { proveedor: string } = await searchParams;
  return (
    <div className="mx-auto w-full lg:w-1/2 flex flex-col gap-4">
      <Form proveedor={JSON.parse(proveedor.proveedor)} />
    </div>
  );
}
