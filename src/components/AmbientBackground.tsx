import { motion } from "framer-motion";
import { Mood } from "../data/responses";

type BgMood = "idle" | Mood;

// How bright the pink glow is for each mood
const GLOW: Record<BgMood, number> = {
  idle: 0.55,
  happy: 0.85,
  sad: 0.35,
};

// One long curvy line with a curl (loop) in the middle
const CURL_PATH =
  "M-60 690 C 140 640, 260 440, 410 510 C 530 570, 490 720, 385 690 C 290 660, 340 520, 480 430 C 650 320, 800 390, 900 260 C 960 175, 1010 125, 1070 95";

export function AmbientBackground({ mood = "idle" }: { mood?: BgMood }) {
  const glow = GLOW[mood];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-black">
      {/* soft pink haze in the corner */}
      <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#ff1f8e]/15 blur-[120px]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <filter id="pinkGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        {/* blurred glow layer */}
        <motion.path
          d={CURL_PATH}
          stroke="#ff1f8e"
          strokeWidth="14"
          strokeLinecap="round"
          filter="url(#pinkGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: glow }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />

        {/* crisp line on top */}
        <motion.path
          d={CURL_PATH}
          stroke="#ff2d9b"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}