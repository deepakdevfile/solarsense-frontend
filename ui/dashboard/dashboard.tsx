
import { LogoutButton } from "../logout/buttons";
import InstallationForm from "./installation/installation-form";
import { getUser, getInstallation, getMeasurementList } from "@/lib/data";
import { InstallationID } from "@/lib/types";
// EditButton;
import { DeleteButton } from "./installation/installation-button";
import Link from "next/link";
import SelectMeasurement from "./measurement/select-measurement";

export default async function DashboardPage() {
  const user = await getUser()
  // console.log(user)
  const installations = await getInstallation()
  // console.log(installations)
  const measurements = await getMeasurementList()
  // console.log(measurements)

  return (
    <main className="min-h-screen">
      <header className="border-b bg-white">
        <div className="mx-auto flex mx-w-6xl justify-between p-5">
          <b>☀ SolarSense</b>
          <LogoutButton />
        </div>
      </header>
      <div className="mx-auto max-w-6xl space-y-6 p-6">
        <h1 className="text-3xl font-bold">Welcome, {user.email} </h1>
        <div className="grid gap-4 md:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-500">Installations</p>
            <b className="text-3xl">{installations.length}</b>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-500">Measurements</p>
            <b className="text-3xl">Item length</b>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-500">Recorded Energy</p>
            <b className="text-3xl">In kWh</b>
          </section>
        </div>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mt-5 flex h-56 items-end gap-1 rounded-xl bg-slate-50 p-4">
            Recent power output
          </h2>
          <div className="flex-1 rounded-t bg-yellow-500">Readings Lists</div>
          <div>
            <p className="m-auto text-slate-500">
              Import a CSV to see production data.
            </p>
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Installations</h2>
          <Link
            href={`/dashboard/installation/create`}
            className="rounded-lg bg-slate-900 px-4 py- font-semibold text-white hover:bg-slate-700 disabled:opacity-50 "
          >
            Add installation
          </Link>
          <div className="mt-3 divide-y">
            {installations.map((installation: InstallationID) => (
              <div
                className="flex flex-wrap items-center justify-between py-3"
                key={installation.id}
              >
                <span>
                  {installation.name}
                  <small className="ml-2 text-slate-500">
                    {installation.location}
                  </small>
                </span>
                <div className="flex items-center gap-4">
                  <span>{installation.capacity} kW</span>
                  {/* <EditButton id={installation.id} /> */}
                  <Link
                    href={`/dashboard/installation/${installation.id}/edit`}
                    className="rounded-lg bg-slate-900 px-4 py- font-semibold text-white hover:bg-slate-700 disabled:opacity-50 "
                  >
                    Edit
                  </Link>
                  <DeleteButton id={installation.id} />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Data pipeline</h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose an installation, import historical solar measurements and
            sync weather
          </p>
          <SelectMeasurement installations={installations} />
          <p>CSV columns: timestamp, power_kw, energy_kwh</p>
        </section>
      </div>
    </main>
  );
}
