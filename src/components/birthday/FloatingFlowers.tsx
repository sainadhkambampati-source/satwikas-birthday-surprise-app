"use client";

import { useState, useEffect } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  drift: number;
}

interface FloatingFlowersProps {
  show: boolean;
}

export const FloatingFlowers = ({ show }: FloatingFlowersProps) => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [hoveredPetal, setHoveredPetal] = useState<number | null>(null);

  useEffect(() => {
    if (show) {
      const colors = [
        "rgb(251, 207, 232)", // light pink
        "rgb(252, 231, 243)", // lighter pink
        "rgb(254, 240, 238)", // peach light
        "rgb(243, 232, 255)", // lavender light
        "rgb(255, 237, 213)", // cream
      ];

      const newPetals = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 8 + Math.random() * 4,
        size: 8 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        drift: Math.random() * 100 - 50,
      }));

      setPetals(newPetals);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute -top-10 pointer-events-auto cursor-pointer animate-[petalFall_10s_linear_infinite]"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
          onMouseEnter={() => setHoveredPetal(petal.id)}
          onMouseLeave={() => setHoveredPetal(null)}
        >
          {/* Flower petal shape */}
          <div
            className={`transition-all duration-300 animate-[petalRotate_16s_linear_infinite] ${
              hoveredPetal === petal.id ? "scale-150 rotate-180" : ""
            }`}
            style={{
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              animationDuration: `${petal.duration * 2}s`,
            }}
          >
            {/* Create a flower petal shape using multiple rounded divs */}
            <div className="relative w-full h-full">
              {[0, 72, 144, 216, 288].map((rotation, idx) => (
                <div
                  key={idx}
                  className="absolute top-1/2 left-1/2 rounded-full opacity-80"
                  style={{
                    width: `${petal.size * 0.6}px`,
                    height: `${petal.size * 1.2}px`,
                    backgroundColor: petal.color,
                    transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-40%)`,
                    boxShadow: `0 2px 8px ${petal.color}60`,
                  }}
                />
              ))}
              {/* Center of flower */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: `${petal.size * 0.3}px`,
                  height: `${petal.size * 0.3}px`,
                  backgroundColor: "rgb(251, 191, 36)",
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};