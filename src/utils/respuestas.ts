export function respuesta(datos: any = {}) {
  return {
    ...datos,
    status: "ok",
    severity: "success",
    summary: "Exito.",
    detail: "Operacion realizada con exito.",
  };
}

export function respuestaError(datos: any={}) {
  return {
    ...datos,
    status: "error",
    severity: "error",
    summary: "Error.",
    detail: "Oops. Ocurrio un error al intentar realizar la operacion.",
  };
}

export const status = {
  OK: "ok",
  ERROR: "error",
};
