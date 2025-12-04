import { CrearCliente } from "@/components/clientes/CrearCliente";
import { Principal } from "@/components/shared/principal";

export default function CrearClientePage() {
  return (
    <div>
      <Principal children={<CrearCliente />} />
    </div>
  );
}
