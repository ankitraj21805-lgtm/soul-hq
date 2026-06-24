export type JsonRecord = Record<string, string | number | boolean | null | undefined>;

export type Member = {
  id: string;
  real_name: string;
  game_name: string;
  instagram_id: string | null;
  role: string;
  team: string;
  join_date: string | null;
  activity_status: "Active" | "Trial" | "Hold" | "Inactive";
  driving_skill: number;
  game_skill: number;
  teamwork: number;
  behavior: number;
  warnings_count: number;
  promotion_status: "Trial Running" | "Eligible" | "Hold" | "Promoted" | "Demoted" | "Remove Review";
  alliance_tag: string;
  notes: string | null;
  created_at?: string;
};

export type Tryout = {
  id: string;
  name: string;
  game_name: string;
  instagram_id: string;
  active_time: string | null;
  driving_skill: number | null;
  game_skill: number | null;
  message: string | null;
  status: "Pending" | "Accepted" | "Rejected";
  created_at?: string;
};

export type EventItem = {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string | null;
  description: string | null;
  status: "Draft" | "Planned" | "Live" | "Completed" | "Cancelled";
};

export type Alliance = {
  id: string;
  clan_name: string;
  alliance_tag: string;
  leader_instagram: string | null;
  status: "Pending" | "Active" | "Hold" | "Ended";
  notes: string | null;
};

export type ContentPlan = {
  id: string;
  title: string;
  type: string;
  date: string | null;
  status: "Idea" | "Draft" | "Ready" | "Posted";
  notes: string | null;
};
