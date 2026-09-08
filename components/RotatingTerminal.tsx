"use client";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useEffect,
  useState,
} from "react";

const sections = [
  [
    "$ initializing aliakbarhyder9",
    "✔ loading developer environment",
    "✔ synchronizing GitHub activity",
    "✔ preparing creative systems",
    "● STATUS: ONLINE",
  ],

  [
    "$ system status",
    "◉ PONDERING",
    "████████████████░░░░",
    "exploring possibilities...",
    "● awaiting next operation...",
  ],

  [
    "$ git activity --inspect",
    "✔ commits detected",
    "✔ pull requests monitored",
    "✔ repositories synchronized",
    "● everything appears operational",
  ],

  [
    "$ build --production",
    "compiling ideas...",
    "debugging reality...",
    "optimizing questionable decisions...",
    "✔ process completed",
  ],

  [
    "$ experimental_process",
    "decoding...",
    "executing...",
    "discombobulating...",
    "✔ somehow successful",
  ],
];

interface RotatingTerminalProps {
  sectionDuration?: number;
  typingSpeed?: number;
}

export default function RotatingTerminal({
  sectionDuration = 60000,
  typingSpeed = 35,
}: RotatingTerminalProps) {
  const [sectionIndex, setSectionIndex] =
    useState(0);

  const [visibleLines, setVisibleLines] =
    useState<number[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function runSection() {
      setVisibleLines([]);

      for (
        let index = 0;
        index < sections[sectionIndex].length;
        index++
      ) {
        if (cancelled) return;

        await new Promise((resolve) =>
          setTimeout(resolve, typingSpeed * 8)
        );

        setVisibleLines((previous) => [
          ...previous,
          index,
        ]);
      }

      await new Promise((resolve) =>
        setTimeout(resolve, sectionDuration)
      );

      if (cancelled) return;

      setVisibleLines([]);

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      if (cancelled) return;

      setSectionIndex(
        (previous) =>
          (previous + 1) % sections.length
      );
    }

    runSection();

    return () => {
      cancelled = true;
    };
  }, [
    sectionIndex,
    sectionDuration,
    typingSpeed,
  ]);

  const currentSection =
    sections[sectionIndex];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-green-500/20 bg-[#030604] p-6 font-mono shadow-[0_0_50px_rgba(0,255,102,0.08)]">
      <div className="mb-6 flex items-center justify-between border-b border-green-500/10 pb-4">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-green-400" />
          <div className="h-3 w-3 rounded-full bg-green-600/60" />
          <div className="h-3 w-3 rounded-full bg-green-900/60" />
        </div>

        <span className="text-xs tracking-[0.3em] text-green-400/60">
          ALI@SYSTEM
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={sectionIndex}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            y: -10,
          }}
          className="min-h-[230px] space-y-3"
        >
          {currentSection.map(
            (line, index) =>
              visibleLines.includes(index) && (
                <motion.div
                  key={`${sectionIndex}-${index}`}
                  initial={{
                    opacity: 0,
                    x: -8,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className={
                    line.startsWith("✔")
                      ? "text-green-300"
                      : line.startsWith("●")
                        ? "text-green-400"
                        : line.startsWith("$")
                          ? "text-green-200"
                          : "text-green-100/70"
                  }
                >
                  {line}
                </motion.div>
              )
          )}
        </motion.div>
      </AnimatePresence>

      <motion.div
        animate={{
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
        className="text-green-400"
      >
        _
      </motion.div>
    </div>
  );
}
