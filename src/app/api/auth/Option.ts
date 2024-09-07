import Credentials from "next-auth/providers/credentials";
import connectDB from "../../../../config/db";
import User from "../../../../models/User";
import { verifyPassword } from "../../../../utils/bcrypt";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'johndoe@gmail.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        await connectDB();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await User.findOne({ 'credentials.email': credentials.email });
        if (!user) {
          throw new Error("No user found");
        }

        // Compare the provided password with the stored hashed password using bcryptjs
        const isPasswordValid = await bcrypt.compare(credentials.password, user.credentials.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // If the password is valid, return the user object
        return {
          id: user._id.toString(), // Ensure id is a string
          name: user.name,
          email: user.email,
        };
      }
    }),
  ],
  pages: {
    signIn: "/auth/login", // Adjust to your sign-in page path
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // Example: 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
