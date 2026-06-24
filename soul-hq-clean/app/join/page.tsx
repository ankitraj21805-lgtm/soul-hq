import { TryoutForm } from "@/components/public/tryout-form";
import { SectionTitle } from "@/components/section-title";

export default function JoinPage() {
  return (
    <main className="px-4 py-20">
      <SectionTitle
        eyebrow="JOIN SOUL"
        title="Tryout Form"
        description="Apply for SOUL Syndicate. Be active, respectful and fair-play."
      />
      <TryoutForm />
    </main>
  );
}
