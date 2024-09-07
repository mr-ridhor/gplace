// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   function middleware(req) {
//     // Custom logic if needed
//   },
//   {
//     callbacks: {
//       authorized({ token, req }) {
//         const { pathname } = req.nextUrl;

//         // Corrected the condition to group it properly with parentheses
//         if (
//           pathname.startsWith("/auth/register") ||
//           pathname.startsWith("/auth/forgett-password")
//         ) {
//           return true;
//         }

//         // Standard authentication check
//         return !!token;
//       },
//     },
//     pages: {
//       signIn: "/auth/login", // Redirect to login if not authenticated
//       error: "/error", // Error page
//     },
//   }
// );
import { withAuth } from "next-auth/middleware";
export default withAuth(function middleware(req) {
  console.log("here", req.nextauth.token);
});
export const config = { matcher: ["/dashboard"] };
