"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    setMessage("");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const supabase = createClient();

    const result =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    if (mode === "signup") {
      setMessage("Signup done. Supabase email confirmation setting ke hisaab se login karein. Admin access ke liye profiles table me is_admin true karein.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <Card className="mx-auto max-w-md">
      <form action={onSubmit} className="grid gap-4">
        <Input name="email" type="email" placeholder="Admin email" required />
        <Input name="password" type="password" placeholder="Password" required />
        <Button>{mode === "login" ? "Login" : "Create account"}</Button>

        {message ? <p className="text-sm text-red-200">{message}</p> : null}

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="text-sm font-semibold text-zinc-400 hover:text-white"
        >
          {mode === "login" ? "Need account? Sign up" : "Already have account? Login"}
        </button>

        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm text-yellow-100">
          Demo note: signup ke baad Supabase SQL me apni email ka <b>is_admin = true</b> set karein.
        </div>
      </form>
    </Card>
  );
}
