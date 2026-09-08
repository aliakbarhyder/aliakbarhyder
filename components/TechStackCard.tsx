"use client";

import { motion } from "motion/react";
import {
  useState,
} from "react";

interface TechStackCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon?: string;
}

export default function TechStackCard({
  title,
  subtitle,
  description,
  features,
  icon = "◈",
}: TechStackCardProps) {
  const [flipped, setFlipped] =
    useState(false);

  return (
    <div
      className="h-[300px] w-full max-w-[320px] [perspective:1600px]"
      onMouseEnter={() =>
        setFlipped(true)
      }
      onMouseLeave={() =>
        setFlipped(false)
      }
    >
      <motion.div
        animate={{
          rotateY: flipped ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-green-500/15 bg-[#050806] p-6 [backface-visibility:hidden]">
          <div>
            <div className="text-4xl text-green-400">
              {icon}
            </div>

            <p className="mt-8 font-mono text-xs tracking-[0.3em] text-green-400/50">
              TECH STACK
            </p>

            <h3 className="mt-3 text-xl font-semibold text-green-50">
              {title}
            </h3>

            <p className="mt-2 text-sm text-green-100/50">
              {subtitle}
            </p>
          </div>

          <div className="font-mono text-xs text-green-400/60">
            HOVER TO INSPECT →
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-green-500/20 bg-[#07100a] p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div>
            <h3 className="text-xl font-semibold text-green-50">
              {title}
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-green-100/60">
              {description}
            </p>

            <div className="mt-6 space-y-3">
              {features.map(
                (feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-green-200"
                  >
                    <span className="text-green-400">
                      →
                    </span>

                    {feature}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="font-mono text-xs text-green-400/50">
            SYSTEM VERIFIED
          </div>
        </div>
      </motion.div>
    </div>
  );
}
