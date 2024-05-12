import { dbConnect } from "@/db/connect";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import Users from "@/models/userModel";

const authOptions = {
  pages: {
    signIn: "/signin",
    signOut: "/",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { username, password } = credentials;

        await dbConnect();
        const user = await Users.findOne({ username: username });

        if (!user) {
          throw new Error("User not found.");
        }

        const isPasswordMatch = await bcrypt.compare(password, user?.password);

        if (!isPasswordMatch) {
          throw new Error("Wrong password.");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.fullName = user.fullName;
        token.avatarUrl = user.avatarUrl;
        token.id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.fullName = token.fullName;
        session.user.avatarUrl = token.avatarUrl;
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
