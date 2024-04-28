import { NextResponse } from "next/server";
import { ROUTES, TOKEN } from "./helpers/Constants";
import { getBaseURl, verifyToken } from "./helpers/helperFunctions";

export async function middleware(request) {
  try {
    const token = request.cookies.get(TOKEN)?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const decodedToken = await verifyToken(token);

    if (!decodedToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const { id: userId } = decodedToken;

    const baseUrl = getBaseURl();
    const URL = `${baseUrl}${ROUTES.api.user.getUser}?id=${userId}`;

    const response = await fetch(URL);

    const msg = await response.json();

    if (msg && msg.message === "User found") {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", request.url));
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
