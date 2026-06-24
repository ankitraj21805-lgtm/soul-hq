import type { Alliance, ContentPlan, EventItem, Member } from "@/lib/types";

export const sampleMembers: Member[] = [
  { id: "1", real_name: "Ankit Sharma", game_name: "SOUL Ankit", instagram_id: "@ankitraj21805", role: "Founder", team: "Core", join_date: "2026-06-01", activity_status: "Active", driving_skill: 92, game_skill: 88, teamwork: 94, behavior: 95, warnings_count: 0, promotion_status: "Promoted", alliance_tag: "SYN", notes: "Clan lead" },
  { id: "2", real_name: "Rahul Verma", game_name: "SOUL Phantom", instagram_id: "@phantom", role: "Co-Leader", team: "Core", join_date: "2026-06-02", activity_status: "Active", driving_skill: 87, game_skill: 84, teamwork: 90, behavior: 88, warnings_count: 1, promotion_status: "Eligible", alliance_tag: "SYN", notes: "" },
  { id: "3", real_name: "Aman Singh", game_name: "SOUL Viper", instagram_id: "@viper", role: "Captain", team: "Alpha", join_date: "2026-06-02", activity_status: "Active", driving_skill: 90, game_skill: 86, teamwork: 89, behavior: 91, warnings_count: 0, promotion_status: "Promoted", alliance_tag: "SYN", notes: "" },
  { id: "4", real_name: "Rohit Kumar", game_name: "SOUL Nitro", instagram_id: "@nitro", role: "Elite Driver", team: "Alpha", join_date: "2026-06-03", activity_status: "Active", driving_skill: 94, game_skill: 80, teamwork: 87, behavior: 89, warnings_count: 0, promotion_status: "Eligible", alliance_tag: "SYN", notes: "" },
  { id: "5", real_name: "Aditya Raj", game_name: "SOUL Shadow", instagram_id: "@shadow", role: "Shooter", team: "Alpha", join_date: "2026-06-04", activity_status: "Active", driving_skill: 81, game_skill: 91, teamwork: 86, behavior: 85, warnings_count: 1, promotion_status: "Hold", alliance_tag: "SYN", notes: "" },
  { id: "6", real_name: "Kunal Das", game_name: "SOUL Blaze", instagram_id: "@blaze", role: "Member", team: "Bravo", join_date: "2026-06-05", activity_status: "Trial", driving_skill: 77, game_skill: 78, teamwork: 80, behavior: 83, warnings_count: 0, promotion_status: "Trial Running", alliance_tag: "SYN", notes: "" },
  { id: "7", real_name: "Deepak Yadav", game_name: "SOUL Racer", instagram_id: "@racer", role: "Driver", team: "Bravo", join_date: "2026-06-05", activity_status: "Active", driving_skill: 89, game_skill: 75, teamwork: 82, behavior: 84, warnings_count: 0, promotion_status: "Eligible", alliance_tag: "SYN", notes: "" },
  { id: "8", real_name: "Sahil Khan", game_name: "SOUL Reaper", instagram_id: "@reaper", role: "Member", team: "Bravo", join_date: "2026-06-06", activity_status: "Active", driving_skill: 78, game_skill: 83, teamwork: 79, behavior: 78, warnings_count: 2, promotion_status: "Hold", alliance_tag: "SYN", notes: "" },
  { id: "9", real_name: "Nikhil Jain", game_name: "SOUL Hawk", instagram_id: "@hawk", role: "Scout", team: "Charlie", join_date: "2026-06-07", activity_status: "Active", driving_skill: 82, game_skill: 82, teamwork: 86, behavior: 88, warnings_count: 0, promotion_status: "Promoted", alliance_tag: "SYN", notes: "" },
  { id: "10", real_name: "Mohit Patel", game_name: "SOUL Mafia", instagram_id: "@mafia", role: "Member", team: "Charlie", join_date: "2026-06-07", activity_status: "Hold", driving_skill: 75, game_skill: 76, teamwork: 73, behavior: 70, warnings_count: 2, promotion_status: "Hold", alliance_tag: "SYN", notes: "" },
  { id: "11", real_name: "Harsh Gupta", game_name: "SOUL King", instagram_id: "@king", role: "Content Lead", team: "Media", join_date: "2026-06-08", activity_status: "Active", driving_skill: 80, game_skill: 79, teamwork: 91, behavior: 90, warnings_count: 0, promotion_status: "Eligible", alliance_tag: "SYN", notes: "" },
  { id: "12", real_name: "Vikas Thakur", game_name: "SOUL Crown", instagram_id: "@crown", role: "Moderator", team: "Core", join_date: "2026-06-08", activity_status: "Active", driving_skill: 84, game_skill: 81, teamwork: 92, behavior: 92, warnings_count: 0, promotion_status: "Promoted", alliance_tag: "SYN", notes: "" },
  { id: "13", real_name: "Aryan Mehta", game_name: "SOUL Drift", instagram_id: "@drift", role: "Driver", team: "Alpha", join_date: "2026-06-09", activity_status: "Active", driving_skill: 93, game_skill: 77, teamwork: 85, behavior: 86, warnings_count: 0, promotion_status: "Eligible", alliance_tag: "SYN", notes: "" },
  { id: "14", real_name: "Piyush Rai", game_name: "SOUL Ghost", instagram_id: "@ghost", role: "Member", team: "Charlie", join_date: "2026-06-09", activity_status: "Trial", driving_skill: 73, game_skill: 76, teamwork: 75, behavior: 80, warnings_count: 0, promotion_status: "Trial Running", alliance_tag: "SYN", notes: "" },
  { id: "15", real_name: "Satyam Roy", game_name: "SOUL Bullet", instagram_id: "@bullet", role: "Shooter", team: "Bravo", join_date: "2026-06-10", activity_status: "Active", driving_skill: 79, game_skill: 90, teamwork: 84, behavior: 85, warnings_count: 1, promotion_status: "Eligible", alliance_tag: "SYN", notes: "" },
  { id: "16", real_name: "Yash Sharma", game_name: "SOUL Knight", instagram_id: "@knight", role: "Member", team: "Charlie", join_date: "2026-06-10", activity_status: "Inactive", driving_skill: 70, game_skill: 70, teamwork: 70, behavior: 70, warnings_count: 3, promotion_status: "Remove Review", alliance_tag: "SYN", notes: "" },
  { id: "17", real_name: "Manish Kumar", game_name: "SOUL Falcon", instagram_id: "@falcon", role: "Event Lead", team: "Core", join_date: "2026-06-11", activity_status: "Active", driving_skill: 83, game_skill: 82, teamwork: 93, behavior: 91, warnings_count: 0, promotion_status: "Promoted", alliance_tag: "SYN", notes: "" },
  { id: "18", real_name: "Saurav Mishra", game_name: "SOUL Venom", instagram_id: "@venom", role: "Member", team: "Bravo", join_date: "2026-06-11", activity_status: "Active", driving_skill: 76, game_skill: 84, teamwork: 82, behavior: 80, warnings_count: 1, promotion_status: "Hold", alliance_tag: "SYN", notes: "" },
  { id: "19", real_name: "Abhishek Tiwari", game_name: "SOUL Royal", instagram_id: "@royal", role: "Elite", team: "Alpha", join_date: "2026-06-12", activity_status: "Active", driving_skill: 88, game_skill: 87, teamwork: 89, behavior: 90, warnings_count: 0, promotion_status: "Eligible", alliance_tag: "SYN", notes: "" },
  { id: "20", real_name: "Ritesh Pandey", game_name: "SOUL Wolf", instagram_id: "@wolf", role: "Member", team: "Charlie", join_date: "2026-06-12", activity_status: "Trial", driving_skill: 74, game_skill: 75, teamwork: 78, behavior: 79, warnings_count: 0, promotion_status: "Trial Running", alliance_tag: "SYN", notes: "" }
];

