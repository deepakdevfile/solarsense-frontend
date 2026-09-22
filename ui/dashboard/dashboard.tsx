
import { LogoutButton } from "../logout/buttons";
import InstallationForm from "./installation/installation-form";
import { getUser, getInstallation } from "@/lib/data";
import { InstallationID } from "@/lib/types";
// EditButton;
import { DeleteButton } from "./installation/installation-button";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getUser()
  // console.log(user)
  const installations = await getInstallation()
  // console.log(installations)
  // const measurements = await getMeasurement()
  // console.log(measurements)

  return (
    <main className="min-h-screen">
      <header className="border-b bg-white">
        <div className="mx-auto flex mx-w-6xl justify-between p-5">
          <b>SolarSense</b>
          <LogoutButton />
        </div>
      </header>
      <div className="mx-auto max-w-6xl space-y-6 p-6">
        <h1 className="text-3xl font-bold">Welcome, {user.email} </h1>
        <div className="grid gap-4 md:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-500">Installation</p>
            <b className="text-3xl">{installations.length}</b>
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
            {installations.map((installation: InstallationID) => (
              <div className="flex justify-between py-3" key={installation.id}>
                <span>
                  {installation.name}
                  <small className="ml-2 text-slate-500">
                    {installation.location}
                  </small>
                </span>
                <div className="flex items-center gap-4">
                  <span>{installation.capacity} kW</span>
                  {/* <EditButton id={installation.id} /> */}
                  <Link href={`/dashboard/installation/${installation.id}/edit`}>Edit</Link>
                  <DeleteButton id={installation.id} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
