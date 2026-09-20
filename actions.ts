import { METHODS } from "http";
import { redirect } from "next/dist/server/api-utils";

const API = process.env.NEXT_PUBLIC_API_URL

async function api(path: string, options: RequestInit = {}){
    const res = await fetch(`${API}${path}`, {
        ...options,
        headers: { "Content-Type": "application/json", ...(options.headers || {})}
    })

    if(!res.ok){
        throw new Error(
            (await res.json().catch(() => ({ detail: "Request failed"}))).detail,
        );
    }

    return res.status === 204 ? null : res.json();
}


export async function registerUser(formData: FormData){
    const email = formData.get("email")
    const password = formData.get("password")
    
    const data = {
        "email": email,
        "password": password,
    }

    try{
        const res = await api("/auth/register", {
          method: "POST",
          body: JSON.stringify({email, password}),
        });
    } catch(error){
        console.log((error as Error).message)
    }
}

export async function loginUser(formData: FormData){
    const email = formData.get("email")
    const password = formData.get("password")

    // console.log(email)
    // console.log(password)

    try{
        const res = await api("/auth/login", {
            method: "POST",
            body: JSON.stringify({email, password})
        })
    } catch(error){
        console.log((error as Error).message)
    }
}

export async function logoutUser(){
    console.log("send it to backend")

    try{
        const res = await api("/auth/logout", {
            method: "POST",
        })
    } catch(error){
        console.log((error as Error).message)
    }
}