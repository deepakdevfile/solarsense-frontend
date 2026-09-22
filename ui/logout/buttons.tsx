'use client'

import { logoutUser } from "@/lib/actions";
import { useRouter } from "next/navigation";
// import { signOut } from "next-auth/react";

export function LogoutButton(){
    const router = useRouter()

    async function handleClick(){
        logoutUser()
        // await signOut({ callbackUrl: "/login" });
        router.push("/")
    }
    

    return (
      <>
        <button onClick={handleClick}>Logout</button>
      </>
    );
}