import { motion } from "framer-motion";
import { useMemo } from "react";

const PALETTE = ["#ff8a5c", "#ff5f7e", "#ffd166", "#c9a6ff", "#8f8bff", "#ffffff"];

interface Burst {
  id: number;
  x: number; // vw
  y: number; // vh
  delay: number;
  colorA: string;
  colorB: string;
}

interface Particle {
  id: number;
  angle: number;
  distance: number;
  color: string;
  size: number;
}

function makeParticles(burstId: number, colorA: string, colorB: string): Particle[] {
  const count = 14;
  return Array.from({ length: count }, (_, i) => ({
    id: burstId * 100 + i,
    angle: (360 / count) * i + Math.random() * 10,
    distance: 60 + Math.random() * 50,
    color: i % 2 === 0 ? colorA : colorB,
    size: 4 + Math.random() * 4,
  }));
}

export function Fireworks() {
  const bursts = useMemo<Burst[]>(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 15 + Math.random() * 70,
      y: 15 + Math.random() * 45,
      delay: i * 0.28 + Math.random() * 0.2,
      colorA: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      colorB: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bursts.map((burst) => {
        const particles = makeParticles(burst.id, burst.colorA, burst.colorB);
        return (
          <div
            key={burst.id}
            className="absolute"
            style={{ left: `${burst.x}%`, top: `${burst.y}%` }}
          >
            {particles.map((p) => {
              const rad = (p.angle * Math.PI) / 180;
              const dx = Math.cos(rad) * p.distance;
              const dy = Math.sin(rad) * p.distance;
              return (
                <motion.span
                  key={p.id}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    backgroundColor: p.color,
                    boxShadow: `0 0 8px ${p.color}`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.3 }}
                  animate={{ x: dx, y: dy, opacity: 0, scale: 1 }}
                  transition={{
                    duration: 1.1,
                    delay: burst.delay,
                    ease: "easeOut",
                  }}
                />
              );
            })}
            <motion.span
              className="absolute h-2 w-2 rounded-full bg-white"
              style={{ boxShadow: "0 0 16px 6px rgba(255,255,255,0.9)" }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 1.6, 0], opacity: [1, 1, 0] }}
              transition={{ duration: 0.5, delay: burst.delay }}
            />
          </div>
        );
      })}
    </div>
  );
}
