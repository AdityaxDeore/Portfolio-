"use client";

import { cn } from "@/lib/utils";

type HighlightColor = "red" | "purple" | "green";

interface HighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: HighlightColor;
}

export function Highlight({
  color = "green",
  className,
  style,
  children,
  ...props
}: HighlightProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-[3px] px-1 text-white",
        className
      )}
      style={{
        background: `var(--highlight-${color}-bg)`,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
