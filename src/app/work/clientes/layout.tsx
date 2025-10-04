import { Tools } from "@/components/shared/Tools";

const items = [
  { title: "Clientes", icon: "pi pi-table", url: "/work/clientes" },
  { title: "Crear", icon: "pi pi-plus", url: "/work/clientes/crear" },
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
