"use client";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { useRef } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function AvatarUser() {
  const menuRef = useRef<Menu>(null);
  const {data} = useSession()

  const model = [
    {
      label: "Perfil",
      icon: "pi pi-user",
    },
    {
      label: "Cerrar sesion",
      icon: "pi pi-sign-out",
      command: () => {
        signOut();
      },
    },
  ];

  useEffect(()=>{console.log(data)},[])

  return (
    <div>
      <Avatar
        label={data?.user?.usuario?.toUpperCase().slice(0,2) || "CE"}
        //image="https://avatars.githubusercontent.com/u/54245599?v=4&size=64"
        onClick={(e) => menuRef.current?.toggle(e)}
        aria-controls="popup_menu_left"
        aria-haspopup
        shape="square"
        size="normal"
      />
      <Menu model={model} popup ref={menuRef} id="popup_menu_left" />
    </div>
  );
}

