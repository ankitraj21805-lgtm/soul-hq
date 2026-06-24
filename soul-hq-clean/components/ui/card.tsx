import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[1.6rem] border border-white/10 bg-white/[.055] p-5 shadow-neon backdrop-blur-xl",
        className
      )}
      {...props}
    />
  );
}
