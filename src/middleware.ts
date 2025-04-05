//export { auth as middleware } from "@/auth";
import { auth } from "@/auth";

/**
 * Middleware de autenticación para la aplicación
 * 
 * Este middleware controla el flujo de navegación basado en el estado de autenticación:
 * - Si el usuario no está autenticado y trata de acceder a cualquier ruta excepto "/",
 *   será redirigido a la página principal
 * - Si el usuario está autenticado y trata de acceder a "/",
 *   será redirigido a "/work"
 * 
 * @param {Request} req - Objeto de solicitud que contiene información de la petición
 * @returns {Response|undefined} Redirección si es necesaria, undefined si no
 */

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/") {
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
  if (req.auth && req.nextUrl.pathname === "/") {
    const newUrl = new URL("/work", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/work/:path*", "/"],
};

