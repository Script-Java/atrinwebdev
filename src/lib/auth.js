import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const sql = neon(process.env.DATABASE_URL);

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        const email = (creds?.email || "").trim().toLowerCase();
        const password = creds?.password || "";
        if (!email || !password) return null;

        // NOTE: force a lowercase alias so key name is predictable
        const rows = await sql`
          SELECT id, email, name, role, "passwordHash" AS passwordhash
          FROM "User"
          WHERE lower(email) = ${email}
          LIMIT 1
        `;
        const user = rows[0];
        if (!user || !user.passwordhash) {
          // console.debug("No user or missing passwordhash", { hasUser: !!user });
          return null;
        }

        const ok = await bcrypt.compare(password, user.passwordhash);
        if (!ok) return null;

        return { id: user.id, email: user.email, name: user.name ?? null, role: user.role };
      },
    }),
  ],
  pages: { signIn: "/signin" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role;
      return session;
    },
  },
  debug: process.env.NODE_ENV !== "production",
};
