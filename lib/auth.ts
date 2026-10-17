import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyCustomer } from "@/lib/customers";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      id: "email-login",
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const customer = await verifyCustomer(
          credentials?.email ?? "",
          credentials?.password ?? ""
        );
        if (!customer) return null;
        return {
          id: `customer-${customer.id}`,
          name: customer.name,
          email: customer.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
