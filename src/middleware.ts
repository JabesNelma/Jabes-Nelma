import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Allow all public assets and API routes
        if (
          pathname.startsWith("/_next") ||
          pathname.startsWith("/api/auth") ||
          pathname.includes(".") || // static files
          pathname === "/login"
        ) {
          return true
        }
        
        // Protect admin routes
        if (pathname.startsWith("/admin")) {
          return token?.role === "admin"
        }
        
        // Allow all other routes
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public|logo.svg).*)"],
}
