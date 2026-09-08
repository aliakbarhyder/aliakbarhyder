"use client";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useEffect,
  useState,
} from "react";

interface Sequence {
  command: string;
  lines: string[];
}

const sequences: Sequence[] = [

  {
    command: "ponder --architecture",

    lines: [
      "[INFO] Inspecting the problem...",
      "[INFO] Exploring possible solutions...",
      "[INFO] Thinking harder...",
      "[OK] Architecture selected.",
    ],
  },

  {
    command: "analyze --project",

    lines: [
      "[INFO] Scanning architecture...",
      "[INFO] Evaluating implementation...",
      "[INFO] Identifying improvements...",
      "[OK] Analysis complete.",
    ],
  },

  {
    command: "debug --deep",

    lines: [
      "[INFO] Searching for issues...",
      "[INFO] Inspecting suspicious behavior...",
      "[WARN] Something looks questionable.",
      "[INFO] Investigating...",
      "[OK] Issue resolved.",
    ],
  },

  {
    command: "execute",

    lines: [
      "[INFO] Initializing sequence...",
      "[INFO] Running implementation...",
      "[INFO] Monitoring output...",
      "[OK] Execution complete.",
    ],
  },

  {
    command: "publish",

    lines: [
      "[INFO] Preparing production build...",
      "[INFO] Optimizing assets...",
      "[INFO] Running final checks...",
      "[OK] Deployment complete.",
    ],
  },

  {
    command: "discombobulate",

    lines: [
      "[INFO] Rearranging questionable variables...",
      "[INFO] Introducing controlled chaos...",
      "[INFO] Recovering from chaos...",
      "[OK] System somehow improved.",
    ],
  },

];

export default function RotatingTerminal() {

  const [
    sequenceIndex,
    setSequenceIndex,
  ] = useState(0);

  const [
    visibleLines,
    setVisibleLines,
  ] = useState<string[]>([]);

  const [
    clearing,
    setClearing,
  ] = useState(false);

  const sequence =
    sequences[sequenceIndex];

  useEffect(() => {

    setVisibleLines([]);
    setClearing(false);

    const allLines = [
      `$ ${sequence.command}`,
      ...sequence.lines,
      "",
      "$ _",
    ];

    let lineIndex = 0;

    const interval =
      setInterval(() => {

        if (
          lineIndex >= allLines.length
        ) {
          clearInterval(interval);
          return;
        }

        setVisibleLines(
          (previous) => [
            ...previous,
            allLines[lineIndex],
          ]
        );

        lineIndex++;

      }, 700);

    return () => {
      clearInterval(interval);
    };

  }, [
    sequence,
    sequenceIndex,
  ]);

  useEffect(() => {

    const cycleTime = 60000;

    const timeout =
      setTimeout(() => {

        setClearing(true);

        setTimeout(() => {

          setSequenceIndex(
            (previous) =>
              (
                previous + 1
              ) % sequences.length
          );

        }, 1000);

      }, cycleTime);

    return () => {
      clearTimeout(timeout);
    };

  }, [
    sequenceIndex,
  ]);

  return (

    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#0d1117]
        font-mono
        shadow-2xl
      "
    >

      <div
        className="
          flex
          gap-2
          border-b
          border-white/10
          px-5
          py-4
        "
      >

        <div className="
          h-3
          w-3
          rounded-full
          bg-red-400
        " />

        <div className="
          h-3
          w-3
          rounded-full
          bg-yellow-400
        " />

        <div className="
          h-3
          w-3
          rounded-full
          bg-green-400
        " />

      </div>

      <AnimatePresence
        mode="wait"
      >

        {!clearing && (

          <motion.div
            key={sequenceIndex}

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
              height: 0,
            }}

            className="
              min-h-[320px]
              space-y-3
              p-6
              text-sm
              md:text-base
            "
          >

            {visibleLines.map(
              (
                line,
                index
              ) => (

                <motion.div
                  key={index}

                  initial={{
                    opacity: 0,
                    y: 5,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  className={
                    line.includes("[OK]")
                      ? "text-green-400"
                      : line.includes("[WARN]")
                      ? "text-yellow-400"
                      : line.startsWith("$")
                      ? "font-bold text-cyan-400"
                      : "text-zinc-300"
                  }
                >

                  {line}

                </motion.div>

              )
            )}

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}
