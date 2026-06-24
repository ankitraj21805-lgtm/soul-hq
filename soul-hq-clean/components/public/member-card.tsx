import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Member } from "@/lib/types";

export function MemberCard({ member }: { member: Member }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-black">{member.game_name}</h3>
          <p className="mt-1 text-sm text-zinc-400">{member.real_name}</p>
        </div>
        <Badge tone={member.activity_status === "Active" ? "green" : "gray"}>
          {member.activity_status}
        </Badge>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <p><span className="text-zinc-500">Role:</span> {member.role}</p>
        <p><span className="text-zinc-500">Team:</span> {member.team}</p>
        <p><span className="text-zinc-500">Driving:</span> {member.driving_skill}</p>
        <p><span className="text-zinc-500">Game:</span> {member.game_skill}</p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
        <span className="text-zinc-400">{member.instagram_id ?? "No Instagram"}</span>
        <Badge tone="red">{member.alliance_tag}</Badge>
      </div>
    </Card>
  );
}
