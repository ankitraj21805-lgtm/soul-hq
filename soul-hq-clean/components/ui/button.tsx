import * as React from "react";
import { cn } from "@/lib/utils";

export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger" | "outline";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-black transition active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-soul-red text-white shadow-neon hover:bg-red-500",
        variant === "ghost" && "bg-white/5 text-white hover:bg-white/10",
        variant === "danger" && "bg-red-950 text-red-100 hover:bg-red-900",
        variant === "outline" && "border border-white/15 bg-black/30 text-white hover:border-soul-red/60",
        className
      )}
      {...props}
    />
  );
}
