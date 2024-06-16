export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/apps/:path*", "/api/notes/:path*", "/api/todos/:path*"],
};
