import { MenuNav } from "@/components/navegacion/MenuNav";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { SessionProvider } from "next-auth/react";

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-ground">
      <SessionProvider>
        <ReactQueryProvider>
          <MenuNav>{children}</MenuNav>
        </ReactQueryProvider>
      </SessionProvider>
    </div>
  );
}
