// import axiosService from "@/lib/services/axiosService";
import axiosService from "@/lib/services/axiosService";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const Options: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        return axiosService
          .post(
            "/auth/login",
            {
              email: credentials?.email as string,
              password: credentials?.password as string,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "applocation/json",
              },
            }
          )
          .then(({ data }) => {
            return data;
          })
          .catch((error) => {
            throw new Error(error?.response?.data?.message);
          });
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account?.provider == "credentials") {
        return true;
      }
      return false;
    },
    jwt: async ({ token, user }: { token: any; user: any }) => {
      console.log(JSON.stringify(token), user);
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      if (token) {
        session.jwt = token.jwt;
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
