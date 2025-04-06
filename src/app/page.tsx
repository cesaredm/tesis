"use client";
import { Divider } from "primereact/divider";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { signIn } from "next-auth/react";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const [credenciales, setCredenciales] = useState<{ usuario: string; password: string }>({ usuario: "", password: "" });
  const [lazy, setLazy] = useState(false);
  const router = useRouter();
  const toast = useRef<Toast>(null);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLazy(true);
    const result = await signIn("credentials", {
      usuario: credenciales?.usuario,
      password: credenciales?.password,
      redirect: false,
    });
    setLazy(false);
    if (result?.error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Oops.. Credenciales incorrectas.",
        life: 3000,
      });
      return;
    }

    router.push("/work");
  }

  function onChangeCredenciales(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCredenciales({ ...credenciales, [name]: value });
  }

  return (
    <div className="flex items-center justify-center min-h-[100vh]">
      <Toast ref={toast} />
      <section className="bg-surface-card shadow w-[95vw] md:w-1/2 lg:w-1/5 border border-surface-border p-3 rounded-xl">
        <header className="text-2xl text-center">
          <h4>Tienda Mega Hogar</h4>
          <small className="text-primary">Inicio de sesion</small>
        </header>
        <Divider />
        <section>
          <form action="" onSubmit={handleSignIn}>
            <div className="grid grid-cols-1 gap-2">
              <IconField>
                <InputIcon className="pi pi-user" />
                <InputText className="w-full" name="usuario" onChange={onChangeCredenciales}  />
              </IconField>
              <IconField>
                <InputIcon className="pi pi-lock z-10" />
                <Password
                  className="w-full"
                  toggleMask={false}
                  feedback={false}
                  name="password"
                  onChange={onChangeCredenciales}
                  pt={{
                    input: { className: "w-full" },
                  }}
                />
              </IconField>
              <Button label="Acceder" icon={lazy ? "pi pi-spin pi-spinner" : "pi pi-lock-open"} className="w-full" disabled={lazy} />
            </div>
          </form>
        </section>
      </section>
    </div>
  );
}
