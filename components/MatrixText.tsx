"use client";

import { motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

interface LetterState {
  char: string;
  isMatrix: boolean;
  isSpace: boolean;
}

interface MatrixTextProps {
  text: string;
  repeatDelay?: number;
  letterInterval?: number;
  animationDuration?: number;
}

export default function MatrixText({
  text,
  repeatDelay = 5000,
  letterInterval = 80,
  animationDuration = 450,
}: MatrixTextProps) {

  const [letters, setLetters] =
    useState<LetterState[]>(() =>
      text.split("").map((char) => ({
        char,
        isMatrix: false,
        isSpace: char === " ",
      }))
    );

  const randomCharacter = useCallback(() => {
    return Math.random() > 0.5
      ? "0"
      : "1";
  }, []);

  useEffect(() => {

    let timeout: ReturnType<typeof setTimeout>;

    const runAnimation = () => {

      text.split("").forEach(
        (_, index) => {

          setTimeout(() => {

            if (text[index] === " ") return;

            setLetters((previous) => {

              const next = [...previous];

              next[index] = {
                ...next[index],
                char: randomCharacter(),
                isMatrix: true,
              };

              return next;
            });

            setTimeout(() => {

              setLetters((previous) => {

                const next = [...previous];

                next[index] = {
                  char: text[index],
                  isMatrix: false,
                  isSpace:
                    text[index] === " ",
                };

                return next;
              });

            }, animationDuration);

          }, index * letterInterval);

        }
      );

      timeout = setTimeout(
        runAnimation,
        repeatDelay +
          text.length * letterInterval
      );
    };

    runAnimation();

    return () => {
      clearTimeout(timeout);
    };

  }, [
    animationDuration,
    letterInterval,
    randomCharacter,
    repeatDelay,
    text,
  ]);

  return (
    <div className="flex items-center justify-center">

      <div className="flex flex-wrap justify-center">

        {letters.map(
          (letter, index) => (

            <motion.span
              key={index}

              animate={{
                color: letter.isMatrix
                  ? "#00ff66"
                  : "#ffffff",

                textShadow:
                  letter.isMatrix
                    ? "0 0 14px rgba(0,255,102,0.8)"
                    : "none",
              }}

              transition={{
                duration: 0.15,
              }}

              className="
                inline-block
                w-[1ch]
                text-center
                font-mono
                font-bold
                text-3xl
                md:text-5xl
              "
            >

              {letter.isSpace
                ? "\u00A0"
                : letter.char}

            </motion.span>

          )
        )}

      </div>

    </div>
  );
}
