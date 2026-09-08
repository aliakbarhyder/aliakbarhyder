import fs from "node:fs";
import path from "node:path";

const outputDirectory = path.join("assets", "generated");

fs.mkdirSync(outputDirectory, { recursive: true });

const writeFile = (filename, content) => {
  fs.writeFileSync(
    path.join(outputDirectory, filename),
    content.trim() + "\n",
    "utf8"
  );

  console.log(`Generated: ${filename}`);
};

const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generatedAt = new Date().toISOString();

const matrixCharacters =
  "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>[]{}()/\\|+-=*#@";

const randomMatrixCharacter = () =>
  matrixCharacters[
    Math.floor(Math.random() * matrixCharacters.length)
  ];


// ─────────────────────────────────────────────
// MATRIX SVG
// ─────────────────────────────────────────────

const matrixColumns = Array.from({ length: 42 }, (_, column) => {
  const characters = Array.from(
    { length: random(8, 16) },
    () => randomMatrixCharacter()
  ).join("");

  const x = 20 + column * 24;
  const delay = (column * 0.17).toFixed(2);
  const duration = random(7, 14);

  return `
    <text
      x="${x}"
      y="-180"
      class="matrix-column"
      style="animation-delay:${delay}s; animation-duration:${duration}s"
    >${characters}</text>
  `;
}).join("");

const matrixSvg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="100%"
  viewBox="0 0 1100 280"
  role="img"
  aria-label="Matrix decoding animation"
