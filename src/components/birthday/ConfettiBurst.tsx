"use client";

import { useEffect, useState } from "react";

interface Confetti {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
  drift: number;
}

export const ConfettiBurst = () => {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    const colors = [
      "#c084fc", // purple
      "#f472b6", // pink
      "#fb923c", // peach
      "#60a5fa", // blue
      "#fbbf24", // yellow
      "#a78bfa", // lavender
    ];

    const newConfetti: Confetti[] = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
      duration: 3 + Math.random() * 2,
      rotation: Math.random() * 360,
      drift: Math.random() * 200 - 100,
    }));

    setConfetti(newConfetti);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute -top-10 w-3 h-3 rounded-sm animate-[confettiFall_3s_ease-out_forwards]"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotation}deg)`,
            // Using CSS custom properties for dynamic values
            ['--drift-x' as any]: `${piece.drift}px`,
          }}
        />
      ))}
    </div>
  );
};