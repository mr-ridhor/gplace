import Credentials from "next-auth/providers/credentials";
import connectDB from "../config/db";
import User, { IUser } from "../models/User"; // Adjust the path according to your folder structure
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";

interface IUserResponse {
  id: any; // Ensure mongoose Types are imported if needed
  email: string;
  firstName: string;
  lastName: string;
}

let rememberMe: boolean = false

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

        if(remember === 'true') {
          rememberMe = true
        }

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
        };
        return response;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Set your JWT secret
    maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        // token.rememberMe = user.remember;
      }
      console.log(token)
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;

        // const expires : string = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
        // if(token.rememberMe === true) session.expires = expires

      }
      console.log(session)
      return session;
    },
  },
};
