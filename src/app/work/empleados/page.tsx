import { TablaEmpleados } from "@/components/empleados/TablaEmpleados";
import { HeaderForm } from "@/components/shared/HeaderForm";

export default function PageListaEmpleados() {
  return (
    <div>
      <HeaderForm title="Colaboradores registrados" description={"Lista y gestión de colaboradores"} />
      <TablaEmpleados />
    </div>
  );
}
