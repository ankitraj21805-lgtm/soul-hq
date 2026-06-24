# SOUL HQ — Full Stack Clan Website

Premium responsive full-stack website for the MadOut 2 gaming clan **SOUL Syndicate**.

**Website:** SOUL HQ  
**Alliance tag:** SYN  
**Tagline:** Respect • Loyalty • Skill  
**Theme:** dark mafia-inspired luxury esports UI, black/red neon, glassmorphism, crown branding, fair-play only.

---

## What is included

### Public Pages
- Home
- About
- Members
- Join / Tryout Form
- Events
- Alliance
- Gallery
- Rules
- Login

### Admin Dashboard
- Dashboard overview
- Member management: add, edit, delete
- Attendance tracker: IN, LATE, OUT, NO REPLY
- Warning tracker
- Promotion tracker
- Tryout requests: accept/reject
- Event manager
- Alliance manager
- Content planner
- Settings

### Full Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn-style UI components
- Supabase Auth
- Supabase Postgres database
- API routes with admin protection
- Vercel ready

---

## Install

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Supabase Setup

1. Create a Supabase project.
2. Open **SQL Editor**.
3. Run:

```text
supabase/schema.sql
```

4. Run:

```text
supabase/seed.sql
```

5. Create a user in Supabase Auth or sign up from `/login`.
6. Make yourself admin:

```sql
update public.profiles
set is_admin = true
where email = 'your-email@example.com';
```

7. Add environment variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Restart dev server after adding `.env.local`.

---

## Vercel Deployment

1. Push this folder to GitHub.
2. Import repo in Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.
5. In Supabase Auth settings, add your Vercel URL to:
   - Site URL
   - Redirect URLs

Example redirect URL:

```text
https://your-site.vercel.app/auth/callback
```

---

## Attendance Rules

- IN + played = 10 points
- Late = 7 points
- OUT with reason = 5 points
- No reply = 0 points

## Warning Rules

- 1 warning = Reminder
- 2 warnings = Role Hold
- 3 warnings = Remove Review

## Fair Play

This project intentionally excludes hacks, cheats, exploits, unsafe tooling, harassment tools, or toxic features.
