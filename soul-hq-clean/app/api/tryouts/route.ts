import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";

export async function POST(request: NextRequest) {
  if (!isSupabaseAdminConfigured) {
    return NextResponse.json(
      { error: "Supabase is not configured. Add env vars first." },
      { status: 500 }
    );
  }

  const body = await request.json();

  if (!body.name || !body.game_name || !body.instagram_id) {
    return NextResponse.json(
      { error: "Name, game name and Instagram ID are required." },
      { status: 400 }
    );
  }

  const supabase = createAdminSupabaseClient();

  const { data, error } = await supabase
    .from("tryouts")
    .insert({
      name: body.name,
      game_name: body.game_name,
      instagram_id: body.instagram_id,
      active_time: body.active_time || null,
      driving_skill: body.driving_skill ? Number(body.driving_skill) : null,
      game_skill: body.game_skill ? Number(body.game_skill) : null,
      message: body.message || null,
      status: "Pending"
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
