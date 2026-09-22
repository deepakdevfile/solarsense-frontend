
// import { editInstallation } from "@/lib/data";

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
    return (
      <button className="rounded-lg bg-slate-900 px-4 py- font-semibold text-white hover:bg-slate-700 disabled:opacity-50 ">
        Delete
      </button>
    );
}