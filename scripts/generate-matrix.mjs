import fs from "node:fs";
import path from "node:path";

const output = path.join(
  process.cwd(),
  "assets/generated/matrix.svg"
);

const messages = [
  "ALI AKBAR HYDER",
  "BUILDING WHAT'S NEXT",
  "EXPERIMENT • BUILD • IMPROVE"
];

const width = 1000;
const height = 150;

const frames = messages
  .map(
    (message, index) => `
    <text
      x="50%"
      y="50%"
      text-anchor="middle"
      dominant-baseline="middle"
      class="message message-${index}"
    >
      ${message}
    </text>
  `
  )
  .join("");

const svg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${width}"
  height="${height}"
  viewBox="0 0 ${width} ${height}"
  role="img"
  aria-label="Animated Matrix text"
>
  <defs>

    <filter id="glow">
      <feGaussianBlur
        stdDeviation="3"
        result="coloredBlur"
      />

      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <linearGradient
      id="background"
      x1="0"
      y1="0"
      x2="1"
      y2="1"
    >
      <stop offset="0%" stop-color="#05080a"/>
      <stop offset="100%" stop-color="#0d1117"/>
    </linearGradient>

  </defs>

  <rect
    width="100%"
    height="100%"
    rx="18"
    fill="url(#background)"
  />

  <g
    font-family="JetBrains Mono, SFMono-Regular, Consolas, monospace"
    font-size="34"
    font-weight="700"
    fill="#00ff66"
    filter="url(#glow)"
  >
    ${frames}
  </g>

  <style>

    .message {
      opacity: 0;
      animation: cycle 15s infinite;
    }

    .message-0 {
      animation-delay: 0s;
    }

    .message-1 {
      animation-delay: 5s;
    }

    .message-2 {
      animation-delay: 10s;
    }

    @keyframes cycle {

      0% {
        opacity: 0;
        transform: translateY(12px);
      }

      8% {
        opacity: 1;
        transform: translateY(0);
      }

      28% {
        opacity: 1;
      }

      33% {
        opacity: 0;
        transform: translateY(-10px);
      }

      100% {
        opacity: 0;
      }

    }

  </style>

</svg>
`;

fs.mkdirSync(path.dirname(output), {
  recursive: true
});

fs.writeFileSync(output, svg);

console.log("Generated matrix.svg");
