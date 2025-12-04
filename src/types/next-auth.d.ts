// Asumo que tu tipo UserSession se parece a esto:
export interface UserSession {
  usuario: string;
  empleado: number;
  permiso: string;
  id?: string;
  // ... cualquier otra propiedad que asignas desde el token
}

// 1. Aumentación del token JWT
declare module "next-auth/jwt" {
  interface JWT {
    user: UserSession; // <- Esto le dice a TS qué contiene token.user
  }
}

// 2. Aumentación del objeto Session (lo que retorna useSession)
declare module "next-auth" {
  interface Session {
    user: UserSession & DefaultSession["user"]; // <- Esto le dice a TS qué contiene session.user
  }

  // 3. Opcional: Aumentar el objeto User (para el adapter)
  // interface User extends UserSession {}
}
