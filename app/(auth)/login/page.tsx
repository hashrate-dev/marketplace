"use client";

import { useEffect, useState } from "react";
import { createSupabaseClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    // Placeholder para inicializar cualquier lógica de sesión en el cliente
    createSupabaseClient();
  }, []);

  const handleMagicLink = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    if (!email) return;

    setLoading(true);
    try {
      const supabase = createSupabaseClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin
        }
      });

      if (error) {
        console.error(error.message);
        return;
      }

      setEmailSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
        <h1 className="text-xl font-semibold text-slate-50">
          Accede al marketplace
        </h1>
        <p className="mt-1 text-xs text-slate-300">
          Este es un ejemplo de login con Supabase por magic link. Adáptalo a
          tu flujo real (wallet + email, roles, etc.).
        </p>

        <form
          className="mt-4 space-y-3"
          action={async (formData) => {
            await handleMagicLink(formData);
          }}
        >
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block text-slate-200">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="tú@ejemplo.com"
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-0 focus:border-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-emerald-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Enviando enlace..." : "Entrar con magic link"}
          </button>
        </form>

        {emailSent && (
          <p className="mt-3 text-xs text-emerald-300">
            Revisa tu correo para completar el acceso.
          </p>
        )}
      </div>
    </main>
  );
}

