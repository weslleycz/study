import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/_not-found", "/chat", "/courses", "/auth","/perfil/:page*"],
};

export async function middleware(req: NextRequest, res: NextApiResponse) {
  const token = req.cookies.get("token") as unknown as any;
  if (token) {
    if (req.nextUrl.pathname === "/auth") {
      return NextResponse.rewrite(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  } else {
    return NextResponse.rewrite(new URL("/auth", req.url));
  }
}
