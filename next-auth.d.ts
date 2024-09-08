// // next-auth.d.ts
// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     jwt: string; // Extend the Session type to include 'jwt'
//     user: {
//       id: string;
//     };
//   }

//   interface JWT {
//     jwt: string; // Extend the JWT type to include 'jwt'
//     user: {
//       id: string;
//     };
//   }
// }
// next-auth.d.ts
import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    jwt: string;
    user: {
      id: string;
      token: string;
      // Add any other user properties you expect, like email, name, etc.
    };
  }

  interface User extends DefaultUser {}

  interface JWT {
    jwt: string;
    user: {
      id: string;
    };
  }
}
