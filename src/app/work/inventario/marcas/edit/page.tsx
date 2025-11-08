import { FormularioMarca } from "@/components/inventario/marcas/FormularioMarca";

interface Props {
  searchParams: Promise<{ marca: string }>;
}

export default async function Edit({ searchParams }: Props) {
  const marca: { marca: string } = await searchParams;
  return (
    <div>
      <div className="w-full lg:w-2/4 mx-auto">
        <FormularioMarca marca={JSON.parse(marca.marca)} />
      </div>
    </div>
  );
}
