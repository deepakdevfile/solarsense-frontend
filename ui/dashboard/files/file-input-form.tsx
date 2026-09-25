

export default function FileInput(){
    return (
      <div className="mt-4 flex flex-wrap gap-3">
        <input
          type="file"
          accept=".csv, text/csv"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-solar-500 "
        />
        <button className="rounded-lg bg-slate-900 px-4 py-2.5 font-semibold text-white hover:bg-slate-700 disabled:opacity-50 ">
          Import CSV
        </button>
        <button className="rounded-lg bg-slate-900 px-4 py-2.5 font-semibold text-white hover:bg-slate-700 disabled:opacity-50 ">
          Sync waether
        </button>
      </div>
    );
}