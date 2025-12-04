'use client'
import { permisos } from "@/utils/permisos";
import { useSession } from "next-auth/react";

export function Principal({ children }: { children: React.ReactNode }) {
    const {data: session} = useSession();

    if(session?.user.permiso == permisos.ADMIN) return <div>{children}</div>;

    return <div>No tienes permiso para ver este contenido</div>;
}