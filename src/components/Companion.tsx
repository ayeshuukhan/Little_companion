import { motion } from "framer-motion";

export type CompanionMood = "idle" | "processing" | "happy" | "sad";

interface CompanionProps {
  mood?: CompanionMood;
  size?: number;
}

const glowColor: Record<CompanionMood, string> = {
  idle: "#ffe3c2",
  processing: "#ffe3c2",
  happy: "#ff7a59",
  sad: "#7c93b8",
};

export function Companion({ mood = "idle", size = 120 }: CompanionProps) {
  const bodyAnim =
    mood === "happy"
      ? { y: [0, -14, 0] }
      : mood === "sad"
      ? { y: [0, 4, 0], scale: [1, 1.015, 1] }
      : mood === "processing"
      ? { rotate: [-2, 2, -2] }
      : { scale: [1, 1.03, 1] };

  const bodyTransition =
    mood === "happy"
      ? { duration: 0.7, repeat: Infinity, ease: "easeOut" as const }
      : mood === "sad"
      ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" as const }
      : mood === "processing"
      ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" as const }
      : { duration: 4, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <motion.div
        className="absolute rounded-full blur-2xl"
        style={{ width: size * 0.9, height: size * 0.9, backgroundColor: glowColor[mood] }}
        animate={{ opacity: mood === "happy" ? [0.5, 0.9, 0.5] : [0.25, 0.5, 0.25] }}
        transition={{ duration: mood === "happy" ? 1.2 : 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.svg viewBox="0 0 200 200" width={size} height={size} className="relative" animate={bodyAnim} transition={bodyTransition}>
        <ellipse cx="72" cy="48" rx="16" ry="38" fill="#fff3e0" transform="rotate(-12 72 48)" />
        <ellipse cx="128" cy="48" rx="16" ry="38" fill="#fff3e0" transform="rotate(12 128 48)" />
        <ellipse cx="72" cy="52" rx="8" ry="26" fill={glowColor[mood]} opacity="0.5" transform="rotate(-12 72 52)" />
        <ellipse cx="128" cy="52" rx="8" ry="26" fill={glowColor[mood]} opacity="0.5" transform="rotate(12 128 52)" />

        <circle cx="100" cy="110" r="58" fill="#fff3e0" />

        {mood === "happy" && (
          <>
            <path d="M76 108 Q84 96 92 108" stroke="#2b2140" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M108 108 Q116 96 124 108" stroke="#2b2140" strokeWidth="5" fill="none" strokeLinecap="round" />
            <ellipse cx="70" cy="122" rx="8" ry="5" fill="#ff7a59" opacity="0.4" />
            <ellipse cx="130" cy="122" rx="8" ry="5" fill="#ff7a59" opacity="0.4" />
          </>
        )}

        {mood === "sad" && (
          <>
            <path d="M78 112 Q86 116 94 112" stroke="#2b2140" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M106 112 Q114 116 122 112" stroke="#2b2140" strokeWidth="4" fill="none" strokeLinecap="round" />
          </>
        )}

        {(mood === "idle" || mood === "processing") && (
          <>
            <motion.circle
              cx="85"
              cy="108"
              r="5"
              fill="#2b2140"
              animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.92, 0.95, 0.98, 1] }}
            />
            <motion.circle
              cx="115"
              cy="108"
              r="5"
              fill="#2b2140"
              animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.92, 0.95, 0.98, 1] }}
            />
          </>
        )}

        <path
          d={
            mood === "happy"
              ? "M90 130 Q100 140 110 130"
              : mood === "sad"
              ? "M90 134 Q100 128 110 134"
              : "M94 130 Q100 133 106 130"
          }
          stroke="#2b2140"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </motion.svg>

      {mood === "processing" && (
        <div className="absolute -bottom-2 flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-white/70"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      )}

      {mood === "happy" && (
        <>
          <motion.span
            className="absolute -top-2 left-2 text-lg"
            animate={{ opacity: [0, 1, 0], y: [0, -8, -16] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
          >
            ✦
          </motion.span>
          <motion.span
            className="absolute -top-1 right-3 text-sm"
            animate={{ opacity: [0, 1, 0], y: [0, -6, -14] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: 0.7 }}
          >
            ✨
          </motion.span>
        </>
      )}
    </div>
  );
}