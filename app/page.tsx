import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-xl text-center">
          <p className="font-bold text-color-600">
            Hello, Welcome to Solar Sense
          </p>
          <h1 className="mt-3 text-5xl font-bold">
            Solar monitoring, made clear
          </h1>
          <p className="mt-5 text-slate-600">
            Track installation and prepare your energy data for forecasting
          </p>
        </div>
        <div className="mt-8 flex justify-center gap-3">
          <Link 
            href="/login" 
            className="rounded-lg bg-slate-900 px-5 py-3 text-white">
            Log in
          </Link>{" "}
          <br />
          <Link 
            href="/register"
            className="rounded-lg bg-white px-5 py-3"
          >
            Register
          </Link>
        </div>
      </main>
    </div>
  );
}
