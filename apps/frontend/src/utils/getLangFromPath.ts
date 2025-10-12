type Language = "en" | "es";

export function getLangFromPath(pathname: string): Language | null {
  const langMatch = pathname.match(/^\/([a-z]{2})(\/|$)/); // Extract the lang code from the start of the path
  return langMatch ? (langMatch[1] as Language) : null; // Return the lang code or null if it doesn't exist
}
