'use client'

import { useState } from "react"
import { registerUser } from "@/actions"

const initialState = {
    email: '',
    password: '',
}

export default function RegisterForm(){
    const [formData, setFormData] = useState(initialState)
    const {email, password} = formData

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setFormData(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    function handleSubmit(){
        console.log(formData)
        console.log(email)
        console.log(password)
    }

    return (
        <form action={registerUser}>
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
                Register
            </button>
        </form>
    )
}