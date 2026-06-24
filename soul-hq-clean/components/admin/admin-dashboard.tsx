"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Crown,
  Megaphone,
  Shield,
  Users,
  Video,
  Wand2
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { attendancePoints } from "@/lib/points";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { todayISO } from "@/lib/utils";

type TableName = "members" | "attendance" | "warnings" | "tryouts" | "events" | "alliances" | "content_plan";

type Row = Record<string, any>;

const modules = [
  ["overview", "Overview", Crown],
  ["members", "Members", Users],
  ["attendance", "Attendance", CheckCircle2],
  ["warnings", "Warnings", Shield],
  ["promotions", "Promotions", Wand2],
  ["tryouts", "Tryouts", ClipboardList],
  ["events", "Events", CalendarDays],
  ["alliances", "Alliances", Megaphone],
  ["content", "Content", Video],
  ["settings", "Settings", Crown]
] as const;

function emptyMember() {
  return {
    real_name: "",
    game_name: "",
    instagram_id: "",
    role: "Member",
    team: "Alpha",
    join_date: todayISO(),
    activity_status: "Trial",
    driving_skill: 70,
    game_skill: 70,
    teamwork: 70,
    behavior: 80,
    warnings_count: 0,
    promotion_status: "Trial Running",
    alliance_tag: "SYN",
    notes: ""
  };
}

