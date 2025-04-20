import { Tools } from "@/components/inventario/Tools";

const options = [
  { title: "Crear", icon: "pi pi-plus", url: "/work/inventario/productos" },
  { title: "Productos", icon: "pi pi-box", url: "/work/inventario/productos/lista" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Tools options={options} />
      {children}
    </div>
  );
}
