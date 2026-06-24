import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "red",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: "red" | "green" | "gold" | "gray" }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-1 text-xs font-bold",
        tone === "red" && "border-red-500/30 bg-red-500/10 text-red-200",
        tone === "green" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
        tone === "gold" && "border-yellow-500/30 bg-yellow-500/10 text-yellow-100",
        tone === "gray" && "border-white/10 bg-white/5 text-zinc-300",
        className
      )}
      {...props}
    />
  );
}
