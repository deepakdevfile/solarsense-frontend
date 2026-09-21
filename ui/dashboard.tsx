import { LogoutButton } from "./buttons";
import InstallationForm from "./installation-form";
import { getUser } from "@/lib/actions";
import { UserData } from "@/lib/types";

export default function DashboardPage() {
    return (
      <main className="min-h-screen">
        <header className="border-b bg-white">
          <div className="mx-auto flex mx-w-6xl justify-between p-5">
            <b>SolarSense</b>
            <LogoutButton />
          </div>
        </header>
        <div className="mx-auto max-w-6xl space-y-6 p-6">
          <h1 className="text-3xl font-bold">Welcome, Username</h1>
          <div className="grid gap-4 md:grid-cols-3">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-slate-500">Installation</p>
              <b className="text-3xl">Item length</b>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-slate-500">Readings</p>
              <b className="text-3xl">Item length</b>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-slate-500">Energy</p>
              <b className="text-3xl">In kWh</b>
            </section>
          </div>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Add installation</h2>
            <div>
              <InstallationForm />
            </div>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Installations</h2>
            <div className="mt-3 divide-y">
              List of isntallations rendered
            </div>
          </section>
        </div>
      </main>
    );
}
