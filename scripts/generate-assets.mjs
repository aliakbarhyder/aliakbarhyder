import fs from "node:fs";
import path from "node:path";

const generatedDir = path.resolve("assets/generated");

fs.mkdirSync(generatedDir, { recursive: true });

const now = Date.now();
const fiveMinuteSlot = Math.floor(now / (5 * 60 * 1000));

function hash(value) {
  let x = value + 0x6d2b79f5;

  x = Math.imul(x ^ (x >>> 15), x | 1);
  x ^= x + Math.imul(x ^ (x >>> 7), x | 61);

  return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function writeAsset(filename, content) {
  fs.writeFileSync(
    path.join(generatedDir, filename),
    content.trim(),
    "utf8"
  );
}

const statuses = [
  {
    title: "PONDERING",
    description: "exploring possibilities and unnecessary complexity..."
  },
  {
    title: "ANALYZING",
    description: "looking for patterns hiding in plain sight..."
  },
  {
    title: "DEBUGGING",
    description: "politely interrogating suspicious behavior..."
  },
  {
    title: "DECODING",
    description: "translating the incomprehensible..."
  },
  {
    title: "COMPILING",
    description: "turning questionable ideas into something useful..."
  },
  {
    title: "EXECUTING",
    description: "making things happen..."
  },
  {
    title: "OPTIMIZING",
    description: "removing unnecessary friction..."
  },
  {
    title: "ARCHITECTING",
    description: "designing systems before they design themselves..."
  },
  {
    title: "ENCRYPTING",
    description: "making information look appropriately mysterious..."
  },
  {
    title: "DECRYPTING",
    description: "undoing unnecessary mystery..."
  },
  {
    title: "DISCOMBOBULATING",
    description: "respectfully confusing the universe..."
  },
  {
    title: "OVERTHINKING",
    description: "considering seventeen better alternatives..."
  },
  {
    title: "BUILDING",
    description: "turning ideas into something real..."
  },
  {
    title: "SHIPPING",
    description: "preparing something to leave the terminal..."
  },
  {
    title: "PUBLISHING",
    description: "sending it into the wild..."
  }
];

const statusIndex = fiveMinuteSlot % statuses.length;
const currentStatus = statuses[statusIndex];

const randomProgress = Math.floor(
  58 + hash(fiveMinuteSlot + 17) * 40
);

const randomDuration = Math.floor(
  6 + hash(fiveMinuteSlot + 99) * 7
);

const nextStatus =
  statuses[(statusIndex + 1) % statuses.length];

const terminalSections = [
  [
    "$ initializing aliakbarhyder9",
    "✔ loading developer environment",
    "✔ synchronizing GitHub activity",
    "✔ preparing creative systems",
    "● STATUS: ONLINE"
  ],
  [
    "$ system status",
    `◉ ${currentStatus.title}`,
    `${randomProgress}% PROCESS COMPLETE`,
    currentStatus.description,
    "● awaiting next operation..."
  ],
  [
    "$ git activity --inspect",
    "✔ commits detected",
    "✔ pull requests monitored",
    "✔ repositories synchronized",
    "● all systems operational"
  ],
  [
    "$ build --production",
    "compiling ideas...",
    "debugging reality...",
    "optimizing questionable decisions...",
    "✔ process completed"
  ]
];

const terminalIndex =
  Math.floor(now / (60 * 1000)) % terminalSections.length;

const terminalLines =
  terminalSections[terminalIndex];

const matrixCharacters =
  "010101001101010100101101010101010110101001010101101010100101010101101010010101010110101001010101010101001010101010101";

function generateMatrix() {
  const rainColumns = Array.from(
    { length: 22 },
    (_, index) => {
      const x = 35 + index * 42;
      const delay = -(index * 0.7);

      const characters = Array.from(
        { length: 18 },
        (_, characterIndex) =>
          `<tspan x="${x}" dy="22">${
            Math.random() > 0.5 ? "1" : "0"
          }</tspan>`
      ).join("");

      return `
        <text
          x="${x}"
          y="-250"
          font-family="monospace"
          font-size="16"
          fill="#00ff66"
          opacity="0.32"
        >
          ${characters}

          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 -280"
            to="0 900"
            dur="${9 + (index % 5)}s"
            begin="${delay}s"
            repeatCount="indefinite"
          />
        </text>
      `;
    }
  ).join("");

  return `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1000"
  height="340"
  viewBox="0 0 1000 340"
  role="img"
  aria-label="Matrix identity animation"
>
  <defs>

    <linearGradient
      id="matrixBackground"
      x1="0"
      y1="0"
      x2="1"
      y2="1"
    >
      <stop offset="0%" stop-color="#020604"/>
      <stop offset="55%" stop-color="#07110a"/>
      <stop offset="100%" stop-color="#020403"/>
    </linearGradient>

    <linearGradient
      id="matrixName"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
    >
      <stop offset="0%" stop-color="#007a30"/>
      <stop offset="45%" stop-color="#00ff66"/>
      <stop offset="100%" stop-color="#9cffbd"/>
    </linearGradient>

    <filter id="greenGlow">
      <feGaussianBlur
        stdDeviation="4"
        result="blur"
      />

      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <clipPath id="matrixClip">
      <rect
        x="0"
        y="0"
        width="1000"
        height="340"
        rx="24"
      />
    </clipPath>

  </defs>

  <rect
    width="1000"
    height="340"
    rx="24"
    fill="url(#matrixBackground)"
    stroke="#00ff6633"
  />

  <g clip-path="url(#matrixClip)">
    ${rainColumns}
  </g>

  <rect
    x="1"
    y="1"
    width="998"
    height="338"
    rx="24"
    fill="none"
    stroke="#00ff6644"
  />

  <text
    x="500"
    y="130"
    text-anchor="middle"
    font-family="monospace"
    font-size="14"
    letter-spacing="7"
    fill="#00b84d"
  >
    SYSTEM.IDENTITY
  </text>

  <text
    x="500"
    y="205"
    text-anchor="middle"
    font-family="monospace"
    font-size="52"
    font-weight="700"
    letter-spacing="5"
    fill="url(#matrixName)"
    filter="url(#greenGlow)"
  >
    ALI AKBAR HYDER

    <animate
      attributeName="opacity"
      values="1;0.82;1;0.9;1"
      dur="3.5s"
      repeatCount="indefinite"
    />
  </text>

  <text
    x="500"
    y="248"
    text-anchor="middle"
    font-family="monospace"
    font-size="15"
    letter-spacing="4"
    fill="#6dff98"
    opacity="0.75"
  >
    ${matrixCharacters}

    <animate
      attributeName="opacity"
      values="0.3;0.9;0.45;0.8;0.3"
      dur="4s"
      repeatCount="indefinite"
    />
  </text>

  <line
    x1="340"
    y1="280"
    x2="660"
    y2="280"
    stroke="#00ff66"
    stroke-width="1"
    opacity="0.4"
  >
    <animate
      attributeName="opacity"
      values="0.15;0.8;0.15"
      dur="2.4s"
      repeatCount="indefinite"
    />
  </line>

  <text
    x="500"
    y="312"
    text-anchor="middle"
    font-family="monospace"
    font-size="12"
    letter-spacing="3"
    fill="#00ff66"
    opacity="0.7"
  >
    [ MATRIX ONLINE ]

    <animate
      attributeName="opacity"
      values="0.25;1;0.25"
      dur="2s"
      repeatCount="indefinite"
    />
  </text>

</svg>
`;
}

function generateStatus() {
  const progressWidth = 760;
  const targetWidth =
    (progressWidth * randomProgress) / 100;

  return `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1000"
  height="300"
  viewBox="0 0 1000 300"
  role="img"
  aria-label="Live system status"
>
  <defs>

    <linearGradient
      id="statusBackground"
      x1="0"
      y1="0"
      x2="1"
      y2="1"
    >
      <stop offset="0%" stop-color="#030604"/>
      <stop offset="100%" stop-color="#08120b"/>
    </linearGradient>

    <linearGradient
      id="progressGradient"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
    >
      <stop offset="0%" stop-color="#007c32"/>
      <stop offset="55%" stop-color="#00ff66"/>
      <stop offset="100%" stop-color="#8cffae"/>
    </linearGradient>

    <filter id="statusGlow">
      <feGaussianBlur
        stdDeviation="5"
        result="blur"
      />

      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

  </defs>

  <rect
    width="1000"
    height="300"
    rx="24"
    fill="url(#statusBackground)"
    stroke="#00ff6640"
  />

  <circle
    cx="72"
    cy="72"
    r="7"
    fill="#00ff66"
    filter="url(#statusGlow)"
  >
    <animate
      attributeName="opacity"
      values="0.35;1;0.35"
      dur="1.6s"
      repeatCount="indefinite"
    />
  </circle>

  <text
    x="94"
    y="78"
    font-family="monospace"
    font-size="16"
    letter-spacing="3"
    fill="#74ff9d"
  >
    LIVE SYSTEM STATUS
  </text>

  <text
    x="928"
    y="78"
    text-anchor="end"
    font-family="monospace"
    font-size="13"
    letter-spacing="2"
    fill="#00ff66"
    opacity="0.7"
  >
    AUTO-UPDATING
  </text>

  <text
    x="120"
    y="145"
    font-family="monospace"
    font-size="34"
    font-weight="700"
    letter-spacing="4"
    fill="#00ff66"
    filter="url(#statusGlow)"
  >
    ${escapeXml(currentStatus.title)}
  </text>

  <text
    x="122"
    y="180"
    font-family="monospace"
    font-size="16"
    fill="#8fbf9e"
  >
    ${escapeXml(currentStatus.description)}
  </text>

  <rect
    x="120"
    y="215"
    width="${progressWidth}"
    height="16"
    rx="8"
    fill="#00ff6614"
    stroke="#00ff6638"
  />

  <rect
    x="120"
    y="215"
    width="0"
    height="16"
    rx="8"
    fill="url(#progressGradient)"
    filter="url(#statusGlow)"
  >
    <animate
      attributeName="width"
      from="0"
      to="${targetWidth}"
      dur="${randomDuration}s"
      fill="freeze"
    />
  </rect>

  <text
    x="900"
    y="265"
    text-anchor="end"
    font-family="monospace"
    font-size="13"
    fill="#00ff66"
    opacity="0.7"
  >
    ${randomProgress}% COMPLETE
  </text>

  <text
    x="120"
    y="265"
    font-family="monospace"
    font-size="13"
    letter-spacing="2"
    fill="#5b966d"
  >
    NEXT → ${escapeXml(nextStatus.title)}
  </text>

</svg>
`;
}

function generateTerminal() {
  const lines = terminalLines
    .map((line, index) => {
      const color =
        line.startsWith("✔")
          ? "#72ff9b"
          : line.startsWith("●")
            ? "#00ff66"
            : line.startsWith("$")
              ? "#9cffbd"
              : "#b9c7bd";

      const y = 80 + index * 38;

      return `
        <text
          x="70"
          y="${y}"
          font-family="monospace"
          font-size="18"
          fill="${color}"
          opacity="0"
        >
          ${escapeXml(line)}

          <animate
            attributeName="opacity"
            values="0;1;1;1;0"
            keyTimes="0;0.08;0.82;0.95;1"
            dur="60s"
            begin="${index * 0.6}s"
            repeatCount="indefinite"
          />
        </text>
      `;
    })
    .join("");

  return `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1000"
  height="360"
  viewBox="0 0 1000 360"
  role="img"
  aria-label="Rotating developer terminal"
>
  <defs>

    <linearGradient
      id="terminalBackground"
      x1="0"
      y1="0"
      x2="1"
      y2="1"
    >
      <stop offset="0%" stop-color="#020403"/>
      <stop offset="100%" stop-color="#09100b"/>
    </linearGradient>

  </defs>

  <rect
    width="1000"
    height="360"
    rx="24"
    fill="url(#terminalBackground)"
    stroke="#00ff6640"
  />

  <rect
    x="0"
    y="0"
    width="1000"
    height="52"
    rx="24"
    fill="#0b140e"
  />

  <circle
    cx="48"
    cy="26"
    r="7"
    fill="#00ff66"
    opacity="0.8"
  />

  <circle
    cx="72"
    cy="26"
    r="7"
    fill="#00b84d"
    opacity="0.55"
  />

  <circle
    cx="96"
    cy="26"
    r="7"
    fill="#176f37"
    opacity="0.45"
  />

  <text
    x="500"
    y="32"
    text-anchor="middle"
    font-family="monospace"
    font-size="14"
    letter-spacing="3"
    fill="#7effa3"
    opacity="0.7"
  >
    ALI@SYSTEM:~
  </text>

  ${lines}

  <text
    x="70"
    y="315"
    font-family="monospace"
    font-size="16"
    fill="#00ff66"
  >
    _
    <animate
      attributeName="opacity"
      values="0;1;1;0"
      dur="1s"
      repeatCount="indefinite"
    />
  </text>

  <text
    x="930"
    y="325"
    text-anchor="end"
    font-family="monospace"
    font-size="12"
    fill="#4f7659"
  >
    SECTION ${terminalIndex + 1}/${terminalSections.length}
  </text>

</svg>
`;
}

function generateSkyline() {
  const buildings = [
    [60, 190, 70, 110],
    [145, 130, 90, 170],
    [250, 165, 70, 135],
    [335, 100, 110, 200],
    [460, 145, 85, 155],
    [560, 80, 120, 220],
    [700, 125, 90, 175],
    [805, 170, 70, 130],
    [890, 115, 55, 185]
  ];

  const buildingSvg = buildings
    .map(([x, y, width, height], index) => {
      const windows = [];

      for (let row = 0; row < 6; row++) {
        for (let column = 0; column < 3; column++) {
          const windowX =
            x + 14 + column * ((width - 28) / 3);

          const windowY =
            y + 20 + row * 23;

          windows.push(`
            <rect
              x="${windowX}"
              y="${windowY}"
              width="7"
              height="10"
              rx="1"
              fill="#00ff66"
              opacity="${0.25 + ((row + column + index) % 4) * 0.15}"
            >
              <animate
                attributeName="opacity"
                values="0.15;0.9;0.3;0.15"
                dur="${2 + ((row + column) % 3)}s"
                begin="${-(row + column) * 0.3}s"
                repeatCount="indefinite"
              />
            </rect>
          `);
        }
      }

      return `
        <rect
          x="${x}"
          y="${y}"
          width="${width}"
          height="${height}"
          rx="4"
          fill="#07110a"
          stroke="#00ff6630"
        />

        ${windows.join("")}
      `;
    })
    .join("");

  return `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1000"
  height="430"
  viewBox="0 0 1000 430"
  role="img"
  aria-label="Currently building skyline"
>
  <defs>

    <linearGradient
      id="skyBackground"
      x1="0"
      y1="0"
      x2="0"
      y2="1"
    >
      <stop offset="0%" stop-color="#020403"/>
      <stop offset="100%" stop-color="#09150d"/>
    </linearGradient>

    <filter id="skyGlow">
      <feGaussianBlur
        stdDeviation="4"
        result="blur"
      />

      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

  </defs>

  <rect
    width="1000"
    height="430"
    rx="24"
    fill="url(#skyBackground)"
    stroke="#00ff6638"
  />

  <text
    x="500"
    y="75"
    text-anchor="middle"
    font-family="monospace"
    font-size="16"
    letter-spacing="5"
    fill="#00ff66"
    opacity="0.8"
  >
    CURRENTLY BUILDING
  </text>

  <text
    x="500"
    y="120"
    text-anchor="middle"
    font-family="monospace"
    font-size="27"
    font-weight="700"
    letter-spacing="3"
    fill="#a0ffba"
  >
    SKYLINE
  </text>

  <line
    x1="90"
    y1="155"
    x2="910"
    y2="155"
    stroke="#00ff6630"
  />

  ${buildingSvg}

  <line
    x1="0"
    y1="300"
    x2="1000"
    y2="300"
    stroke="#00ff66"
    stroke-width="2"
    opacity="0.35"
  />

  <text
    x="500"
    y="350"
    text-anchor="middle"
    font-family="monospace"
    font-size="15"
    letter-spacing="2"
    fill="#6eff94"
  >
    CHECK IT OUT →
  </text>

  <text
    x="500"
    y="385"
    text-anchor="middle"
    font-family="monospace"
    font-size="21"
    font-weight="700"
    fill="#00ff66"
    filter="url(#skyGlow)"
  >
    aliakbarhyder9.pythonanywhere.com
  </text>

</svg>
`;
}

writeAsset("matrix.svg", generateMatrix());
writeAsset("status.svg", generateStatus());
writeAsset("terminal.svg", generateTerminal());
writeAsset("skyline.svg", generateSkyline());

console.log("Generated profile assets successfully.");
