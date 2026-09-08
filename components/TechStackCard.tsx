"use client";

import {
  useState,
} from "react";

import {
  ArrowRight,
} from "lucide-react";

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

  const [
    flipped,
    setFlipped,
  ] = useState(false);

  return (

    <div

      className="
        h-[320px]
        w-full
        max-w-[300px]
        [perspective:2000px]
      "

      onMouseEnter={() =>
        setFlipped(true)
      }

      onMouseLeave={() =>
        setFlipped(false)
      }

    >

      <div

        className={`
          relative
          h-full
          w-full
          transition-transform
          duration-500
          [transform-style:preserve-3d]

          ${
            flipped
              ? "[transform:rotateY(180deg)]"
              : ""
          }
        `}

      >

        {/* FRONT */}

        <div

          className="
            absolute
            inset-0
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-[#0d1117]
            p-6
            [backface-visibility:hidden]
          "

        >

          <div className="
            flex
            h-full
            flex-col
            justify-between
          ">

            <div>

              <div
                className="
                  mb-6
                  text-5xl
                  text-cyan-400
                "
              >

                {icon}

              </div>

              <h3 className="
                text-xl
                font-bold
                text-white
              ">

                {title}

              </h3>

              <p className="
                mt-2
                text-sm
                text-zinc-400
              ">

                {subtitle}

              </p>

            </div>

            <div className="
              text-xs
              tracking-[0.2em]
              text-cyan-400
            ">

              HOVER TO EXPLORE →

            </div>

          </div>

        </div>

        {/* BACK */}

        <div

          className="
            absolute
            inset-0
            flex
            flex-col
            rounded-2xl
            border
            border-white/10
            bg-[#111820]
            p-6
            [backface-visibility:hidden]
            [transform:rotateY(180deg)]
          "

        >

          <h3 className="
            text-xl
            font-bold
            text-white
          ">

            {title}

          </h3>

          <p className="
            mt-3
            text-sm
            leading-relaxed
            text-zinc-400
          ">

            {description}

          </p>

          <div className="
            mt-6
            space-y-3
          ">

            {features.map(
              (
                feature
              ) => (

                <div

                  key={
                    feature
                  }

                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-zinc-300
                  "

                >

                  <ArrowRight
                    size={14}
                    className="
                      text-cyan-400
                    "
                  />

                  {feature}

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}replace
