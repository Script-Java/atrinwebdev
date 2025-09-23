import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // <-- changed from "@/lib/auth/options"

export default NextAuth(authOptions);
