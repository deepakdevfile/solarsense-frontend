import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API_URL;

async function api(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  //   console.log(cookieStore);
  const token = cookieStore.get("access_token")?.value;
  //   console.log(token)
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Cookie: `access-token=${token}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(
      (await res.json().catch(() => ({ detail: "Request failed" }))).detail,
    );
  }

  return res.status === 204 ? "request was fucked" : res.json();
}

export async function getUser() {
  try {
    const res = api("/auth/current", {
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log((error as Error).message);
  }
}

export async function getInstallation(){
    try{
        const res = api("/installation", {
          method: "GET",
        });
        // console.log(res)
        return res 
    } catch(error){
        console.log((error as Error).message);
    }
}
