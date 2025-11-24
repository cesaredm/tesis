"use client";
import React, { useEffect, useState, useImperativeHandle, useRef } from "react";
import dynamic from "next/dynamic";
import { format } from "@formkit/tempo";
import { formatDecimal } from "@/utils/helpers";
import { useFacturaStore } from "@/store/factura.store";
import { CSS } from "./estiloCssTicket";
import { DetalleSave } from "@/domain/entities/Facturas";

const perfilTienda = {
  logo: "/logo.ico",
  nombre: "Tienda Mega Hogar",
  telefono: "277-4512",
  direccion: "B. El cafetal, del mercado municipal 1/2 cuando al este",
  nota: "Gracias por su compra.",
};

const TicketFactura = dynamic(
  () =>
    Promise.resolve(
      React.forwardRef((props, ref) => {
        const { factura, detalles, totales, limpiarTodo, respuestaFactura, cliente, aval } = useFacturaStore((state) => state);
        const logoRef = useRef<HTMLImageElement>(null);
        const ticketRef = useRef(null);
        const [isLogoLoaded, setIsLogoLoaded] = useState(false);
        const [isMobile, setIsMobile] = useState<boolean>();

        useImperativeHandle(ref, () => ({
          print,
        }));

        useEffect(() => {
          const userAgent = navigator.userAgent;
          /** daber si estamos accediendo desde un mobile */
          const isMobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
          setIsMobile(isMobile);

          //serve como mensajero para saber si ya se cargo la imagen
          const handleLoad = () => {
            setIsLogoLoaded(true);
            console.log("Imagen cargada y lista para impresión");
          };

          if (logoRef.current) {
            //verificamos que se halla completado la carga de la imagen
            if (logoRef.current.complete) {
              handleLoad();
            } else {
              //logoRef.current.addEventListener('load', handleLoad);
              logoRef.current.onload = handleLoad;
            }
          }

          return () => {
            if (logoRef.current) {
              logoRef.current.removeEventListener("load", handleLoad);
            }
          };
        }, []);

        async function print() {
          if (isLogoLoaded) {
            const printJS = (await import("print-js")).default;
            /** si es mobile esperaremos 1s para proceder a al impresion para esperar que se cargue el logo */
            setTimeout(() => {
              printJS({
                printable: ticketRef.current, // Elemento a imprimir
                type: "html", // Tipo de contenido
                style: CSS, // Estilos CSS
                onLoadingEnd() {
                  // Lógica después de cargar el pdf o Informacion a la factura
                  limpiarTodo();
                },
              });
            }, 1000);
          }
        }

        /**
         * Valida si el item tiene un descuento y calcula el valor del descuento.
         * @param {Object} item - Item a validar.
         * @returns {Object} - Un objeto con dos propiedades, isDescuento y descuento.
         *                    isDescuento es un booleano que indica si tiene descuento.
         *                    descuento es el valor del descuento.
         */
        function validarDescuento(item: DetalleSave) {
          const precioVenta = Number(item.precioVenta);
          const precioOriginal = Number(item.precioOriginal);
          const isDescuento = precioVenta >= precioOriginal ? false : true;
          const descuento = Number(item.precioOriginal) - Number(item.precioVenta);

          return {
            isDescuento,
            descuento,
          };
        }

        return (
          <div
            ref={ticketRef}
            style={{
              fontFamily: "Arial, sans-serif",
              zIndex: "-10",
              position: "absolute",
              width: isMobile ? "58mm" : "75mm",
              visibility: "hidden",
            }}
            className="ticket"
          >
            {/** logo */}
            <div className="centered" style={{ display: "grid", placeItems: "center" }}>
              <img src={perfilTienda.logo} alt="" style={{ width: "40mm", margin: "auto" }} ref={logoRef} />
            </div>
            {perfilTienda?.nombre === "" ? "" : <h6 className="texto-centrado">{perfilTienda?.nombre}</h6>}
            <strong>Dirección :</strong> {perfilTienda?.direccion}
            <br />
            <strong>Teléfono :</strong> {perfilTienda?.telefono}
            <br />
            <strong>Fecha :</strong> {format({ date: respuestaFactura.fecha, format: "DD-MM-YYYY hh:mm:ss a", tz: "America/Managua" })}
            <br />
            <strong>Tipo venta:</strong> {factura.cliente ? "Credito" : "Efectivo"}
            <br />
            {factura.cliente && (
              <>
                <strong>Cliente :</strong> {cliente} <br />{" "}
                <strong>Aval :</strong> {aval} <br />{" "}
              </>
            )}
            <strong>Atendido por :</strong> Cajero #{respuestaFactura.empleado}
            <br />
            <strong>Factura Nº :</strong> {respuestaFactura.numeroCorrelativo}
            <br />
            <strong>Comprador :</strong> {factura.comprador}
            <br />
            {/* tabla de detalles */}
            <table style={{ width: isMobile ? "58mm" : "75mm" }}>
              <thead>
                <tr>
                  <th className="quantity both_border" style={{ width: "15mm" }}>
                    Cant.
                  </th>
                  <th className="price both_border" style={{ width: isMobile ? "18mm" : "20mm" }}>
                    Precio
                  </th>
                  <th className="importe both_border" style={{ width: isMobile ? "25mm" : "40mm" }}>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from(detalles.values()).map((item: DetalleSave) => {
                  const { isDescuento, descuento } = validarDescuento(item);
                  return (
                    <React.Fragment key={item.id}>
                      <tr>
                        <td className="description" colSpan={3} style={{ width: "80mm" }}>
                          {item.descripcion}
                        </td>
                      </tr>
                      <tr>
                        <td className={`quantity ${!isDescuento ? "border-item" : ""}`} style={{ width: "15mm" }}>
                          {item.cantidad}
                        </td>
                        <td className={`price ${!isDescuento ? "border-item" : ""}`} style={{ width: isMobile ? "18mm" : "25mm" }}>
                          {item.precioVenta}
                        </td>
                        <td className={`importe ${!isDescuento ? "border-item" : ""}`} style={{ width: isMobile ? "25mm" : "40mm" }}>
                          L. {formatDecimal(item.importe)}
                        </td>
                      </tr>
                      {isDescuento ? (
                        <tr>
                          <td className="quantity border-item" style={{ textAlign: "right", width: "15mm" }}>
                            Desc.
                          </td>
                          <td className="price border-item" style={{ width: isMobile ? "18mm" : "25mm" }}>
                            {formatDecimal(descuento)}
                          </td>
                          <td className="importe border-item" style={{ width: isMobile ? "25mm" : "40mm" }}>
                            {formatDecimal(item.precioOriginal)}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}
                    </React.Fragment>
                  );
                })}

                <tr>
                  <th className="border-doble-top" colSpan={3}></th>
                </tr>

                {totales.descuento > 0 && (
                  <tr>
                    <th className="price totales" style={{ paddingLeft: "0", width: "22mm" }} colSpan={1} rowSpan={1}>
                      Sub
                    </th>
                    <th className="price totales" colSpan={2}>
                      L. {totales.subtotal}
                    </th>
                  </tr>
                )}

                {totales.descuento > 0 && (
                  <tr>
                    <th className="price totales" colSpan={1} rowSpan={1}>
                      Desc
                    </th>
                    <th className="price totales" colSpan={2}>
                      L. {totales.descuento}
                    </th>
                  </tr>
                )}
                <tr>
                  <th className="price totales" colSpan={1} rowSpan={1}>
                    Total
                  </th>
                  <th className="price totales" colSpan={2}>
                    L. {formatDecimal(totales.total)}
                  </th>
                </tr>
                <tr>
                  <th className="border-doble-bottom" colSpan={3}></th>
                </tr>
              </tbody>
            </table>
            <div className="texto-centrado">
              {perfilTienda?.nota}
              <br />
            </div>
            <br />
          </div>
        );
      })
    ),
  { ssr: false }
);

TicketFactura.displayName = "TicketFactura";
export default TicketFactura;