export function AdminDashboard() {
  const [active, setActive] = useState<(typeof modules)[number][0]>("overview");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [members, setMembers] = useState<Row[]>([]);
  const [attendance, setAttendance] = useState<Row[]>([]);
  const [warnings, setWarnings] = useState<Row[]>([]);
  const [tryouts, setTryouts] = useState<Row[]>([]);
  const [events, setEvents] = useState<Row[]>([]);
  const [alliances, setAlliances] = useState<Row[]>([]);
  const [contentPlan, setContentPlan] = useState<Row[]>([]);
  const [memberForm, setMemberForm] = useState<Row>(emptyMember());
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredMembers = useMemo(() => {
    const term = search.toLowerCase();
    return members.filter((member) =>
      [member.real_name, member.game_name, member.role, member.team, member.instagram_id]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [members, search]);

  async function authHeaders() {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;

    if (!accessToken) {
      throw new Error("Login required.");
    }

    setToken(accessToken);
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    };
  }

  async function api(table: TableName, options?: RequestInit, id?: string) {
    const headers = await authHeaders();
    const url = id ? `/api/admin/${table}/${id}` : `/api/admin/${table}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...(options?.headers ?? {})
      }
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error ?? "Request failed.");
    return result;
  }

  async function loadAll() {
    setLoading(true);
    setMessage("");
    try {
      const [m, a, w, t, e, al, c] = await Promise.all([
        api("members"),
        api("attendance"),
        api("warnings"),
        api("tryouts"),
        api("events"),
        api("alliances"),
        api("content_plan")
      ]);
      setMembers(m.data ?? []);
      setAttendance(a.data ?? []);
      setWarnings(w.data ?? []);
      setTryouts(t.data ?? []);
      setEvents(e.data ?? []);
      setAlliances(al.data ?? []);
      setContentPlan(c.data ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Admin data load failed.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function saveMember() {
    try {
      if (editingMemberId) {
        await api("members", { method: "PATCH", body: JSON.stringify(memberForm) }, editingMemberId);
        setMessage("Member updated.");
      } else {
        await api("members", { method: "POST", body: JSON.stringify(memberForm) });
        setMessage("Member added.");
      }
      setMemberForm(emptyMember());
      setEditingMemberId(null);
      await loadAll();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Member save failed.");
    }
  }

  async function deleteRow(table: TableName, id: string) {
    if (!confirm("Delete this record?")) return;
    try {
      await api(table, { method: "DELETE" }, id);
      setMessage("Deleted.");
      await loadAll();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Delete failed.");
    }
  }

  async function markAttendance(formData: FormData) {
    const status = String(formData.get("status"));
    const played = formData.get("played") === "on";
    const payload = {
      member_id: formData.get("member_id"),
      date: formData.get("date"),
      status,
      reason: formData.get("reason"),
      points: attendancePoints(status as any, played)
    };

    try {
      await api("attendance", { method: "POST", body: JSON.stringify(payload) });
      setMessage("Attendance marked.");
      await loadAll();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Attendance failed.");
    }
  }

  async function addWarning(formData: FormData) {
    const memberId = String(formData.get("member_id"));
    const member = members.find((m) => m.id === memberId);
    const nextCount = Number(member?.warnings_count ?? 0) + 1;
    const action = nextCount === 1 ? "Reminder" : nextCount === 2 ? "Role Hold" : "Remove Review";

    try {
      await api("warnings", {
        method: "POST",
        body: JSON.stringify({
          member_id: memberId,
          reason: formData.get("reason"),
          warning_level: nextCount,
          action,
          date: formData.get("date")
        })
      });

      await api(
        "members",
        {
          method: "PATCH",
          body: JSON.stringify({
            warnings_count: nextCount,
            promotion_status: nextCount >= 3 ? "Remove Review" : nextCount === 2 ? "Hold" : member?.promotion_status
          })
        },
        memberId
      );

      setMessage(`Warning added: ${action}`);
      await loadAll();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Warning failed.");
    }
  }

  async function updateStatus(table: TableName, id: string, patch: Row) {
    try {
      await api(table, { method: "PATCH", body: JSON.stringify(patch) }, id);
      setMessage("Status updated.");
      await loadAll();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Update failed.");
    }
  }

  async function createSimple(table: TableName, formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    try {
      await api(table, { method: "POST", body: JSON.stringify(payload) });
      setMessage("Created.");
      await loadAll();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Create failed.");
    }
  }

  const stats = [
    ["Total Members", members.length, Users],
    ["Active", members.filter((m) => m.activity_status === "Active").length, CheckCircle2],
    ["Pending Tryouts", tryouts.filter((t) => t.status === "Pending").length, ClipboardList],
    ["Alliances", alliances.length, Megaphone]
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[270px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <Card className="p-3">
          <div className="mb-3 px-3 py-2">
            <p className="text-xs font-black tracking-[.35em] text-soul-red">ADMIN</p>
            <h2 className="mt-2 text-2xl font-black">SOUL Control</h2>
          </div>
          <div className="grid gap-2">
            {modules.map(([key, label, Icon]) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-bold transition ${
                  active === key ? "bg-soul-red text-white shadow-neon" : "bg-white/5 text-zinc-300 hover:bg-white/10"
                }`}
              >
                <Icon size={17} />
                {label}
              </button>
            ))}
          </div>
        </Card>
      </aside>

      <section className="min-w-0">
        {message ? (
          <div className="mb-4 rounded-2xl border border-soul-red/30 bg-soul-red/10 p-4 text-sm text-red-100">
            {message}
          </div>
        ) : null}

        {loading ? (
          <Card>Loading admin data...</Card>
        ) : (
          <>
            {active === "overview" && (
              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {stats.map(([label, value, Icon]) => (
                    <Card key={label as string}>
                      <Icon className="text-soul-red" />
                      <p className="mt-4 text-4xl font-black">{String(value)}</p>
                      <p className="text-sm text-zinc-400">{label as string}</p>
                    </Card>
                  ))}
                </div>

                <Card>
                  <h3 className="text-2xl font-black">Today HQ Rules</h3>
                  <div className="mt-4 grid gap-3 md:grid-cols-4">
                    <Badge tone="green">IN + played = 10</Badge>
                    <Badge tone="gold">Late = 7</Badge>
                    <Badge tone="gray">OUT with reason = 5</Badge>
                    <Badge tone="red">No reply = 0</Badge>
                  </div>
                </Card>
              </div>
            )}

            {active === "members" && (
              <div className="grid gap-6">
                <Card>
                  <h3 className="text-2xl font-black">{editingMemberId ? "Edit Member" : "Add Member"}</h3>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {["real_name", "game_name", "instagram_id", "role", "team"].map((field) => (
                      <Input
                        key={field}
                        value={memberForm[field] ?? ""}
                        onChange={(e) => setMemberForm({ ...memberForm, [field]: e.target.value })}
                        placeholder={field.replace("_", " ")}
                      />
                    ))}
                    <Input
                      type="date"
                      value={memberForm.join_date ?? ""}
                      onChange={(e) => setMemberForm({ ...memberForm, join_date: e.target.value })}
                    />
                    <Select
                      value={memberForm.activity_status}
                      onChange={(e) => setMemberForm({ ...memberForm, activity_status: e.target.value })}
                    >
                      {["Active", "Trial", "Hold", "Inactive"].map((x) => <option key={x}>{x}</option>)}
                    </Select>
                    <Select
                      value={memberForm.promotion_status}
                      onChange={(e) => setMemberForm({ ...memberForm, promotion_status: e.target.value })}
                    >
                      {["Trial Running", "Eligible", "Hold", "Promoted", "Demoted", "Remove Review"].map((x) => <option key={x}>{x}</option>)}
                    </Select>
                    {["driving_skill", "game_skill", "teamwork", "behavior"].map((field) => (
                      <Input
                        key={field}
                        type="number"
                        min="0"
                        max="100"
                        value={memberForm[field] ?? 0}
                        onChange={(e) => setMemberForm({ ...memberForm, [field]: Number(e.target.value) })}
                        placeholder={field.replace("_", " ")}
                      />
                    ))}
                  </div>
                  <Textarea
                    className="mt-3"
                    value={memberForm.notes ?? ""}
                    onChange={(e) => setMemberForm({ ...memberForm, notes: e.target.value })}
                    placeholder="Notes"
                  />
                  <div className="mt-4 flex gap-2">
                    <Button onClick={saveMember}>{editingMemberId ? "Update Member" : "Add Member"}</Button>
                    {editingMemberId ? (
                      <Button variant="outline" onClick={() => { setEditingMemberId(null); setMemberForm(emptyMember()); }}>
                        Cancel
                      </Button>
                    ) : null}
                  </div>
                </Card>

                <Card>
                  <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <h3 className="text-2xl font-black">Members</h3>
                    <Input className="md:max-w-xs" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search member..." />
                  </div>
                  <ResponsiveTable
                    rows={filteredMembers}
                    columns={["game_name", "real_name", "role", "team", "activity_status", "promotion_status", "warnings_count"]}
                    actions={(row) => (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => { setEditingMemberId(row.id); setMemberForm(row); }}>Edit</Button>
                        <Button variant="danger" onClick={() => deleteRow("members", row.id)}>Delete</Button>
                      </div>
                    )}
                  />
                </Card>
              </div>
            )}

            {active === "attendance" && (
              <div className="grid gap-6">
                <Card>
                  <h3 className="text-2xl font-black">Mark Attendance</h3>
                  <form action={markAttendance} className="mt-4 grid gap-3 md:grid-cols-5">
                    <Select name="member_id" required>{members.map((m) => <option key={m.id} value={m.id}>{m.game_name}</option>)}</Select>
                    <Input type="date" name="date" defaultValue={todayISO()} required />
                    <Select name="status"><option>IN</option><option>LATE</option><option>OUT</option><option>NO_REPLY</option></Select>
                    <Input name="reason" placeholder="Reason / note" />
                    <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-zinc-300">
                      <input name="played" type="checkbox" /> Played
                    </label>
                    <Button className="md:col-span-5">Mark Attendance</Button>
                  </form>
                </Card>
                <Card><ResponsiveTable rows={attendance} columns={["date", "member_id", "status", "reason", "points"]} /></Card>
              </div>
            )}

            {active === "warnings" && (
              <div className="grid gap-6">
                <Card>
                  <h3 className="text-2xl font-black">Add Warning</h3>
                  <form action={addWarning} className="mt-4 grid gap-3 md:grid-cols-4">
                    <Select name="member_id">{members.map((m) => <option key={m.id} value={m.id}>{m.game_name}</option>)}</Select>
                    <Input type="date" name="date" defaultValue={todayISO()} />
                    <Input name="reason" placeholder="Reason" required />
                    <Button>Add Warning</Button>
                  </form>
                </Card>
                <Card><ResponsiveTable rows={warnings} columns={["date", "member_id", "reason", "warning_level", "action"]} /></Card>
              </div>
            )}

            {active === "promotions" && (
              <Card>
                <h3 className="text-2xl font-black">Promotion Tracker</h3>
                <div className="mt-4 grid gap-3">
                  {members.map((m) => (
                    <div key={m.id} className="grid gap-3 rounded-2xl border border-white/10 bg-black/30 p-4 md:grid-cols-[1fr_240px_auto] md:items-center">
                      <div>
                        <p className="font-black">{m.game_name}</p>
                        <p className="text-sm text-zinc-400">{m.role} • Warnings {m.warnings_count}</p>
                      </div>
                      <Select
                        value={m.promotion_status}
                        onChange={(e) => updateStatus("members", m.id, { promotion_status: e.target.value })}
                      >
                        {["Trial Running", "Eligible", "Hold", "Promoted", "Demoted", "Remove Review"].map((x) => <option key={x}>{x}</option>)}
                      </Select>
                      <Badge tone="red">{m.promotion_status}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {active === "tryouts" && (
              <Card>
                <h3 className="text-2xl font-black">Tryout Requests</h3>
                <ResponsiveTable
                  rows={tryouts}
                  columns={["name", "game_name", "instagram_id", "active_time", "status"]}
                  actions={(row) => (
                    <div className="flex gap-2">
                      <Button onClick={() => updateStatus("tryouts", row.id, { status: "Accepted" })}>Accept</Button>
                      <Button variant="danger" onClick={() => updateStatus("tryouts", row.id, { status: "Rejected" })}>Reject</Button>
                    </div>
                  )}
                />
              </Card>
            )}

            {active === "events" && (
              <Manager
                title="Event Manager"
                table="events"
                rows={events}
                fields={["title", "type", "date", "time", "description", "status"]}
                onCreate={createSimple}
                onDelete={deleteRow}
              />
            )}

            {active === "alliances" && (
              <Manager
                title="Alliance Manager"
                table="alliances"
                rows={alliances}
                fields={["clan_name", "alliance_tag", "leader_instagram", "status", "notes"]}
                onCreate={createSimple}
                onDelete={deleteRow}
              />
            )}

            {active === "content" && (
              <Manager
                title="Content Planner"
                table="content_plan"
                rows={contentPlan}
                fields={["title", "type", "date", "status", "notes"]}
                onCreate={createSimple}
                onDelete={deleteRow}
              />
            )}

            {active === "settings" && (
              <Card>
                <h3 className="text-2xl font-black">Settings</h3>
                <p className="mt-3 text-zinc-400">SOUL HQ is running in Supabase full-stack mode. Use SQL files for schema and seed data.</p>
                <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
                  Alliance tag: <b>SYN</b><br />
                  Tagline: <b>Respect • Loyalty • Skill</b><br />
                  Fair-play only: <b>enabled by project rules</b>
                </div>
              </Card>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function ResponsiveTable({
  rows,
  columns,
  actions
}: {
  rows: Row[];
  columns: string[];
  actions?: (row: Row) => ReactNode;
}) {
  if (!rows.length) return <p className="mt-4 text-zinc-500">No records found.</p>;

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-white/5 text-zinc-400">
            <tr>
              {columns.map((c) => <th key={c} className="px-4 py-3 font-bold">{c.replace("_", " ")}</th>)}
              {actions ? <th className="px-4 py-3">Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-white/10">
                {columns.map((c) => <td key={c} className="px-4 py-3">{String(row[c] ?? "—")}</td>)}
                {actions ? <td className="px-4 py-3">{actions(row)}</td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 p-3 lg:hidden">
        {rows.map((row) => (
          <div key={row.id} className="rounded-2xl border border-white/10 bg-black/30 p-4">
            {columns.map((c) => (
              <p key={c} className="flex justify-between gap-4 border-b border-white/5 py-2 text-sm">
                <span className="text-zinc-500">{c.replace("_", " ")}</span>
                <span className="text-right">{String(row[c] ?? "—")}</span>
              </p>
            ))}
            {actions ? <div className="mt-3">{actions(row)}</div> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function Manager({
  title,
  table,
  rows,
  fields,
  onCreate,
  onDelete
}: {
  title: string;
  table: TableName;
  rows: Row[];
  fields: string[];
  onCreate: (table: TableName, formData: FormData) => Promise<void>;
  onDelete: (table: TableName, id: string) => Promise<void>;
}) {
  return (
    <div className="grid gap-6">
      <Card>
        <h3 className="text-2xl font-black">{title}</h3>
        <form action={(formData) => onCreate(table, formData)} className="mt-4 grid gap-3 md:grid-cols-3">
          {fields.map((field) => (
            field.includes("description") || field.includes("notes") ? (
              <Textarea key={field} name={field} placeholder={field.replace("_", " ")} className="md:col-span-3" />
            ) : (
              <Input
                key={field}
                name={field}
                placeholder={field.replace("_", " ")}
                type={field === "date" ? "date" : field === "time" ? "time" : "text"}
                required={["title", "clan_name"].includes(field)}
              />
            )
          ))}
          <Button className="md:col-span-3">Create</Button>
        </form>
      </Card>

      <Card>
        <ResponsiveTable rows={rows} columns={fields} actions={(row) => <Button variant="danger" onClick={() => onDelete(table, row.id)}>Delete</Button>} />
      </Card>
    </div>
  );
}
