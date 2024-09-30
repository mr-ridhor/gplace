import Credentials from "next-auth/providers/credentials";
import connectDB from "../config/db";
import User, { IUser } from "../models/User"; // Adjust the path according to your folder structure
import { NextAuthOptions } from "next-auth";
// import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface IUserResponse {
  id: any; // Ensure mongoose Types are imported if needed
  email: string;
  firstName: string;
  lastName: string;
  maxAge: number
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
        remember: {
          label: "remember",
          type: "checkbox",
        }
      },
      authorize: async (credentials) => {
        await connectDB();
        if (!credentials) {
          return null;
        }

        const { email, password, remember } = credentials;

        const user: IUser | any = await User.findOne({
          "credentials.email": email,
        });
        // console.log("user", user);
        if (!user) {
          throw Error("User not found");
          return null;
        }

        const hashedPassword = user.credentials.password;
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordValid) {
          throw Error("Invalid Password");
          return null;
        }
        const response: IUserResponse = {
          id: user._id, // Use type assertion here
          email: user.credentials.email,
          firstName: user.bio.firstName,
          lastName: user.bio.lastName,
          maxAge: remember ? 30 * 24 * 60 * 60 : 60 * 1
        };
        console.log(response)
        return response;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token["maxAge"] = user.maxAge;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.maxAge = token["maxAge"] as number;
        session.expires = new Date(Date.now() + session.maxAge * 1000).toISOString(); 
      }
      return session;
    },
  },
};
