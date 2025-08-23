import { Tools } from "@/components/shared/Tools";

const items = [
  { title: "Crear", icon: "pi pi-plus", url: "/work/clientes" },
  { title: "Clientes", icon: "pi pi-table", url: "/work/clientes/lista" },
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
