// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/products(.*)",
  "/about(.*)",
  "/contact(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/account(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const session = await auth(); // returns { userId, sessionId, ... }

  if (!isPublicRoute(req) && !session?.userId) {
    // not signed in → redirect to sign-in
    return Response.redirect(new URL("/sign-in", req.url));
  }
  // otherwise continue
  return;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:css|js|map|jpg|jpeg|png|gif|svg|webp|ico)).*)",
  ],
};
