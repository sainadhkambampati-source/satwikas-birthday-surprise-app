"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface Balloon {
  id: number;
  left: string;
  color: string;
  delay: number;
  popped: boolean;
}

interface InteractiveBalloonsProps {
  show: boolean;
}

export const InteractiveBalloons = ({ show }: InteractiveBalloonsProps) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    if (show) {
      const colors = [
        "rgb(192, 132, 252)", // purple
        "rgb(244, 114, 182)", // pink
        "rgb(251, 146, 60)", // peach
        "rgb(96, 165, 250)", // blue
        "rgb(167, 139, 250)", // lavender
      ];

      const newBalloons = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${10 + (i * 80) / 12}%`,
        color: colors[i % colors.length],
        delay: i * 0.2,
        popped: false,
      }));

      setBalloons(newBalloons);
    }
  }, [show]);

  const handleBalloonClick = (id: number) => {
    setBalloons((prev) =>
      prev.map((balloon) =>
        balloon.id === id ? { ...balloon, popped: true } : balloon
      )
    );
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-30">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className={`absolute bottom-0 transition-all duration-500 ${
            balloon.popped ? "opacity-0 scale-0" : "opacity-100 pointer-events-auto cursor-pointer"
          }`}
          style={{
            left: balloon.left,
            animation: balloon.popped ? "none" : `balloonRise 3s ease-out forwards`,
            animationDelay: `${balloon.delay}s`,
          }}
          onClick={() => handleBalloonClick(balloon.id)}
        >
          {/* Balloon */}
          <div className="relative">
            <div
              className="w-16 h-20 rounded-full hover:scale-110 transition-transform duration-200"
              style={{
                backgroundColor: balloon.color,
                boxShadow: `0 4px 20px ${balloon.color}40`,
              }}
            >
              {/* Shine effect */}
              <div className="absolute top-3 left-4 w-6 h-8 bg-white opacity-30 rounded-full blur-sm" />
            </div>
            {/* String */}
            <div
              className="absolute top-full left-1/2 w-0.5 h-12 -translate-x-1/2"
              style={{ backgroundColor: balloon.color }}
            />
            
            {/* Sparkle on pop */}
            {balloon.popped && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-yellow-300 animate-ping" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};