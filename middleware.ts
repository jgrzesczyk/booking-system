import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: any) {
    const isSuperAdminPath = !!req.nextUrl.pathname.match("/admin/users");

    if (req.nextauth.token?.user?.role !== "SuperUser" && isSuperAdminPath) {
      const url = new URL(`/admin/reservations`, req.url);
      return NextResponse.redirect(url);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/admin/((?!api|login).*)"],
};
