"use server";

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

  return res;
}

export async function registerUser(formData: UserData) {
  const name = formData.name;
  const email = formData.email;
  const password = formData.password;

  try {
    const res = await api("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    // console.log("Registering user, inspect from here.")

    // console.log(res);
    const setCookieHeader = res.headers.get("set-cookie");
    // console.log(setCookieHeader);
    if (setCookieHeader) {
      const tokenMatch = setCookieHeader.match(/access_token=([^;]+)/);
      // console.log(tokenMatch);
      const token = tokenMatch ? tokenMatch[1] : null;
      // console.log(token);
      if (token) {
        const cookieStore = await cookies();
        cookieStore.delete({ name: "access-token", path: "/" });
        cookieStore.set("access-token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 86400,
        });
        // console.log(cookieStore);
      }
    }
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

    // console.log(res);
    const setCookieHeader = res.headers.get("set-cookie");
    // console.log(setCookieHeader);
    if (setCookieHeader) {
      const tokenMatch = setCookieHeader.match(/access-token=([^;]+)/);
      // console.log(tokenMatch);
      const token = tokenMatch ? tokenMatch[1] : null;
      // console.log(token);
      if (token) {
        const cookieStore = await cookies();
        cookieStore.delete({ name: "access-token", path: "/" });
        cookieStore.set("access-token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 86400,
        });
        // console.log(cookieStore);
      }
    }
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
    cookieStore.delete({ name: "access-token", path: "/" });
  } catch (error) {
    console.log((error as Error).message);
  }

  redirect("/");
}

export async function addInstallation(formData: Installation) {
  const name = formData.name[0];
  const location = formData.location[0];
  const latitude = Number(formData.latitude);
  const longitude = Number(formData.longitude);
  const capacity = Number(formData.capacity);

  // console.log(JSON.stringify({ name, location, latitude, longitude, capacity }));

  try {
    const cookieStore = await cookies();
    // console.log(cookieStore);
    const token = cookieStore.get("access-token")?.value;
    // console.log(token)
    const res = await api("/installation", {
      method: "POST",
      body: JSON.stringify({ name, location, latitude, longitude, capacity }),
      headers: {
        Cookie: `access-token=${token}`,
      },
    });
  } catch (error) {
    console.log((error as Error).message);
  }

  redirect("/dashboard");
}

export async function updateInstallation(formData: InstallationID) {
  // console.log(formData);
  const name = formData.name[0];
  const id = formData.id;
  const location = formData.location[0];
  const latitude = Number(formData.latitude);
  const longitude = Number(formData.longitude);
  const capacity = Number(formData.capacity);

  // console.log(name)
  // console.log(id)
  // console.log(location)
  // console.log(latitude)
  // console.log(longitude)
  // console.log(capacity)
  try {
    const cookieStore = await cookies();
    // console.log(cookieStore);
    const token = cookieStore.get("access-token")?.value;
    // console.log(token)
    const res = await api(`/installation/${id}`, {
      method: "PUT",
      headers: {
        Cookie: `access-token=${token}`,
      },
      body: JSON.stringify({ name, location, latitude, longitude, capacity }),
    });
  } catch (error) {
    console.log((error as Error).message);
  }

  redirect("/dashboard");
}

export async function deleteInstallation(id: number) {
  try {
    const cookieStore = await cookies();
    // console.log(cookieStore);
    const token = cookieStore.get("access-token")?.value;
    // console.log(token)
    const res = api(`/installation/${id}`, {
      method: "DELETE",
      headers: {
        Cookie: `access-token=${token}`,
      },
    });
  } catch (error) {
    console.log((error as Error).message);
  }

  redirect("/dashboard");
}

export async function addInstallationMeasurement(id: number) {
  try {
    const res = api(`/installation/${id}/measurements`, {
      method: "POST",
    });
    return (await res).json();
  } catch (error) {
    console.log((error as Error).message);
  }
}

export async function importMeasurement(){
  try{
    const res = api(`/installation/import`, {
      method: "POST",
    })
    return (await res).json();
  } catch(error){
    console.log((error as Error).message)
  }
}

export async function syncWeather(id: number){
  try{
    const res = api(`/weather/${id}/sync`, {
      method: "POST",
    })
    return (await res).json()
  } catch(error){
    console.log((error as Error).message)
  }
}