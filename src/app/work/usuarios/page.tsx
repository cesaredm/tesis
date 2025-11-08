import { HeaderForm } from "@/components/shared/HeaderForm";
import { TablaUsuarios } from "@/components/usuarios/TablaUsuarios";

export default function UsuariosPage() {
  return (
    <div>
        <HeaderForm title="Usuarios registrados" description={"Lista y gestión de usuarios"} />
      <TablaUsuarios />
    </div>
  );
}