export const sampleEvents: EventItem[] = [
  { id: "1", title: "SOUL Night Run", type: "Clan Meet", date: "2026-06-28", time: "22:00", description: "Clean driving session and team coordination.", status: "Planned" },
  { id: "2", title: "SYN Alliance Meet", type: "Alliance", date: "2026-06-30", time: "21:30", description: "Alliance rules and coordination.", status: "Planned" },
  { id: "3", title: "Cinematic Car Shoot", type: "Content", date: "2026-07-02", time: "23:00", description: "Instagram reels and member shots.", status: "Draft" }
];

export const sampleAlliances: Alliance[] = [
  { id: "1", clan_name: "Royal Drift Crew", alliance_tag: "SYN", leader_instagram: "@royaldrift", status: "Active", notes: "Do not attack SYN players." },
  { id: "2", clan_name: "Night Racers", alliance_tag: "SYN", leader_instagram: "@nightracers", status: "Pending", notes: "Verification pending." },
  { id: "3", clan_name: "Blackline Mafia", alliance_tag: "SYN", leader_instagram: "@blackline", status: "Active", notes: "Fair-play alliance." }
];

export const sampleContentPlan: ContentPlan[] = [
  { id: "1", title: "SOUL comeback story", type: "Instagram Story", date: "2026-06-29", status: "Ready", notes: "Dark red cinematic story." },
  { id: "2", title: "SYN alliance announcement", type: "Post", date: "2026-06-30", status: "Draft", notes: "Explain SYN rules clearly." },
  { id: "3", title: "Member role reveal", type: "Reel", date: "2026-07-03", status: "Idea", notes: "Show roles and cars." }
];
