import { cn } from "@/lib/utils";
import React from "react";

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export default function GridBackgroundDemo({ children, className }: GridBackgroundProps) {
  return (
    // Removed radial masks and fixed background colors
    <div className={cn("relative min-h-screen w-full bg-slate-50 dark:bg-zinc-950", className)}>
      
      {/* The Full Grid - No Mask */}
      <div
        className={cn(
          "absolute inset-0 z-0",
          "[background-size:40px_40px]",
          // Light Mode: Stronger Grey (#d1d5db)
          "[background-image:linear-gradient(to_right,#d1d5db_1px,transparent_1px),linear-gradient(to_bottom,#d1d5db_1px,transparent_1px)]",
          // Dark Mode: Much brighter lines (#333333 or #3f3f46) to make boxes look "Dark & Sharp"
          "dark:[background-image:linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)]",
        )}
      />

      {/* Content Layer */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}