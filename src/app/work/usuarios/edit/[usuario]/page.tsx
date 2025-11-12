import { FormUsuario } from "@/components/usuarios/FormUsuario";

interface Props {
  params: Promise<{ usuario: string }>;
}
export default async function EditUsuarioPage({ params }: Props) {
  const { usuario } = await params;

  return (
    <div>
      <div className="w-full lg:w-1/2 mx-auto">
        <FormUsuario usuario={usuario} />
      </div>
    </div>
  );
}
