import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLangFromPath } from "@/utils/getLangFromPath";

// Language configuration
const supportedLanguages = ["en", "es"] as const;
const defaultLanguage = "es";

// Function to detect the user's preferred language
function getPreferredLanguage(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");

  if (acceptLanguage) {
    const preferredLanguage = acceptLanguage
      .split(",")[0] // Take only the first language from the header
      .slice(0, 2); // Extract the first two characters (e.g., "en")

    if (supportedLanguages.includes(preferredLanguage as any)) {
      return preferredLanguage;
    }
  }
  // If not found, use the default language
  return defaultLanguage;
}

// Function to check if a route needs redirection
function needsLangRedirect(pathname: string): boolean {
  const lang = getLangFromPath(pathname); // Use the reusable function
  return !lang || !supportedLanguages.includes(lang as any);
}

// Function to build the new URL with the language
function buildLocalizedUrl(
  pathname: string,
  language: string,
  request: NextRequest
): URL {
  const cleanPath = pathname.replace(/^\/[a-z]{2}(\/|$)/, ""); // Clean the language from the path
  return new URL(`/${language}${cleanPath}`, request.url); // Build the new URL
}

// Main middleware function
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if it needs language redirection
  if (needsLangRedirect(pathname)) {
    const preferredLanguage = getPreferredLanguage(request);
    const localizedUrl = buildLocalizedUrl(
      pathname,
      preferredLanguage,
      request
    );

    // Perform a temporary redirection (307) to preserve the HTTP method
    return NextResponse.redirect(localizedUrl, 307);
  }

  // If it already has a valid language, continue normally
  return NextResponse.next();
}

// Matcher configuration to include specific routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)"],
};
