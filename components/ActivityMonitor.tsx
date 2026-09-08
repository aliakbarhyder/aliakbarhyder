"use client";

import { motion } from "motion/react";

interface ActivityData {
  label: string;
  current: number;
  target: number;
  unit: string;
  size: number;
  color: string;
}

const activities: ActivityData[] = [
  {
    label: "COMMITS",
    current: 0,
    target: 100,
    unit: "COMMITS",
    size: 200,
    color: "#00ff66",
  },
  {
    label: "PULL REQUESTS",
    current: 0,
    target: 25,
    unit: "PRS",
    size: 160,
    color: "#39ff88",
  },
  {
    label: "REPOSITORIES",
    current: 0,
    target: 20,
    unit: "REPOS",
    size: 120,
    color: "#8cffae",
  },
];

function Circle({
  data,
  index,
}: {
  data: ActivityData;
  index: number;
}) {
  const strokeWidth = 14;

  const radius =
    (data.size - strokeWidth) / 2;

  const circumference =
    radius * Math.PI * 2;

  const percentage =
    Math.min(
      100,
      (data.current / data.target) * 100
    );

  const offset =
    circumference -
    (percentage / 100) * circumference;

  return (
    <motion.svg
      width={data.size}
      height={data.size}
      viewBox={`0 0 ${data.size} ${data.size}`}
      className="absolute"
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay: index * 0.2,
        duration: 0.7,
      }}
    >
      <circle
        cx={data.size / 2}
        cy={data.size / 2}
        r={radius}
        fill="none"
        stroke="rgba(0,255,102,0.08)"
        strokeWidth={strokeWidth}
      />

      <motion.circle
        cx={data.size / 2}
        cy={data.size / 2}
        r={radius}
        fill="none"
        stroke={data.color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{
          strokeDashoffset: circumference,
        }}
        animate={{
          strokeDashoffset: offset,
        }}
        transition={{
          duration: 1.8,
          delay: index * 0.2,
        }}
        style={{
          transformOrigin: "center",
          transform: "rotate(-90deg)",
          filter:
            "drop-shadow(0 0 8px rgba(0,255,102,0.4))",
        }}
      />
    </motion.svg>
  );
}

export default function ActivityMonitor() {
  return (
    <div className="rounded-3xl border border-green-500/15 bg-[#050806] p-8">
      <div className="mb-8 text-center">
        <p className="font-mono text-xs tracking-[0.35em] text-green-400/60">
          GITHUB ACTIVITY
        </p>

        <h2 className="mt-3 text-2xl font-semibold text-green-50">
          Development Monitor
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
        <div className="relative h-[200px] w-[200px]">
          {activities.map(
            (activity, index) => (
              <Circle
                key={activity.label}
                data={activity}
                index={index}
              />
            )
          )}
        </div>

        <div className="space-y-6">
          {activities.map(
            (activity) => (
              <div
                key={activity.label}
                className="border-l border-green-500/20 pl-5"
              >
                <p className="font-mono text-xs tracking-wider text-green-400/60">
                  {activity.label}
                </p>

                <p
                  className="mt-1 text-2xl font-semibold"
                  style={{
                    color: activity.color,
                  }}
                >
                  {activity.current}
                  <span className="ml-1 text-sm text-green-100/40">
                    {activity.unit}
                  </span>
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
