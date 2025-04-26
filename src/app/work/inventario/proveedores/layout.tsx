import { Tools } from "@/components/inventario/Tools";

const options = [
  { title: "Crear", icon: "pi pi-plus", url: "/work/inventario/proveedores" },
  { title: "Proveedores", icon: "pi pi-truck", url: "/work/inventario/proveedores/lista" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Tools options={options} />
      {children}
    </div>
  );
}

