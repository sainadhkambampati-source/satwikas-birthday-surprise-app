"use client";

import { Moon, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface StarData {
  id: number;
  left: string;
  top: string;
  delay: number;
  size: number;
}

export const MoonStars = () => {
  const [stars, setStars] = useState<StarData[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
      size: Math.random() * 8 + 4,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Moon */}
      <div className="absolute top-10 right-10 animate-pulse-gentle">
        <Moon className="w-16 h-16 text-yellow-200 fill-yellow-100" />
      </div>

      {/* Stars */}
      {stars.map((star) => (
        <Star
          key={star.id}
          className="absolute text-yellow-300 fill-yellow-200 animate-sparkle"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
