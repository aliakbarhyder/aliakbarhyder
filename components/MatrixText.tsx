"use client";

import { motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

interface LetterState {
  value: string;
  matrix: boolean;
}

interface MatrixTextProps {
  text?: string;
  interval?: number;
}

export default function MatrixText({
  text = "ALI AKBAR HYDER",
  interval = 5000,
}: MatrixTextProps) {
  const [letters, setLetters] =
    useState<LetterState[]>(
      text.split("").map((value) => ({
        value,
        matrix: false,
      }))
    );

  const scramble = useCallback(() => {
    const original = text.split("");

    original.forEach((character, index) => {
      if (character === " ") return;

      setTimeout(() => {
        setLetters((previous) => {
          const next = [...previous];

          next[index] = {
            value:
              Math.random() > 0.5
                ? "1"
                : "0",
            matrix: true,
          };

          return next;
        });
      }, index * 70);

      setTimeout(() => {
        setLetters((previous) => {
          const next = [...previous];

          next[index] = {
            value: character,
            matrix: false,
          };

          return next;
        });
      }, index * 70 + 500);
    });
  }, [text]);

  useEffect(() => {
    scramble();

    const timer =
      window.setInterval(scramble, interval);

    return () =>
      window.clearInterval(timer);
  }, [interval, scramble]);

  return (
    <div className="flex flex-wrap justify-center font-mono">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          animate={{
            color: letter.matrix
              ? "#00ff66"
              : "#d8ffe4",
            textShadow: letter.matrix
              ? "0 0 14px rgba(0,255,102,0.9)"
              : "0 0 0px rgba(0,0,0,0)",
          }}
          transition={{
            duration: 0.15,
          }}
          className="inline-block text-3xl font-bold tracking-[0.18em] md:text-5xl"
        >
          {letter.value === " "
            ? "\u00A0"
            : letter.value}
        </motion.span>
      ))}
    </div>
  );
}
