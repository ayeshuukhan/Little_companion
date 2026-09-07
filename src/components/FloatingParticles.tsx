import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

const DEFAULT_COLORS = ["#ff7a59", "#ffb08a", "#7c93b8", "#8f8bff"];

export function FloatingParticles({
  count = 12,
  colors = DEFAULT_COLORS,
}: {
  count?: number;
  colors?: string[];
}) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 30 + Math.random() * 70,
      color: colors[i % colors.length],
      delay: Math.random() * 4,
      duration: 6 + Math.random() * 6,
    }));
  }, [count, colors]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full blur-2xl animate-float-slow animate-glow-pulse"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: 0.18,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}