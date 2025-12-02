import { Tools } from "@/components/shared/Tools";

const options = [
  { title: "Crear", icon: "pi pi-plus", url: "/work/inventario/productos" },
  { title: "Productos Activos", icon: "pi pi-box", url: "/work/inventario/productos/lista" },
  { title: "Todos los Productos", icon: "pi pi-box", url: "/work/inventario/productos/fullProductos" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Tools options={options} />
      {children}
    </div>
  );
}
