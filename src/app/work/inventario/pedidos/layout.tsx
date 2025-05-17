import { Tools } from "@/components/inventario/Tools";

const options = [
  {
    title: "Crear",
    icon: "pi pi-plus",
    url: "/work/inventario/pedidos",
  },
  {
    title: "Pedidos",
    icon: "pi pi-file",
    url: "/work/inventario/pedidos/lista",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Tools options={options} />
      {children}
    </div>
  );
}
