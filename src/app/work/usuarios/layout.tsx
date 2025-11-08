import { Tools } from "@/components/shared/Tools";

const items = [
  { title: "Usuarios", icon: "pi pi-table", url: "/work/usuarios" },
  { title: "Crear Usuario", icon: "pi pi-plus", url: "/work/usuarios/crear" },
];

export default function LayoutCliente({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <Tools options={items} />
      </header>
      {children}
    </div>
  );
}
