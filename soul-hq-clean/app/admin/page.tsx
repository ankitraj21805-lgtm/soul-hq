import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { Card } from "@/components/ui/card";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

async function getAccess() {
  if (!isSupabaseConfigured) {
    return { ok: false, reason: "Supabase env vars missing" };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      redirect("/login");
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin,email")
      .eq("id", userData.user.id)
      .single();

    if (!profile?.is_admin) {
      return { ok: false, reason: "This user is not admin. Set profiles.is_admin = true in Supabase SQL." };
    }

    return { ok: true, reason: "" };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "digest" in error &&
      String((error as { digest?: unknown }).digest).startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    return { ok: false, reason: error instanceof Error ? error.message : "Admin check failed" };
  }
}

export default async function AdminPage() {
  const access = await getAccess();

  if (!access.ok) {
    return (
      <main className="px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <Card>
            <p className="text-sm font-black tracking-[.35em] text-soul-red">ADMIN SETUP REQUIRED</p>
            <h1 className="mt-3 text-4xl font-black">Admin dashboard locked</h1>
            <p className="mt-4 text-zinc-300">{access.reason}</p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
              Run Supabase setup from README, then make your user admin:
              <pre className="mt-3 overflow-x-auto rounded-xl bg-black p-3 text-xs text-red-100">
{`update public.profiles
set is_admin = true
where email = 'your-email@example.com';`}
              </pre>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <AdminDashboard />
    </main>
  );
}
