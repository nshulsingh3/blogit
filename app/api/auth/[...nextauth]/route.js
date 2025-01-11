import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: {
    strategy: "jwt", // This stores the session on the JWT
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // When a user logs in for the first time
      if (user && account && profile) {
        // Save GitHub username to the database if not already present
        await prisma.user.update({
          where: { id: user.id },
          data: { username: profile.login },
        });
        token.image = user.image || profile?.avatar_url;
        // Add GitHub username to the JWT token
        token.username = profile.login;
      }

      return token;
    },
    async session({ session, token }) {
      // Attach additional properties to the session object
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.image;
      session.user.username = token.username; // Include GitHub username
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
