import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const [users] = (await db.query("SELECT * FROM users WHERE email = ?", [
          credentials.email,
        ])) as any[];
        const user = users[0];

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!passwordMatch) return null;

        return { id: user.id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" as "jwt" },
  pages: {
    signIn: "/login",
  },
};
