"use client";

import {
  motion,
} from "motion/react";

interface Activity {
  label: string;
  value: number;
  current: number;
  target: number;
  unit: string;
  color: string;
  size: number;
}

const activities: Activity[] = [

  {
    label: "COMMITS",
    value: 78,
    current: 78,
    target: 100,
    unit: "COMMITS",
    color: "#00d9ff",
    size: 210,
  },

  {
    label: "PULL REQUESTS",
    value: 62,
    current: 31,
    target: 50,
    unit: "PRS",
    color: "#8b5cf6",
    size: 165,
  },

  {
    label: "PROJECTS",
    value: 45,
    current: 9,
    target: 20,
    unit: "REPOS",
    color: "#00ff88",
    size: 120,
  },

];

function Ring({
  activity,
  index,
}: {
  activity: Activity;
  index: number;
}) {

  const strokeWidth = 14;

  const radius =
    (
      activity.size -
      strokeWidth
    ) / 2;

  const circumference =
    radius * 2 * Math.PI;

  const offset =
    circumference -
    (
      activity.value / 100
    ) *
      circumference;

  return (

    <motion.svg

      width={
        activity.size
      }

      height={
        activity.size
      }

      viewBox={`
        0 0
        ${activity.size}
        ${activity.size}
      `}

      className="
        absolute
        -rotate-90
      "

      initial={{
        opacity: 0,
        scale: 0.8,
      }}

      animate={{
        opacity: 1,
        scale: 1,
      }}

      transition={{
        delay:
          index * 0.2,
      }}

    >

      <circle

        cx={
          activity.size / 2
        }

        cy={
          activity.size / 2
        }

        r={radius}

        fill="none"

        stroke="
          rgba(255,255,255,0.08)
        "

        strokeWidth={
          strokeWidth
        }

      />

      <motion.circle

        cx={
          activity.size / 2
        }

        cy={
          activity.size / 2
        }

        r={radius}

        fill="none"

        stroke={
          activity.color
        }

        strokeWidth={
          strokeWidth
        }

        strokeLinecap="round"

        strokeDasharray={
          circumference
        }

        initial={{
          strokeDashoffset:
            circumference,
        }}

        animate={{
          strokeDashoffset:
            offset,
        }}

        transition={{
          duration: 1.8,
          delay:
            index * 0.2,
        }}

      />

    </motion.svg>

  );
}

export default function ActivityMonitor() {

  return (

    <div
      className="
        flex
        flex-col
        items-center
        gap-10
        rounded-3xl
        border
        border-white/10
        bg-[#0d1117]
        p-8
        text-white
        md:flex-row
      "
    >

      <div
        className="
          relative
          flex
          h-[220px]
          w-[220px]
          items-center
          justify-center
        "
      >

        {activities.map(
          (
            activity,
            index
          ) => (

            <Ring

              key={
                activity.label
              }

              activity={
                activity
              }

              index={
                index
              }

            />

          )
        )}

      </div>

      <div className="
        space-y-6
      ">

        {activities.map(
          (
            activity
          ) => (

            <div
              key={
                activity.label
              }
            >

              <div className="
                text-xs
                tracking-[0.2em]
                text-zinc-500
              ">

                {
                  activity.label
                }

              </div>

              <div
                className="
                  mt-1
                  text-2xl
                  font-bold
                "

                style={{
                  color:
                    activity.color,
                }}
              >

                {
                  activity.current
                }

                /

                {
                  activity.target
                }

                <span className="
                  ml-2
                  text-sm
                  text-zinc-500
                ">

                  {
                    activity.unit
                  }

                </span>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}
