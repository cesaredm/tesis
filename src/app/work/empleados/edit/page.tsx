import { CrearEmpleado } from "@/components/empleados/CrearEmpleado";

export default async function EditClientePage({ searchParams }: { searchParams: Promise<{ empleado: string }> }) {
  const { empleado } = await searchParams;
  return (
    <div>
      <CrearEmpleado empleado={JSON.parse(empleado)} />
    </div>
  );
}
