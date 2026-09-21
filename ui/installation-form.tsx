'use client'

import { useState } from "react";
import { addInstallation } from "@/lib/actions";
import { Installation } from "@/lib/types";

export default function InstallationForm(){
    const [formData, setFormData] = useState<Installation>({
      name: "",
      location: "",
      capacity: 0,
    });
    const {name, location, capacity} = formData;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        e.preventDefault();
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: name === "capacity" ? Number([e.target.value]) : [e.target.value],
        }));
    }

    function handleSubmit(){
        addInstallation(formData)
        setFormData({name: "", location: "", capacity: 0});
    }

    return (
      <form action={handleSubmit} className="mt-4 grid gap-3 md:grid-cols-4">
        <label htmlFor="name" className="block text-sm font-medium">
          {" "}
          Name:{" "}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => handleChange(e)}
          className="w-full rounded-lg border-2 px-3 py-2.5 outline-none focus:ring-2 focus:ring-solar-500"
        />{" "}
        <label htmlFor="location" className="block text-sm font-medium">
          {" "}
          Location:{" "}
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={(e) => handleChange(e)}
          className="w-full rounded-lg border-2 px-3 py-2.5 outline-none focus:ring-2 focus:ring-solar-500"
        />{" "}
        <label htmlFor="capacity" className="block text-sm font-medium">
          {" "}
          Capcity(kW):{" "}
        </label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          value={capacity}
          onChange={(e) => handleChange(e)}
          className="w-full rounded-lg border-2 px-3 py-2.5 outline-none focus:ring-2 focus:ring-solar-500"
        />{" "}
        <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2.5 font-semibold text-white hover:bg-slate-700 disabled:opacity-50 ">
          Add
        </button>
      </form>
    );
}