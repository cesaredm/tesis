import { Principal } from "@/components/shared/principal";
import { Tools } from "@/components/shared/Tools";

const items = [
  { title: "Colaboradores", icon: "pi pi-table", url: "/work/empleados" },
  { title: "Crear Colaborador", icon: "pi pi-plus", url: "/work/empleados/crear" },
];

export default function LayoutEmpleados({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <Tools options={items} />
      </header>
      <Principal>{children}</Principal>
    </div>
  );
}
