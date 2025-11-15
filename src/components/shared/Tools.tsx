"use client";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ToolsProps {
  title: string;
  icon: string;
  url: string;
}
export function Tools({ options }: { options: ToolsProps[] }) {
  const pathname = usePathname();
  const startToolbar = (
    <div className="flex align-items-center gap-1">
      {options.map((option, index) => (
        <Link key={index} href={option.url}>
          <Button label={option.title} icon={option.icon} size="small" text={pathname !== option.url ? true : false}  />
        </Link>
      ))}
    </div>
  );

  return <Toolbar start={startToolbar} className="mb-2" style={{ padding: "0.5rem" }} />;
}
