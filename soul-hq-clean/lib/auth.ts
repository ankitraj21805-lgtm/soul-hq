import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/server";

export async function requireAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return {
      error: NextResponse.json({ error: "Missing session token" }, { status: 401 })
    };
  }

  const supabase = createAdminSupabaseClient();
  const { data: userData, error: userError } = await supabase.auth.getUser(token);

  if (userError || !userData.user) {
    return {
      error: NextResponse.json({ error: "Invalid session" }, { status: 401 })
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id,email,is_admin")
    .eq("id", userData.user.id)
    .single();

  if (profileError || !profile?.is_admin) {
    return {
      error: NextResponse.json({ error: "Admin access required" }, { status: 403 })
    };
  }

  return {
    supabase,
    user: userData.user,
    profile
  };
}
