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

export async function GET(request: NextRequest, context: { params: Promise<{ table: string }> }) {
  const { table } = await context.params;
  if (!allowedTables.has(table)) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 });
  }

  const auth = await requireAdmin(request);
  if ("error" in auth) return auth.error;

  const { data, error } = await auth.supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest, context: { params: Promise<{ table: string }> }) {
  const { table } = await context.params;
  if (!allowedTables.has(table)) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 });
  }

  const auth = await requireAdmin(request);
  if ("error" in auth) return auth.error;

  const body = await request.json();
  const { data, error } = await auth.supabase.from(table).insert(body).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
