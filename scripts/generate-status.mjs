import fs from "node:fs";
import path from "node:path";

const output = path.join(
  process.cwd(),
  "assets/generated/status.svg"
);

const statuses = [
  "PONDERING",
  "ANALYZING",
  "ARCHITECTING",
  "DECODING",
  "EXECUTING",
  "DEBUGGING",
  "REFACTORING",
  "OPTIMIZING",
  "TESTING",
  "DEPLOYING",
  "PUBLISHING",
  "EXPERIMENTING",
  "DISCOMBOBULATING",
  "RECOMBOBULATING"
];

const width = 1000;
const height = 120;

const statusElements = statuses
  .map(
    (status, index) => `
    <g class="status status-${index}">

      <circle
        cx="330"
        cy="60"
        r="7"
      />

      <text
        x="355"
        y="68"
      >
        ${status}...
      </text>

    </g>
  `
  )
  .join("");

const delayStyle = statuses
  .map(
    (_, index) => `
    .status-${index} {
      animation-delay: ${index * 4}s;
    }
  `
  )
  .join("");

const totalDuration = statuses.length * 4;

const svg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${width}"
  height="${height}"
  viewBox="0 0 ${width} ${height}"
>
  <rect
    width="100%"
    height="100%"
    rx="18"
    fill="#0d1117"
    stroke="#30363d"
  />

  <g
    fill="#00d9ff"
    font-family="JetBrains Mono, monospace"
    font-size="22"
    font-weight="700"
  >

    ${statusElements}

  </g>

  <style>

    .status {
      opacity: 0;
      animation: statusCycle ${totalDuration}s infinite;
    }

    ${delayStyle}

    @keyframes statusCycle {

      0% {
        opacity: 0;
        transform: translateY(10px);
      }

      4% {
        opacity: 1;
        transform: translateY(0);
      }

      18% {
        opacity: 1;
      }

      23% {
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

console.log("Generated status.svg");
