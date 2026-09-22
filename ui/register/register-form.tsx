'use client'

import { useState } from "react"
import { registerUser } from "@/lib/actions"
import { useRouter } from "next/navigation";

const initialState = {
    email: '',
    password: '',
}

export default function RegisterForm(){
    const [formData, setFormData] = useState(initialState)
    const {email, password} = formData
    const router = useRouter();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setFormData(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    function handleSubmit(){
        registerUser(formData);
        router.push("/dashboard")
    }

    return (
      <form action={handleSubmit} className="space-y-4">
        <label htmlFor="email" className="block text-sm font-medium">
          {" "}
          Email:{" "}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => handleChange(e)}
          className="w-full rounded-lg border-slate-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-solar-500"
        />{" "}
        <br />
        <label htmlFor="password" className="block text-sm font-medium">
          {" "}
          Password:{" "}
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => handleChange(e)}
          className="w-full rounded-lg border-slate-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-solar-500"
        />{" "}
        <br />
        <button type="submit" className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-white font-semibold hover:bg-slate-700 disabled:opacity-50">
          Register
        </button>
      </form>
    );
}