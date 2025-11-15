import { HeaderForm } from "@/components/shared/HeaderForm";
import { Form } from "@/components/transacciones/Form";

export default function CrearTransaccionPage() {
  return (
    <div className="w-full lg:w-1/2 mx-auto">
      <HeaderForm title="Crear Transaccion" description="Ingrese los datos de la transaccion" />
        <Form />
    </div>
  );
}
