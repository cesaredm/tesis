import { Divider } from "primereact/divider";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[100vh]">
      <section className="bg-surface-card shadow w-[95vw] md:w-1/2 lg:w-1/5 border border-surface-border p-3 rounded-xl">
        <header className="text-2xl text-center">
          <h4>Tienda Mega Hogar</h4>
          <small className="text-primary">Inicio de sesion</small>
        </header>
        <Divider />
        <section>
          <form action="">
            <div className="grid grid-cols-1 gap-2">
              <IconField>
                <InputIcon className="pi pi-user" />
                <InputText className="w-full" />
              </IconField>
              <IconField>
                <InputIcon className="pi pi-lock z-10" />
                <Password
                  className="w-full"
                  pt={{
                    input: { className: "w-full" },
                  }}
                />
              </IconField>
              <Link href={'/work'}>
                <Button label="Acceder" icon="pi pi-lock-open" className="w-full" />
              </Link>
            </div>
          </form>
        </section>
      </section>
    </div>
  );
}
