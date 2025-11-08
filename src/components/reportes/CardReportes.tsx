"use client";

import Image from "next/image";

export function CardReportes({ title, monto, imageSrc }: { title: string; monto: number | string; imageSrc: string }) {
  return (
    <div className="flex border border-primary/40 h-[4rem] rounded-2xl hover:bg-primary/20 hover:cursor-pointer">
      <div className="w-1/12 flex justify-center items-center h-full bg-primary/10 rounded-l-2xl">
        <Image src={imageSrc} alt="icono de factura" width={32} height={32} />
      </div>
      <div className="flex justify-between w-11/12 items-center px-2">
        <div>
          <span className="text-lg">{title}</span>
        </div>
        <div>
          <p className="text-2xl font-semibold">L. {monto}</p>
        </div>
      </div>
    </div>
  );
}
