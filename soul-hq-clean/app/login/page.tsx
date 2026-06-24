import { LoginForm } from "@/components/auth/login-form";
import { SectionTitle } from "@/components/section-title";

export default function LoginPage() {
  return (
    <main className="px-4 py-20">
      <SectionTitle
        eyebrow="ADMIN LOGIN"
        title="SOUL HQ Access"
        description="Login with Supabase Auth. Admin access is controlled from profiles.is_admin."
      />
      <LoginForm />
    </main>
  );
}
