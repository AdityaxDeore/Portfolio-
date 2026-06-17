"use client";

import { TimelineContent } from "@/components/ui/timeline-animation";
import { GithubIcon } from "@/components/icons/social-icons";
import { useRef } from "react";

export function AboutSection2() {
  const heroRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.8,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 40,
      opacity: 0,
    },
  };

  const textVariants = {
    visible: (i: number) => ({
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };

  return (
    <section className="py-20 bg-transparent text-foreground flex items-center justify-center font-sans w-full border-t border-border/40">
      <div className="max-w-6xl mx-auto w-full" ref={heroRef}>
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Right side - Content */}
          <div className="flex-1">
            <TimelineContent
              as="h1"
              animationNum={0}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="sm:text-4xl text-2xl md:text-5xl !leading-[110%] font-semibold text-foreground mb-8 font-heading"
            >
              We are{" "}
              <TimelineContent
                as="span"
                animationNum={1}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-blue-500 border-2 border-blue-500/50 inline-block xl:h-16 border-dotted px-2 rounded-md"
              >
                rethinking
              </TimelineContent>{" "}
              software and ML systems to be more reliable, intelligent, and user-first. Our
              goal is to continually raise the bar and{" "}
              <TimelineContent
                as="span"
                animationNum={2}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-orange-500 border-2 border-orange-500/50 inline-block xl:h-16 border-dotted px-2 rounded-md"
              >
                challenge
              </TimelineContent>{" "}
              how engineering solutions should{" "}
              <TimelineContent
                as="span"
                animationNum={3}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-green-500 border-2 border-green-500/50 inline-block xl:h-16 border-dotted px-2 rounded-md"
              >
                work for you.
              </TimelineContent>
            </TimelineContent>

            <div className="mt-12 flex gap-4 justify-between flex-wrap items-center">
              <TimelineContent
                as="div"
                animationNum={4}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="mb-4 sm:text-xl text-xs"
              >
                <div className="font-medium text-foreground mb-1 capitalize">
                  Building intelligent products that
                </div>
                <div className="text-muted-foreground font-semibold uppercase">
                  take you further
                </div>
              </TimelineContent>

              <TimelineContent
                as="a"
                animationNum={5}
                timelineRef={heroRef}
                customVariants={textVariants}
                href="https://github.com/AdityaxDeore"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-500 transition-colors gap-2 font-medium shadow-lg shadow-blue-600/30 text-white h-12 px-6 rounded-full text-sm inline-flex items-center cursor-pointer"
              >
                <GithubIcon size={16} />
                Connect on GitHub
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection2;
