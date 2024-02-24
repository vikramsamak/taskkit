import { NextResponse } from "next/server";
import { USERACESSTOKEN } from "./helpers/Constants";

export function middleware(request) {
  const useracesstoken = request.cookies.get(USERACESSTOKEN);
  if (!useracesstoken || !useracesstoken.value) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/calculator", "/todos", "/profile"],
};
