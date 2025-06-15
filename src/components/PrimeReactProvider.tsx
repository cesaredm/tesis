"use client";
import { addLocale, APIOptions, PrimeReactProvider } from "primereact/api";
import { es } from "@/utils/esLocale";

export default function PrimeProvider({
                                        children,
                                      }: {
  children: React.ReactNode;
}) {
  addLocale("es", es);
  const value: Partial<APIOptions> = {
    inputStyle: "filled",
    ripple: true,
    locale: "es",
  };

  return <PrimeReactProvider value={value}>{children}</PrimeReactProvider>;
}
