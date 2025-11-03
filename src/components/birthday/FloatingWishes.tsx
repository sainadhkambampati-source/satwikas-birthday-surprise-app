"use client";

import { useEffect, useState } from "react";

interface Wish {
  id: number;
  text: string;
  left: string;
  delay: number;
  duration: number;
}

export const FloatingWishes = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);

  useEffect(() => {
    const wishTexts = [
      "Strength 💪",
      "Love ❤️",
      "Success ✨",
      "Healing 🌿",
      "Wisdom 📚",
      "Hope 🌟",
      "Courage 🦋",
      "Dreams 🌙",
      "Peace ☮️",
      "Joy 🌸",
    ];

    const newWishes = wishTexts.map((text, i) => ({
      id: i,
      text,
      left: `${Math.random() * 90 + 5}%`,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 10,
    }));

    setWishes(newWishes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {wishes.map((wish) => (
        <div
          key={wish.id}
          className="absolute bottom-0 animate-float opacity-60 text-purple-600 font-semibold text-lg"
          style={{
            left: wish.left,
            animationDelay: `${wish.delay}s`,
            animationDuration: `${wish.duration}s`,
          }}
        >
          {wish.text}
        </div>
      ))}
    </div>
  );
};
