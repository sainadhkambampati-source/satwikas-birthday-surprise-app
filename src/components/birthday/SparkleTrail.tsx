"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const SparkleTrail = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const colors = ["#e879f9", "#f472b6", "#fb923c", "#a78bfa", "#fbbf24"];
    
    const handleMouseMove = (e: MouseEvent) => {
      const newSparkle: Sparkle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setSparkles((prev) => [...prev, newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 1000);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const newSparkle: Sparkle = {
        id: Date.now() + Math.random(),
        x: touch.clientX,
        y: touch.clientY,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setSparkles((prev) => [...prev, newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {sparkles.map((sparkle) => (
        <Sparkles
          key={sparkle.id}
          className="absolute animate-sparkle"
          style={{
            left: sparkle.x - sparkle.size / 2,
            top: sparkle.y - sparkle.size / 2,
            width: sparkle.size,
            height: sparkle.size,
            color: sparkle.color,
          }}
        />
      ))}
    </div>
  );
};
