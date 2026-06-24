import { MemberCard } from "@/components/public/member-card";
import { SectionTitle } from "@/components/section-title";
import { sampleMembers } from "@/lib/sample-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createAdminSupabaseClient } from "@/lib/supabase/server";

async function getMembers() {
  if (!isSupabaseConfigured || !process.env.SUPABASE_SERVICE_ROLE_KEY) return sampleMembers;
  try {
    const supabase = createAdminSupabaseClient();
    const { data } = await supabase.from("members").select("*").order("created_at", { ascending: true });
    return data?.length ? data : sampleMembers;
  } catch {
    return sampleMembers;
  }
}

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <main className="px-4 py-20">
      <SectionTitle
        eyebrow="ROSTER"
        title="SOUL Members"
        description="Role-wise member record with skills, status and alliance tag."
      />
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <MemberCard key={member.id} member={member as any} />
        ))}
      </div>
    </main>
  );
}
