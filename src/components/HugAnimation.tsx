import { motion } from "framer-motion";

const MOTES = Array.from({ length: 10 }, (_, i) => i);

export function HugAnimation() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* two soft arcs drifting toward each other, like arms closing into a hug */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-hush-300/40"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.15, 1], opacity: [0, 0.6, 0.35] }}
        transition={{ duration: 2.2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bloom-400/30"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: [0.4, 1.25, 1.05], opacity: [0, 0.4, 0.25] }}
        transition={{ duration: 2.6, ease: "easeOut", delay: 0.15 }}
      />

      {/* gentle floating motes */}
      {MOTES.map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-hush-300/70"
          style={{
            left: `${10 + ((i * 37) % 80)}%`,
            top: `${20 + ((i * 53) % 60)}%`,
            width: 5 + (i % 3) * 2,
            height: 5 + (i % 3) * 2,
            boxShadow: "0 0 10px rgba(169,184,242,0.8)",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: [0, 0.9, 0.5], y: [12, -14, 0] }}
          transition={{
            duration: 4 + (i % 4),
            delay: i * 0.18,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
