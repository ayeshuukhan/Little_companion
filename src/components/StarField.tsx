import { useMemo } from "react";

interface Star {
  id: number;
  x: number; // %
  y: number; // %
  size: number;
  delay: number;
  duration: number;
}

export function StarField({ count = 90 }: { count?: number }) {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() < 0.85 ? 1 + Math.random() * 1.2 : 2 + Math.random() * 1.5,
      delay: Math.random() * 5,
      duration: 2.5 + Math.random() * 3.5,
    }));
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: s.size > 2 ? "0 0 4px rgba(255,255,255,0.8)" : undefined,
          }}
        />
      ))}
    </div>
  );
}
