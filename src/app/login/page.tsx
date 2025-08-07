import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Login Admin PPID</h1>
          <p className="text-sm text-gray-600">Masuk ke sistem administrasi PPID</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
