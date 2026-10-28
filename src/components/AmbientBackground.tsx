import { motion, useReducedMotion } from "framer-motion";
import { Mood } from "../data/responses";

type BgMood = "idle" | Mood;

// How bright the pink glow is for each mood
const GLOW: Record<BgMood, number> = {
  idle: 0.6,
  happy: 0.9,
  sad: 0.4,
};

// Seconds for the line to go through all its shapes once (lower = faster)
const CYCLE: Record<BgMood, number> = {
  idle: 32,
  happy: 20,
  sad: 48,
};

// Every shape is ONE continuous line with the same structure,
// so it can smoothly morph from one shape into the next.
const SHAPES = [
  "M -60 690 C 140 640, 260 440, 410 510 C 530 570, 490 720, 385 690 C 290 660, 340 520, 480 430 C 650 320, 800 390, 900 260 C 960 175, 1010 125, 1070 95",
  "M -60 300 C 120 380, 220 560, 380 500 C 500 450, 470 330, 370 350 C 270 370, 330 520, 470 560 C 640 610, 780 460, 900 520 C 960 550, 1010 600, 1070 640",
  "M -60 520 C 150 430, 300 250, 470 330 C 600 390, 560 520, 460 490 C 360 460, 420 320, 560 280 C 720 235, 820 340, 900 430 C 950 490, 1010 540, 1070 570",
  "M -60 420 C 100 300, 250 250, 400 360 C 520 450, 600 600, 520 640 C 440 680, 380 580, 470 500 C 600 390, 760 300, 900 400 C 970 450, 1020 380, 1070 330",
  // back to the first shape so the loop is seamless
  "M -60 690 C 140 640, 260 440, 410 510 C 530 570, 490 720, 385 690 C 290 660, 340 520, 480 430 C 650 320, 800 390, 900 260 C 960 175, 1010 125, 1070 95",
];

export function AmbientBackground({ mood = "idle" }: { mood?: BgMood }) {
  const reduceMotion = useReducedMotion();
  const glow = GLOW[mood];
  const cycle = CYCLE[mood];

  const morph = reduceMotion ? { d: SHAPES[0] } : { d: SHAPES };
  const morphTransition = { duration: cycle, ease: "easeInOut" as const, repeat: Infinity };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-black">
      {/* soft pink haze in the corners */}
      <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#ff1f8e]/15 blur-[120px]" />
      <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#ff1f8e]/10 blur-[120px]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <filter id="pinkGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <linearGradient
            id="lineGrad"
            x1="0"
            y1="0"
            x2="1000"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" style={{ stopColor: "rgb(var(--ember-500))" }} />
            <stop offset="0.5" style={{ stopColor: "rgb(var(--bloom-500))" }} />
            <stop offset="1" style={{ stopColor: "rgb(var(--hush-400))" }} />
          </linearGradient>
        </defs>

        {/* the whole line also floats up and down gently */}
        <motion.g
          animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* 1. wide blurred glow */}
          <motion.path
            d={SHAPES[0]}
            stroke="url(#lineGrad)"
            strokeWidth="26"
            strokeLinecap="round"
            filter="url(#pinkGlow)"
            initial={{ opacity: 0 }}
            animate={{ ...morph, opacity: glow }}
            transition={{ d: morphTransition, opacity: { duration: 1.5 } }}
          />

          {/* 2. the thick main line */}
          <motion.path
            d={SHAPES[0]}
            stroke="url(#lineGrad)"
            strokeWidth="9"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ ...morph, opacity: 1 }}
            transition={{ d: morphTransition, opacity: { duration: 1.5 } }}
          />

          {/* 3. a bright spark of light travelling along the line */}
          {!reduceMotion && (
            <motion.path
              d={SHAPES[0]}
              style={{ stroke: "rgb(var(--hush-300))" }}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="120 1800"
              initial={{ opacity: 0 }}
              animate={{ d: SHAPES, strokeDashoffset: [0, -1920], opacity: 0.9 }}
              transition={{
                d: morphTransition,
                strokeDashoffset: { duration: 6, ease: "linear", repeat: Infinity },
                opacity: { duration: 1.5 },
              }}
            />
          )}
        </motion.g>
      </svg>
    </div>
  );
}