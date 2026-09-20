'use client'

import { useState } from "react"
import { loginUser } from "@/actions"

const initialState = {
    email: "",
    password: "",
}

export default function LoginForm(){
    const [formData, setFormData] = useState(initialState)
    const {email, password} = formData

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        e.preventDefault()
        setFormData(prevState => ({...prevState, [e.target.name]: [e.target.value]}))
    }

    return (
        <form action={loginUser}>
            <label htmlFor="email"> Email: </label>
            <input 
                type="email" 
                id="email"
                name="email"
                value={email}
                onChange={(e) => handleChange(e)}
            /> <br />
            <label htmlFor="password"> Password: </label>
            <input 
                type="password" 
                id="password"
                name="password"
                value={password}
                onChange={(e) => handleChange(e)}
            /> <br />
            <button type="submit">
                Login
            </button>
        </form>
    )
}