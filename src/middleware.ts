import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n";
import { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";

export const intlMiddleware = createMiddleware(routing);

const locales = routing.locales;
const publicPages = ["/", "/sign-in", "/sign-up"];

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}


export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