>
  <defs>
    <linearGradient id="matrixBackground" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#020604"/>
      <stop offset="55%" stop-color="#07110b"/>
      <stop offset="100%" stop-color="#020302"/>
    </linearGradient>

    <filter id="matrixGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <style>
      .matrix-column {
        fill: #00ff7b;
        font-family: monospace;
        font-size: 16px;
        letter-spacing: 2px;
        opacity: 0;
        filter: url(#matrixGlow);
        animation-name: matrixRain;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }

      @keyframes matrixRain {
        0% {
          transform: translateY(-40px);
          opacity: 0;
        }

        10% {
          opacity: 0.85;
        }

        80% {
          opacity: 0.45;
        }

        100% {
          transform: translateY(520px);
          opacity: 0;
        }
      }

      .scanline {
        animation: scan 4s linear infinite;
      }

      @keyframes scan {
        0% {
          transform: translateY(-100px);
        }

        100% {
          transform: translateY(380px);
        }
      }

      .decoded {
        animation: decodedPulse 3s ease-in-out infinite;
      }

      @keyframes decodedPulse {
        0%, 100% {
          opacity: 0.82;
        }

        50% {
          opacity: 1;
        }
      }
    </style>
  </defs>

  <rect
    width="1100"
    height="280"
    rx="20"
    fill="url(#matrixBackground)"
  />

  <g opacity="0.12">
    <path
      d="M0 35H1100 M0 70H1100 M0 105H1100 M0 140H1100 M0 175H1100 M0 210H1100 M0 245H1100"
      stroke="#00ff7b"
      stroke-width="1"
    />

    <path
      d="M55 0V280 M110 0V280 M165 0V280 M220 0V280 M275 0V280 M330 0V280 M385 0V280 M440 0V280 M495 0V280 M550 0V280 M605 0V280 M660 0V280 M715 0V280 M770 0V280 M825 0V280 M880 0V280 M935 0V280 M990 0V280 M1045 0V280"
      stroke="#00ff7b"
      stroke-width="1"
    />
  </g>

  <g>
    ${matrixColumns}
  </g>

  <rect
    class="scanline"
    x="0"
    y="0"
    width="1100"
    height="2"
    fill="#00ff7b"
    opacity="0.5"
  />

  <g class="decoded">
    <text
      x="550"
      y="125"
      text-anchor="middle"
      fill="#b7ffd6"
      font-family="monospace"
      font-size="14"
      letter-spacing="6"
      opacity="0.7"
    >
      DECRYPTING PROFILE ENVIRONMENT
    </text>

    <text
      x="550"
      y="170"
      text-anchor="middle"
      fill="#00ff7b"
      font-family="monospace"
      font-size="32"
      font-weight="700"
      letter-spacing="4"
      filter="url(#matrixGlow)"
    >
      SYSTEM ONLINE
    </text>

    <text
      x="550"
      y="205"
      text-anchor="middle"
      fill="#79c99a"
      font-family="monospace"
      font-size="13"
      letter-spacing="2"
    >
      SIGNAL · ACTIVE · ENCRYPTED
    </text>
  </g>

  <text
    x="1030"
    y="255"
    text-anchor="end"
    fill="#2f6945"
    font-family="monospace"
    font-size="10"
  >
    ${generatedAt}
  </text>
</svg>
`;

writeFile("matrix.svg", matrixSvg);


// ─────────────────────────────────────────────
// TERMINAL SVG
// ─────────────────────────────────────────────

const terminalSvg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="100%"
  viewBox="0 0 1100 620"
  role="img"
  aria-label="Animated profile terminal"
>
  <defs>
    <linearGradient id="terminalBackground" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#060907"/>
      <stop offset="100%" stop-color="#0b120d"/>
    </linearGradient>

    <filter id="terminalGlow">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <style>
      .line {
        opacity: 0;
        animation: reveal 0.45s forwards;
      }

      .cursor {
        animation: blink 0.9s steps(2, start) infinite;
      }

      @keyframes reveal {
        from {
          opacity: 0;
          transform: translateY(5px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes blink {
        50% {
          opacity: 0;
        }
      }

      .pulse {
        animation: pulse 2.5s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 0.65;
        }

        50% {
          opacity: 1;
        }
      }
    </style>
  </defs>

  <rect
    x="0"
    y="0"
    width="1100"
    height="620"
    rx="20"
    fill="url(#terminalBackground)"
    stroke="#1c3425"
    stroke-width="2"
  />

  <rect
    x="0"
    y="0"
    width="1100"
    height="52"
    rx="20"
    fill="#0d1510"
  />

  <rect
    x="0"
    y="32"
    width="1100"
    height="20"
    fill="#0d1510"
  />

  <circle cx="32" cy="26" r="7" fill="#ff5f56"/>
  <circle cx="56" cy="26" r="7" fill="#ffbd2e"/>
  <circle cx="80" cy="26" r="7" fill="#27c93f"/>

  <text
    x="550"
    y="31"
    text-anchor="middle"
    fill="#6d8374"
    font-family="monospace"
    font-size="13"
  >
    profile@github:~
  </text>

  <g
    font-family="monospace"
    font-size="17"
  >

    <text
      x="40"
      y="95"
      fill="#00ff7b"
      class="line"
      style="animation-delay:0.3s"
    >
      $ whoami
    </text>

    <text
      x="40"
      y="130"
      fill="#d2ffe1"
      class="line"
      style="animation-delay:0.8s"
    >
      developer · builder · curious mind
    </text>

    <text
      x="40"
      y="185"
      fill="#00ff7b"
      class="line"
      style="animation-delay:1.4s"
    >
      $ profile --initialize
    </text>

    <text
      x="40"
      y="220"
      fill="#7fe8a8"
      class="line"
      style="animation-delay:1.9s"
    >
      ✔ Loading development environment
    </text>

    <text
      x="40"
      y="250"
      fill="#7fe8a8"
      class="line"
      style="animation-delay:2.3s"
    >
      ✔ Synchronizing GitHub activity
    </text>

    <text
      x="40"
      y="280"
      fill="#7fe8a8"
      class="line"
      style="animation-delay:2.7s"
    >
      ✔ Initializing project systems
    </text>

    <text
      x="40"
      y="310"
      fill="#7fe8a8"
      class="line"
      style="animation-delay:3.1s"
    >
      ✔ Establishing secure terminal connection
    </text>

    <text
      x="40"
      y="365"
      fill="#00ff7b"
      class="line"
      style="animation-delay:3.8s"
    >
      $ status --all
    </text>

    <text
      x="40"
      y="400"
      fill="#9ab5a4"
      class="line"
      style="animation-delay:4.3s"
    >
      environment:
    </text>

    <text
      x="200"
      y="400"
      fill="#00ff7b"
      class="line"
      style="animation-delay:4.6s"
    >
      ONLINE
    </text>

    <text
      x="40"
      y="430"
      fill="#9ab5a4"
      class="line"
      style="animation-delay:4.9s"
    >
      activity:
    </text>

    <text
      x="200"
      y="430"
      fill="#00ff7b"
      class="line"
      style="animation-delay:5.2s"
    >
      MONITORING
    </text>

    <text
      x="40"
      y="460"
      fill="#9ab5a4"
      class="line"
      style="animation-delay:5.5s"
    >
      projects:
    </text>

    <text
      x="200"
      y="460"
      fill="#00ff7b"
      class="line"
      style="animation-delay:5.8s"
    >
      ACTIVE
    </text>

    <text
      x="40"
      y="520"
      fill="#00ff7b"
      class="line"
      style="animation-delay:6.4s"
    >
      $ echo "Welcome to the environment"
    </text>

    <text
      x="40"
      y="565"
      fill="#d2ffe1"
      class="line pulse"
      style="animation-delay:6.9s"
    >
      Ready for whatever comes next.
    </text>

    <rect
      x="340"
      y="548"
      width="11"
      height="21"
      fill="#00ff7b"
      class="cursor"
    />

  </g>
</svg>
`;

writeFile("terminal.svg", terminalSvg);


// ─────────────────────────────────────────────
// STATUS SVG
// ─────────────────────────────────────────────

const statuses = [
  {
    name: "BUILDING",
    message: "Constructing something interesting",
    color: "#00ff7b"
  },
  {
    name: "DEBUGGING",
    message: "Investigating suspicious behavior",
    color: "#00e5ff"
  },
  {
    name: "PONDERING",
    message: "Thinking dangerously hard",
    color: "#c084fc"
  },
  {
    name: "EXECUTING",
    message: "Turning plans into reality",
    color: "#00ff7b"
  },
  {
    name: "DECODING",
    message: "Translating chaos into information",
    color: "#facc15"
  },
  {
    name: "OPTIMIZING",
    message: "Making things unnecessarily fast",
    color: "#38bdf8"
  },
  {
    name: "DISCOMBOBULATING",
    message: "Something is happening. Probably.",
    color: "#00ff7b"
  },
  {
    name: "REFACTORING",
    message: "Making the same thing cleaner",
    color: "#f472b6"
  }
];

const statusRows = statuses.map((status, index) => {
  const delay = index * 5;
  const duration = 5;
  const y = 150;

  return `
    <g
      opacity="0"
      style="animation: statusCycle 40s infinite; animation-delay:${delay}s"
    >
      <text
        x="80"
        y="${y}"
        fill="${status.color}"
        font-family="monospace"
        font-size="16"
        letter-spacing="4"
      >
        ● ${status.name}
      </text>

      <text
        x="80"
        y="${y + 35}"
        fill="#89a897"
        font-family="monospace"
        font-size="14"
      >
        ${status.message}
      </text>

      <rect
        x="80"
        y="${y + 65}"
        width="940"
        height="14"
        rx="7"
        fill="#0c1b11"
        stroke="#1e3d29"
      />

      <rect
        x="80"
        y="${y + 65}"
        width="940"
        height="14"
        rx="7"
        fill="${status.color}"
        opacity="0.85"
        style="
          transform-origin:80px ${y + 72}px;
          animation: progressFill ${duration}s ease-in-out forwards;
          animation-delay:${delay}s;
        "
      />

      <text
        x="80"
        y="${y + 115}"
        fill="#5f7869"
        font-family="monospace"
        font-size="12"
      >
        TASK STATUS: IN PROGRESS
      </text>

      <text
        x="1020"
        y="${y + 115}"
        text-anchor="end"
        fill="${status.color}"
        font-family="monospace"
        font-size="12"
      >
        PROCESSING
      </text>
    </g>
  `;
}).join("");

const statusSvg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="100%"
  viewBox="0 0 1100 320"
  role="img"
  aria-label="Animated development status"
>
  <defs>
    <style>
      @keyframes statusCycle {
        0% {
          opacity: 0;
          transform: translateY(8px);
        }

        2% {
          opacity: 1;
          transform: translateY(0);
        }

        11% {
          opacity: 1;
        }

        12.5% {
          opacity: 0;
          transform: translateY(-8px);
        }

        100% {
          opacity: 0;
        }
      }

      @keyframes progressFill {
        0% {
          transform: scaleX(0.02);
        }

        100% {
          transform: scaleX(1);
        }
      }

      .indicator {
        animation: indicatorPulse 1.2s ease-in-out infinite;
      }

      @keyframes indicatorPulse {
        0%, 100% {
          opacity: 0.4;
        }

        50% {
          opacity: 1;
        }
      }
    </style>
  </defs>

  <rect
    width="1100"
    height="320"
    rx="20"
    fill="#050906"
    stroke="#183522"
    stroke-width="2"
  />

  <text
    x="80"
    y="70"
    fill="#d5ffe2"
    font-family="monospace"
    font-size="22"
    font-weight="700"
    letter-spacing="2"
  >
    LIVE SYSTEM STATUS
  </text>

  <text
    x="80"
    y="100"
    fill="#5f7869"
    font-family="monospace"
    font-size="12"
    letter-spacing="2"
  >
    CURRENT DEVELOPMENT PROCESS
  </text>

  <circle
    cx="1010"
    cy="75"
    r="7"
    fill="#00ff7b"
    class="indicator"
  />

  <text
    x="990"
    y="79"
    text-anchor="end"
    fill="#6c8a77"
    font-family="monospace"
    font-size="11"
  >
    LIVE
  </text>

  ${statusRows}

</svg>
`;

writeFile("status.svg", statusSvg);


// ─────────────────────────────────────────────
// ACTIVITY SVG
// ─────────────────────────────────────────────

const activitySvg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="100%"
  viewBox="0 0 1100 440"
  role="img"
  aria-label="GitHub activity monitor"
>
  <defs>
    <linearGradient id="activityGreen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00ff7b"/>
      <stop offset="100%" stop-color="#00c853"/>
    </linearGradient>

    <linearGradient id="activityBlue" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00e5ff"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>

    <linearGradient id="activityPurple" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#c084fc"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>

    <style>
      .ring {
        transform-origin: center;
        transform: rotate(-90deg);
      }

      .commit-ring {
        stroke-dasharray: 420;
        animation: commitProgress 4s ease-in-out infinite;
      }

      .repo-ring {
        stroke-dasharray: 330;
        animation: repoProgress 5s ease-in-out infinite;
      }

      .pr-ring {
        stroke-dasharray: 250;
        animation: prProgress 6s ease-in-out infinite;
      }

      @keyframes commitProgress {
        0% { stroke-dashoffset: 420; }
        60%, 100% { stroke-dashoffset: 70; }
      }

      @keyframes repoProgress {
        0% { stroke-dashoffset: 330; }
        60%, 100% { stroke-dashoffset: 100; }
      }

      @keyframes prProgress {
        0% { stroke-dashoffset: 250; }
        60%, 100% { stroke-dashoffset: 80; }
      }

      .number {
        animation: numberPulse 2.5s ease-in-out infinite;
      }

      @keyframes numberPulse {
        0%, 100% {
          opacity: 0.75;
        }

        50% {
          opacity: 1;
        }
      }
    </style>
  </defs>

  <rect
    width="1100"
    height="440"
    rx="20"
    fill="#050906"
    stroke="#183522"
    stroke-width="2"
  />

  <text
    x="550"
    y="65"
    text-anchor="middle"
    fill="#d5ffe2"
    font-family="monospace"
    font-size="24"
    font-weight="700"
    letter-spacing="2"
  >
    GITHUB ACTIVITY MONITOR
  </text>

  <text
    x="550"
    y="95"
    text-anchor="middle"
    fill="#63806e"
    font-family="monospace"
    font-size="12"
    letter-spacing="2"
  >
    COMMITS · PULL REQUESTS · PROJECT ACTIVITY
  </text>

  <!-- COMMITS -->
  <g transform="translate(250 250)">
    <circle
      r="90"
      fill="none"
      stroke="#0d2114"
      stroke-width="16"
    />

    <circle
      r="90"
      fill="none"
      stroke="url(#activityGreen)"
      stroke-width="16"
      stroke-linecap="round"
      class="ring commit-ring"
    />

    <text
      y="-10"
      text-anchor="middle"
      fill="#00ff7b"
      font-family="monospace"
      font-size="13"
      letter-spacing="2"
    >
      COMMITS
    </text>

    <text
      y="30"
      text-anchor="middle"
      fill="#d5ffe2"
      font-family="monospace"
      font-size="30"
      font-weight="700"
      class="number"
    >
      ACTIVE
    </text>
  </g>

  <!-- PULL REQUESTS -->
  <g transform="translate(550 250)">
    <circle
      r="72"
      fill="none"
      stroke="#0d2114"
      stroke-width="16"
    />

    <circle
      r="72"
      fill="none"
      stroke="url(#activityBlue)"
      stroke-width="16"
      stroke-linecap="round"
      class="ring repo-ring"
    />

    <text
      y="-10"
      text-anchor="middle"
      fill="#00e5ff"
      font-family="monospace"
      font-size="13"
      letter-spacing="2"
    >
      PULL REQUESTS
    </text>

    <text
      y="30"
      text-anchor="middle"
      fill="#d5ffe2"
      font-family="monospace"
      font-size="30"
      font-weight="700"
      class="number"
    >
      TRACKED
    </text>
  </g>

  <!-- PROJECTS -->
  <g transform="translate(820 250)">
    <circle
      r="56"
      fill="none"
      stroke="#0d2114"
      stroke-width="16"
    />

    <circle
      r="56"
      fill="none"
      stroke="url(#activityPurple)"
      stroke-width="16"
      stroke-linecap="round"
      class="ring pr-ring"
    />

    <text
      y="-10"
      text-anchor="middle"
      fill="#c084fc"
      font-family="monospace"
      font-size="13"
      letter-spacing="2"
    >
      PROJECTS
    </text>

    <text
      y="30"
      text-anchor="middle"
      fill="#d5ffe2"
      font-family="monospace"
      font-size="22"
      font-weight="700"
      class="number"
    >
      ONLINE
    </text>
  </g>

  <line
    x1="100"
    y1="390"
    x2="1000"
    y2="390"
    stroke="#16301e"
  />

  <text
    x="550"
    y="415"
    text-anchor="middle"
    fill="#52705d"
    font-family="monospace"
    font-size="11"
    letter-spacing="2"
  >
    MONITORING PUBLIC GITHUB ACTIVITY
  </text>
</svg>
`;

writeFile("activity.svg", activitySvg);


// ─────────────────────────────────────────────
// SKYLINE SVG
// ─────────────────────────────────────────────

const buildings = [
  { x: 0, width: 70, height: 110 },
  { x: 75, width: 55, height: 170 },
  { x: 135, width: 80, height: 125 },
  { x: 220, width: 55, height: 210 },
  { x: 280, width: 95, height: 150 },
  { x: 380, width: 70, height: 240 },
  { x: 455, width: 55, height: 130 },
  { x: 515, width: 90, height: 180 },
  { x: 610, width: 60, height: 220 },
  { x: 675, width: 110, height: 145 },
  { x: 790, width: 70, height: 195 },
  { x: 865, width: 95, height: 135 },
  { x: 965, width: 70, height: 175 },
  { x: 1040, width: 60, height: 110 }
];

const skylineBuildings = buildings.map((building, index) => {
  const y = 300 - building.height;

  const windows = Array.from(
    { length: Math.max(3, Math.floor(building.height / 35)) },
    (_, row) => {
      return Array.from(
        { length: Math.max(2, Math.floor(building.width / 22)) },
        (_, column) => {
          const windowX =
            building.x + 10 + column * 18;

          const windowY =
            y + 15 + row * 25;

          const delay =
            ((index + row + column) % 10) * 0.35;

          return `
            <rect
              x="${windowX}"
              y="${windowY}"
              width="6"
              height="10"
              rx="1"
              fill="#00ff7b"
              opacity="0.25"
              style="animation:windowPulse 3s ease-in-out infinite;animation-delay:${delay}s"
            />
          `;
        }
      ).join("");
    }
  ).join("");

  return `
    <g>
      <rect
        x="${building.x}"
        y="${y}"
        width="${building.width}"
        height="${building.height}"
        fill="#07110b"
        stroke="#163522"
        stroke-width="1"
      />

      ${windows}
    </g>
  `;
}).join("");

const skylineSvg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="100%"
  viewBox="0 0 1100 360"
  role="img"
  aria-label="Animated digital skyline"
>
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#030704"/>
      <stop offset="100%" stop-color="#08130c"/>
    </linearGradient>

    <filter id="skyGlow">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <style>
      @keyframes windowPulse {
        0%, 100% {
          opacity: 0.18;
        }

        50% {
          opacity: 1;
          filter: url(#skyGlow);
        }
      }

      .signal {
        animation: signalPulse 2s ease-in-out infinite;
      }

      @keyframes signalPulse {
        0%, 100% {
          opacity: 0.25;
        }

        50% {
          opacity: 0.9;
        }
      }
    </style>
  </defs>

  <rect
    width="1100"
    height="360"
    fill="url(#sky)"
    rx="20"
  />

  <circle
    cx="550"
    cy="100"
    r="70"
    fill="#00ff7b"
    opacity="0.025"
  />

  <circle
    cx="550"
    cy="100"
    r="35"
    fill="#00ff7b"
    opacity="0.04"
  />

  <path
    d="M0 300H1100"
    stroke="#00ff7b"
    stroke-width="2"
    opacity="0.3"
  />

  ${skylineBuildings}

  <g class="signal">
    <circle
      cx="550"
      cy="60"
      r="5"
      fill="#00ff7b"
      filter="url(#skyGlow)"
    />

    <path
      d="M550 65V300"
      stroke="#00ff7b"
      stroke-width="1"
      opacity="0.25"
    />
  </g>

  <text
    x="550"
    y="335"
    text-anchor="middle"
    fill="#00ff7b"
    font-family="monospace"
    font-size="13"
    letter-spacing="2"
  >
    CHECK IT OUT → ALIAKBARHYDER9.PYTHONANYWHERE.COM
  </text>
</svg>
`;

writeFile("skyline.svg", skylineSvg);

console.log("");
console.log("Profile assets generated successfully.");
