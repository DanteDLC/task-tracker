import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/db";
import { User } from "./models/User";
import { connectToDatabase } from "./lib/mongoose";
import GoogleProvider from "next-auth/providers/google";
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        await connectToDatabase();
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        let email = credentials.email as string;
        const user = await User.findOne({
          email: email.toLowerCase(),
        });

        if (!user) {
          throw new Error("User not found. Please register first.");
        }

        const isMatch = bcrypt.compareSync(
          credentials.password as string,
          user.hashedPassword as string,
        );
        if (!isMatch) throw new Error("Invalid password");

        return {
          _id: user._id, // Add user ID
          email: user.email, // Ensure email is returned
          role: user.role, // Include role
        };
      },
    }),
    GoogleProvider({
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session, token }) {
      await connectToDatabase();
      // const user = await User.findOne({ email: token.email });
      return {
        ...token,
        customField: "customData",
        expires: session.expires,
      };
    },
    async jwt({ session, token }) {
      await connectToDatabase();
      // const user = await User.findOne({ email: token.email });
      return {
        ...token,
        customField: "customData",
      };
    },
  },
});
