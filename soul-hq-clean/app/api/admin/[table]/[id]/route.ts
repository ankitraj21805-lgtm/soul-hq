import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

const allowedTables = new Set([
  "members",
  "attendance",
  "warnings",
  "tryouts",
  "events",
  "alliances",
  "content_plan"
]);

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ table: string; id: string }> }
) {
  const { table, id } = await context.params;
  if (!allowedTables.has(table)) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 });
  }

  const auth = await requireAdmin(request);
  if ("error" in auth) return auth.error;

  const body = await request.json();
  const { data, error } = await auth.supabase
    .from(table)
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ table: string; id: string }> }
) {
  const { table, id } = await context.params;
  if (!allowedTables.has(table)) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 });
  }

  const auth = await requireAdmin(request);
  if ("error" in auth) return auth.error;

  const { error } = await auth.supabase.from(table).delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
