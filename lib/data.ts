import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API_URL;

async function api(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(
      (await res.json().catch(() => ({ detail: "Request failed" }))).detail,
    );
  }

  return res.status === 204 ? null : res.json();
}

export async function getUser() {
  const cookieStore = await cookies();
//   console.log(cookieStore);
  const token = cookieStore.get("access_token")?.value;
//   console.log(token)

  try {
    const res = api("/auth/current", {
      method: "GET",
      headers: {
        Cookie: `access-token=${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log((error as Error).message);
  }
}
