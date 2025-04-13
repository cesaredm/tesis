import { HeaderLayout } from "@/components/inventario/HeaderLayout";
export default function LayoutInventario({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <HeaderLayout />
      </header>
      <section>{children}</section>
    </div>
  );
}
