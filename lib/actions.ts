import { UserData } from "./types";

const API = process.env.NEXT_PUBLIC_API_URL

async function api(path: string, options: RequestInit = {}){
    const res = await fetch(`${API}${path}`, {
        ...options,
        headers: { "Content-Type": "application/json", ...(options.headers || {})},
        credentials: "include",
    })

    if(!res.ok){
        throw new Error(
            (await res.json().catch(() => ({ detail: "Request failed"}))).detail,
        );
    }

    return res.status === 204 ? null : res.json();
}


export async function registerUser(formData: UserData){
    const email = formData.email
    const password = formData.password

    try{
        const res = await api("/auth/register", {
          method: "POST",
          body: JSON.stringify({email, password}),
        });
    } catch(error){
        console.log((error as Error).message)
    }
}

export async function loginUser(formData: UserData){
    const email = formData.email[0]
    const password = formData.password[0]

    try{
        const res = await api("/auth/login", {
            method: "POST",
            body: JSON.stringify({email, password}),
        });
    } catch(error){
        console.log((error as Error).message)
    }
}

export async function getUser() {
  try {
    const res = await api("/auth/current", {
      method: "GET",
    });
    return res
  } catch (error) {
    console.log((error as Error).message);
  }
}

export async function logoutUser(){
    try{
        const res = await api("/auth/logout", {
            method: "POST",
        })
    } catch(error){
        console.log((error as Error).message)
    }
}