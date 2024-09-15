import Credentials from "next-auth/providers/credentials";
import connectDB from "../config/db";
import User, { IUser } from "../models/User"; // Adjust the path according to your folder structure
import { NextAuthOptions } from "next-auth";
// import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

interface IUserResponse {
  id: any; // Ensure mongoose Types are imported if needed
  email: string;
  firstName: string;
  lastName: string;
}
// Function to verify the password using crypto
const verifyPassword = (
  password: string,
  storedHash: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const [salt, hash] = storedHash.split(":");
    crypto.pbkdf2(
      password,
      salt,
      1000, // Number of iterations
      64, // Key length
      "sha512", // Digest algorithm
      (err, derivedKey) => {
        if (err) return reject(err);
        resolve(hash === derivedKey.toString("hex"));
      }
    );
  });
};

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
      },
      authorize: async (credentials) => {
        await connectDB();
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        const user: IUser | any = await User.findOne({
          "credentials.email": email,
        });
        console.log("user", user);
        if (!user) {
          throw Error("User not found");
          return null;
        }

        const hashedPassword = user.credentials.password;
        // const isPasswordValid = bcrypt.compare(hashedPassword, password);
        const isPasswordValid = await verifyPassword(password, hashedPassword);

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
        // console.log(response);
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
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // Example: 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      // console.log("token", token);
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // console.log(token);
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },
};
