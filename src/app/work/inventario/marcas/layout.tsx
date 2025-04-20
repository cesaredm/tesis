import { Tools } from "@/components/inventario/Tools";

const items = [
  { title: "Crear", icon: "pi pi-plus", url: "/work/inventario/marcas" },
  { title: "Marcas", icon: "pi pi-table", url: "/work/inventario/marcas/lista" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <Tools options={items} />
      </header>
      {children}
    </div>
  );
}
