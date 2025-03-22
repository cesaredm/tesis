"use client";
import { APIOptions, PrimeReactProvider } from "primereact/api";

export default function PrimeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value: Partial<APIOptions> = {
    inputStyle: "filled",
    ripple: true,
    //locale: "es",
  };

  return <PrimeReactProvider value={value}>{children}</PrimeReactProvider>;
}
