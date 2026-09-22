'use client'
import { deleteInstallation } from "@/lib/actions";

import { redirect } from "next/navigation";

// export function EditButton( { id }: {id : number} ){
//     function handleClick(){
//         editInstallation(id)
//     }
//     return (
//       <button onClick={handleClick} className="rounded-lg bg-slate-900 px-4 py-1 font-semibold text-white hover:bg-slate-700 disabled:opacity-50 ">
//         Edit
//       </button>
//     );
// }

export function DeleteButton({ id }: { id: number }){
  function handleClick(){
    deleteInstallation(id)
    redirect("/dashboard")
  }
  return (
    <button 
      className="rounded-lg bg-slate-900 px-4 py- font-semibold text-white hover:bg-slate-700 disabled:opacity-50 "
      onClick={handleClick}
    >
      Delete
    </button>
  );
}