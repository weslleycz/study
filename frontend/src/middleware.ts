import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "react-jwt";

export const config = {
  matcher: [
    "/_not-found",
    "/chat",
    "/courses",
    "/auth",
    "/perfil/:page*",
    "/dashboard/:page*",
  ],
};

export async function middleware(req: NextRequest, res: NextApiResponse) {
  const token = req.cookies.get("token") as unknown as any;
  if (token) {
    const role = decodeToken(token.value) as any;
    console.log(role?.permissions);
    if (req.nextUrl.pathname === "/dashboard") {
      if (role?.permissions === "Teacher") {
        return NextResponse.next();
      } else {
        return NextResponse.rewrite(new URL("/", req.url));
      }
    }

    if (req.nextUrl.pathname === "/auth") {
      return NextResponse.rewrite(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  } else {
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.rewrite(url);
  }
}
