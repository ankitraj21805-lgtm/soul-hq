import Link from "next/link";
import { Crown } from "lucide-react";

const nav = [
  ["Home", "/"],
  ["About", "/about"],
  ["Members", "/members"],
  ["Join", "/join"],
  ["Events", "/events"],
  ["Alliance", "/alliance"],
  ["Gallery", "/gallery"],
  ["Rules", "/rules"]
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/65 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-black tracking-widest">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-soul-red/15 text-soul-red">
            <Crown size={18} />
          </span>
          SOUL HQ
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-zinc-300 hover:bg-white/10 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-black text-white hover:border-soul-red/60"
          >
            Login
          </Link>
          <Link
            href="/join"
            className="hidden rounded-full bg-soul-red px-4 py-2 text-sm font-black text-white shadow-neon sm:inline-flex"
          >
            Join SOUL
          </Link>
        </div>
      </div>

      <nav className="scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-4 lg:hidden">
        {nav.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-300"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
