'use client'

import { logoutUser } from "@/actions";

function handleClick(){
    console.log("Button works, implement functionality from actions");
}

export function LogoutButton(){
    return(
        <button onClick={logoutUser}>
            Logout
        </button>
    )
}