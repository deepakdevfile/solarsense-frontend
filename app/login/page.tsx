import LoginForm from "@/ui/login-form"

export default function Login(){
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold">Register</h1>
          <div className="mt-6">
              <LoginForm />
          </div>
        </div>
      </main>
    );
}