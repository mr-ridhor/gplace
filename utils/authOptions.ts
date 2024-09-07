import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "./bcrypt";
import connectDB from "../config/db";
import User from "../models/User";
import { NextAuthOptions } from "next-auth";

interface UserType {
    _id: string;
    name: string;
    email: string;
    credentials: {
        email: string;
        password: string;
    };
}

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: 'email',
                    type: 'email'
                },
                password: {
                    label: 'password',
                    type: 'text'
                },
            },
            authorize: async (credentials, req) => {
                if (!credentials) {
                    return null;
                }

                const { email, password } = credentials;

                await connectDB();

                // Fetch the user by email
                const user = (await User.findOne({
                    "credentials.email": email,
                })) as UserType | null;
                if (!user) {
                    throw new Error("No user found");
                }

                // Compare the password with the stored hashed password
                const isPasswordValid = await verifyPassword(
                    password,
                    user.credentials.password
                );

                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                // Return the user object including the required jwt field
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email
                };
            },
        })
    ],
    pages: {
        signIn: "/auth/register",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // Example: 30 days
    },
    callbacks: {
        async jwt({ token, user }: { token: any; user?: any }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
            }
            return session;
        },
    }
};
