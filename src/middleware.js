import { NextResponse } from "next/server";
import { ROUTES, TOKEN } from "./helpers/Constants";

const apiRoutes = [ROUTES.api.notes, ROUTES.api.todos];

export async function middleware(request) {
  try {
    const token = request.cookies.get(TOKEN)?.value;

    if (!token) {
      if (apiRoutes.some((route) => route === request.nextUrl.pathname)) {
        return NextResponse.json({ error: "No token provided" });
      } else {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}

export const config = {
  matcher: [
    "/api/todos",
    "/api/notes",
    "/calculator",
    "/profile",
    "/todos",
    "/notes",
  ],
};
