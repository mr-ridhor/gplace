// import { withAuth } from "next-auth/middleware";
export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/dashboard']
}

// this is causing the login not to work 

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
//           pathname.startsWith("/auth/forget-password")
//         ) {
//           return true;
//         }

//         // Standard authentication check
//         return !!token;
//       },
//     },
//     pages: {
//       signIn: "/auth/login", // Redirect to login if not authenticated
//       // error: "/error", // Error page
//     },
//   }
// );

// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   function middleware(req) {
//     // Custom logic if needed, currently not used
//   },
//   {
//     callbacks: {
//       authorized({ token, req }) {
//         const { pathname } = req.nextUrl;

//         // Public routes accessible without authentication
//         if (
//           pathname.startsWith("/auth/register") ||
//           pathname.startsWith("/auth/forget-password")
//         ) {
//           return true; // Allow access to these routes without authentication
//         }

//         // If the user is authenticated (token exists), allow access
//         if (token) {
//           return true;
//         }

//         // If none of the above, block access (redirect to login)
//         return false;
//       },
//     },
//     pages: {
//       signIn: "/auth/login", // Redirect unauthenticated users to login
//       error: "/error", // Error page in case of authentication issues
//     },
//   }
// );

// // Define route matcher for the middleware
// export const config = {
//   matcher: [
//     "/dashboard", // Protect /dashboard and other routes as needed
//     "/((?!auth).*)", // Catch-all matcher for all routes except auth (register, forget-password, etc.)
//   ],
// };
