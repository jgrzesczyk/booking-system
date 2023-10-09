import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

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
    async session(params: { session: Session; token: JWT; user: AdapterUser }) {
      params.session.user = params.token.user as AdapterUser;
      return params.session;
    },
    async jwt(params: { token: JWT; user: User | AdapterUser }) {
      if (params.user) params.token.user = params.user;
      return params.token;
    },
  },
};
