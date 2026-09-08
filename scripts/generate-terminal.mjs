import fs from "node:fs";
import path from "node:path";

const output = path.join(
  process.cwd(),
  "assets/generated/terminal.svg"
);

const sequences = [
  {
    command: "ponder --architecture",

    lines: [
      "[INFO] Inspecting the problem...",
      "[INFO] Exploring possible solutions...",
      "[INFO] Thinking harder...",
      "[OK] Architecture selected."
    ]
  },

  {
    command: "analyze --project",

    lines: [
      "[INFO] Scanning architecture...",
      "[INFO] Evaluating implementation...",
      "[INFO] Identifying improvements...",
      "[OK] Analysis complete."
    ]
  },

  {
    command: "debug --deep",

    lines: [
      "[INFO] Searching for issues...",
      "[INFO] Inspecting suspicious behavior...",
      "[WARN] Something looks questionable.",
      "[INFO] Investigating...",
      "[OK] Issue resolved."
    ]
  },

  {
    command: "execute",

    lines: [
      "[INFO] Initializing sequence...",
      "[INFO] Running implementation...",
      "[INFO] Monitoring output...",
      "[OK] Execution complete."
    ]
  },

  {
    command: "publish",

    lines: [
      "[INFO] Preparing production build...",
      "[INFO] Optimizing assets...",
      "[INFO] Running final checks...",
      "[OK] Deployment complete."
    ]
  }
];

const width = 1000;
const height = 390;

const blocks = sequences
  .map((sequence, index) => {
    const lines = [
      `$ ${sequence.command}`,
      ...sequence.lines,
      "",
      "$ _"
    ];

    return `
      <g class="sequence sequence-${index}">
        ${lines
          .map(
            (line, lineIndex) => `
              <text
                x="60"
                y="${80 + lineIndex * 42}"
                class="${
                  line.includes("[OK]")
                    ? "success"
                    : line.includes("[WARN]")
                    ? "warning"
                    : line.startsWith("$")
                    ? "command"
                    : "normal"
                }"
              >
                ${line}
              </text>
            `
          )
          .join("")}
      </g>
    `;
  })
  .join("");

const delayStyle = sequences
  .map(
    (_, index) => `
      .sequence-${index} {
        animation-delay: ${index * 12}s;
      }
    `
  )
  .join("");

const totalDuration = sequences.length * 12;

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
    rx="20"
    fill="#0d1117"
    stroke="#30363d"
  />

  <circle cx="40" cy="32" r="6" fill="#ff5f57"/>
  <circle cx="60" cy="32" r="6" fill="#febc2e"/>
  <circle cx="80" cy="32" r="6" fill="#28c840"/>

  <g
    font-family="JetBrains Mono, SFMono-Regular, Consolas, monospace"
    font-size="18"
  >

    ${blocks}

  </g>

  <style>

    .sequence {
      opacity: 0;
      animation: terminalCycle ${totalDuration}s infinite;
    }

    ${delayStyle}

    .command {
      fill: #00d9ff;
      font-weight: 700;
    }

    .normal {
      fill: #c9d1d9;
    }

    .success {
      fill: #3fb950;
    }

    .warning {
      fill: #d29922;
    }

    @keyframes terminalCycle {

      0% {
        opacity: 0;
      }

      4% {
        opacity: 1;
      }

      72% {
        opacity: 1;
      }

      80% {
        opacity: 0;
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

console.log("Generated terminal.svg");
