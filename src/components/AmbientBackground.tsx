import { motion } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";
import { Mood } from "../data/responses";

type BgMood = "idle" | Mood;

const MOOD_CONFIG: Record<BgMood, {
  base: string;
  blobA: string;
  blobB: string;
  blobC: string;
  particleColors: string[];
}> = {
  idle: {
    base: "bg-base-charcoal",
    blobA: "bg-happy-rose/10",
    blobB: "bg-sad-indigo/15",
    blobC: "bg-happy-coral/10",
    particleColors: ["#ff7a59", "#7c93b8", "#8f8bff", "#ffb08a"],
  },
  happy: {
    base: "bg-base-charcoal",
    blobA: "bg-happy-coral/25",
    blobB: "bg-happy-rose/20",
    blobC: "bg-happy-champagne/20",
    particleColors: ["#ff7a59", "#ffb08a", "#ff6f91", "#f3e6c8"],
  },
  sad: {
    base: "bg-base-midnight",
    blobA: "bg-sad-indigo/25",
    blobB: "bg-sad-dusty/20",
    blobC: "bg-sad-slate/20",
    particleColors: ["#7c93b8", "#5c6b82", "#4a5a8a"],
  },
};

export function AmbientBackground({ mood = "idle" }: { mood?: BgMood }) {
  const config = MOOD_CONFIG[mood];

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden transition-colors duration-1000 ${config.base}`}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#171528,_transparent_60%)]" />

      <motion.div
        key={`${mood}-a`}
        className={`absolute -left-32 top-10 h-96 w-96 rounded-full blur-[100px] ${config.blobA}`}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        key={`${mood}-b`}
        className={`absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full blur-[110px] ${config.blobB}`}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
      <motion.div
        key={`${mood}-c`}
        className={`absolute bottom-0 left-1/4 h-80 w-80 rounded-full blur-[100px] ${config.blobC}`}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />

      <FloatingParticles colors={config.particleColors} />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,230,218,0.04),_transparent_55%)]" />
    </motion.div>
  );
}