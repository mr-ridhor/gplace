import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const {
      nextUrl: { pathname },
      nextauth: { token },
    } = req;

    if (pathname.startsWith("/auth") && token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const {
          nextUrl: { pathname },
        } = req;

        if (["/profile", "/dashboard"].includes(pathname) && !token) {
          return false;
        } else if (["/"].includes(pathname)) {
          return false;
        } else {
          return true;
        }

        // return (!token && pathname.startsWith("/auth")) || !!token;
      },
    },
  }
);

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };
