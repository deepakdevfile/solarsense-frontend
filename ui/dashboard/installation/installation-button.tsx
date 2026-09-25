'use client'
import { deleteInstallation } from "@/lib/actions";

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
    if(!confirm("Delete this installation and its stored measurements/weather?")){
      return;
    }
    deleteInstallation(id)
  }
  return (
    <button 
      className="rounded-lg bg-red-600 px-4 py- font-semibold text-white hover:bg-red-700 disabled:opacity-50 "
      onClick={handleClick}
    >
      Delete
    </button>
  );
}