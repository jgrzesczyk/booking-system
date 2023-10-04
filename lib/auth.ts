import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        login: {
          label: "Login",
          type: "text",
        },
        password: { label: "Hasło", type: "password" },
      },
      async authorize(credentials) {
        const userCredentials = {
          login: credentials?.login,
          password: credentials?.password,
        };

        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/admin/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(userCredentials),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const user = await res.json();
        return res.ok && user ? user : null;
      },
    }),
  ],

  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },

  pages: {
    signIn: "http://localhost:3000/admin/login",
    signOut: "http://localhost:3000/admin/login",
    error: "http://localhost:3000/admin/login",
  },

  callbacks: {
    async session({ session, user }: { session: Session; user: any }) {
      if (user !== null) {
        session.user = user;
      }
      return session;
    },

    async jwt({ token }: { token: JWT }) {
      return token;
    },
  },
};
