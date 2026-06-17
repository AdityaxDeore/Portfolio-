"use client";

import React from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

interface TimelineContentProps extends React.HTMLAttributes<HTMLElement> {
  as?: string | React.ComponentType<any>;
  animationNum: number;
  timelineRef?: React.RefObject<HTMLElement | null>;
  customVariants: Variants;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export function TimelineContent({
  as = "div",
  animationNum,
  timelineRef: _timelineRef,
  customVariants,
  className,
  children,
  ...props
}: TimelineContentProps) {
  // Use motion(as as any) to construct the component dynamically
  const MotionComponent = motion(as as any);

  return (
    <MotionComponent
      className={cn(className)}
      variants={customVariants}
      custom={animationNum}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
