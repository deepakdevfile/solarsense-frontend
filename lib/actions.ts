'use server'

import { Installation, InstallationID, UserData } from "./types";
import { redirect } from "next/navigation";
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

export async function registerUser(formData: UserData) {
  const email = formData.email;
  const password = formData.password;

  try {
    const res = await api("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const cookieStore = await cookies();
    cookieStore.set("access-token", res.access_token, {
      httpOnly: true, // 🛡️ Blocks JavaScript access (Prevents XSS)
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
  } catch (error) {
    console.log((error as Error).message);
  }

  redirect("/dashboard");
}

export async function loginUser(formData: UserData) {
  const email = formData.email[0];
  const password = formData.password[0];

  try {
    const res = await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    // console.log(res.headers.get("set-cookie"));
    const cookieStore = await cookies();
    cookieStore.set("access-token", res.access_token, {
      httpOnly: true, // 🛡️ Blocks JavaScript access (Prevents XSS)
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
  } catch (error) {
    console.log((error as Error).message);
  }

  redirect("/dashboard");
}

export async function logoutUser() {
  try {
    const res = await api("/auth/logout", {
      method: "POST",
    });

    const cookieStore = await cookies();
    cookieStore.delete("access-token");
  } catch (error) {
    console.log((error as Error).message);
  }

  redirect('/')
}

export async function addInstallation(formData: Installation) {
  const name = formData.name[0];
  const location = formData.location[0];
  const capacity = Number(formData.capacity);

  // console.log(JSON.stringify({ name, location, capacity }));

  try {
    const res = await api("/installation", {
      method: "POST",
      body: JSON.stringify({ name, location, capacity }),
    });
  } catch (error) {
    console.log((error as Error).message);
  }
}

export async function updateInstallation(formData: InstallationID) {
  // console.log(formData);
  const name = formData.name[0];
  const id = formData.id;
  const location = formData.location[0];
  const capacity = Number(formData.capacity);

  // console.log(name)
  // console.log(id)
  // console.log(location)
  // console.log(capacity)
  try {
    const res = await api(`/installation/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, location, capacity }),
    });
    return res;
  } catch (error) {
    console.log((error as Error).message);
  }
}

export async function deleteInstallation(id: number) {
  try {
    const res = api(`/installation/${id}`, {
      method: "DELETE",
    });
    return res;
  } catch (error) {
    console.log((error as Error).message);
  }
}