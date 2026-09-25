import InstallationForm from "@/ui/dashboard/installation/installation-form"

export default function Page(){
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Add installation</h2>
          <div>
            <InstallationForm />
          </div>
        </section>
    )
}