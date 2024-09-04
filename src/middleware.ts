import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Custom logic if needed
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl;
        if (pathname.startsWith("/auth/register")) return true;

        // Standard authentication check
        return !!token;
      },
    },
    pages: {
      signIn: "/auth/login", // Redirect to login if not authenticated
      error: "/error", // Error page
    },
  }
);
