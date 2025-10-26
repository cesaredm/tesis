import { ItemOptionLayout } from "@/components/reportes/ItemOptionLayout";

export default function LayoutReportes({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <nav className="flex border-b border-surface-border p-2">
        <ItemOptionLayout />
      </nav>
      <section>{children}</section>
    </div>
  );
}
