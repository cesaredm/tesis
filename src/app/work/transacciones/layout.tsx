import { Tools } from "@/components/shared/Tools";

const items = [
  { title: "Crear transacción", icon: "pi pi-plus", url: "/work/transacciones" },
  { title: "Transacciones", icon: "pi pi-table", url: "/work/transacciones/listar" },
];

export default function LayoutTransacciones({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <Tools options={items} />
      </header>
      {children}
    </div>
  );
}
