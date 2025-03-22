import { MenuNav } from "@/components/MenuNav";

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-ground">
      <MenuNav>{children}</MenuNav>
    </div>
  );
}
