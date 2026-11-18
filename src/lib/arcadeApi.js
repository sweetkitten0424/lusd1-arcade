import { cookies } from "next/headers";

export async function fetchFromRails(path, options = {}) {
  const cookieStore = await cookies();
  const cfToken = cookieStore.get("CF_Authorization")?.value;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  return fetch(`${apiUrl}${path}`, {
    ...options,
    cache: "no-store",
    headers: {
      ...options.headers,
      ...(cfToken ? { "Cf-Access-Jwt-Assertion": cfToken } : {}),
    },
  });
}
