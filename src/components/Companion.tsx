import { motion } from "framer-motion";
import { useProfile } from "../context/ProfileContext";
import { CharacterId } from "../data/responses";

export type CompanionMood = "idle" | "processing" | "happy" | "sad";

interface CompanionProps {
  mood?: CompanionMood;
  size?: number;
  character?: CharacterId; // if not given, uses the character picked in Settings
}

const glowColor: Record<CompanionMood, string> = {
  idle: "#ffe3c2",
  processing: "#ffe3c2",
  happy: "rgb(var(--ember-500))",
  sad: "#7c93b8",
};

const INK = "#2b2140";
const CREAM = "#fff3e0";
const SKIN = "#ffe1cf";
const GIRL_HAIR = "#3a2438";
const BOY_HAIR = "#2a2a48";

function Face({ mood }: { mood: CompanionMood }) {
  return (
    <>
      {mood === "happy" && (
        <>
          <path d="M76 108 Q84 96 92 108" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M108 108 Q116 96 124 108" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
          <ellipse cx="70" cy="122" rx="8" ry="5" opacity="0.5" style={{ fill: "rgb(var(--ember-400))" }} />
          <ellipse cx="130" cy="122" rx="8" ry="5" opacity="0.5" style={{ fill: "rgb(var(--ember-400))" }} />
        </>
      )}

      {mood === "sad" && (
        <>
          <path d="M78 112 Q86 116 94 112" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M106 112 Q114 116 122 112" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      )}

      {(mood === "idle" || mood === "processing") && (
        <>
          <motion.circle
            cx="85"
            cy="108"
            r="5"
            fill={INK}
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.92, 0.95, 0.98, 1] }}
          />
          <motion.circle
            cx="115"
            cy="108"
            r="5"
            fill={INK}
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.92, 0.95, 0.98, 1] }}
          />
          <ellipse cx="70" cy="122" rx="7" ry="4" opacity="0.25" style={{ fill: "rgb(var(--ember-400))" }} />
          <ellipse cx="130" cy="122" rx="7" ry="4" opacity="0.25" style={{ fill: "rgb(var(--ember-400))" }} />
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
        stroke={INK}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

export function Companion({ mood = "idle", size = 120, character }: CompanionProps) {
  const { profile } = useProfile();
  const who: CharacterId = character ?? profile.character ?? "bunny";

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

      <motion.svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="relative"
        animate={bodyAnim}
        transition={bodyTransition}
      >
        {/* ---------- behind the head ---------- */}
        {who === "bunny" && (
          <>
            <ellipse cx="72" cy="48" rx="16" ry="38" fill={CREAM} transform="rotate(-12 72 48)" />
            <ellipse cx="128" cy="48" rx="16" ry="38" fill={CREAM} transform="rotate(12 128 48)" />
            <ellipse cx="72" cy="52" rx="8" ry="26" opacity="0.5" transform="rotate(-12 72 52)" style={{ fill: glowColor[mood] }} />
            <ellipse cx="128" cy="52" rx="8" ry="26" opacity="0.5" transform="rotate(12 128 52)" style={{ fill: glowColor[mood] }} />
          </>
        )}

        {who === "girl" && (
          <>
            <circle cx="36" cy="132" r="19" fill={GIRL_HAIR} />
            <circle cx="164" cy="132" r="19" fill={GIRL_HAIR} />
          </>
        )}

        {who === "boy" && (
          <>
            <circle cx="42" cy="114" r="9" fill={SKIN} />
            <circle cx="158" cy="114" r="9" fill={SKIN} />
          </>
        )}

        {/* ---------- head ---------- */}
        <circle cx="100" cy="110" r="58" fill={who === "bunny" ? CREAM : SKIN} />

        {/* ---------- hair / accessories ---------- */}
        {who === "girl" && (
          <>
            <path d="M41 105 C34 30 166 30 159 105 C140 84 120 78 100 80 C80 78 60 84 41 105 Z" fill={GIRL_HAIR} />
            <circle cx="46" cy="116" r="4.5" style={{ fill: "rgb(var(--ember-500))" }} />
            <circle cx="154" cy="116" r="4.5" style={{ fill: "rgb(var(--ember-500))" }} />
            <g transform="translate(64 60)">
              <ellipse cx="-11" cy="-3" rx="11" ry="7" transform="rotate(-20 -11 -3)" style={{ fill: "rgb(var(--ember-500))" }} />
              <ellipse cx="11" cy="-3" rx="11" ry="7" transform="rotate(20 11 -3)" style={{ fill: "rgb(var(--ember-500))" }} />
              <circle cx="0" cy="-2" r="4.5" style={{ fill: "rgb(var(--ember-600))" }} />
            </g>
          </>
        )}

        {who === "boy" && (
          <path
            d="M41 100 C40 70 56 50 74 56 L80 36 L94 54 L104 32 L116 54 L128 38 L130 58 C150 54 164 76 159 100 C148 82 130 74 100 74 C70 74 52 82 41 100 Z"
            fill={BOY_HAIR}
          />
        )}

        <Face mood={mood} />
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