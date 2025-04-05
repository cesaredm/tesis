import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        usuario: { type: "text", label: "Usuario" },
        password: { type: "password", label: "Contraseña" },
      },
      async authorize(credentials): Promise<any> {
        try {
          const { data } = await axios.post("http://localhost:3000/api/usuarios", {
            usuario: credentials?.usuario,
            password: credentials?.password,
          });

          if (data.usuario) {
            return data.usuario;
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 64800,
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    jwt: async ({ token, user }) => {
      if (user) token.user = user;
      return token;
    },
    session: async ({ session, token }) => {
      //@ts-ignore
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  trustHost: true,
});
