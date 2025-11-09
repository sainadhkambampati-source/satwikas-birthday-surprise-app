"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  emoji: string;
}

export const FireworksMessage = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  const message = "Happy Birthday Satwika 🎉";
  const colors = ["#c084fc", "#f472b6", "#fb923c", "#fbbf24", "#a78bfa"];
  const emojis = ["✨", "⭐", "💖", "🎊", "🎉", "💫", "🌟"];

  useEffect(() => {
    // Launch multiple firework bursts
    const launchFireworks = (delay: number, centerX: number, centerY: number) => {
      setTimeout(() => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < 30; i++) {
          const angle = (Math.PI * 2 * i) / 30;
          const velocity = 3 + Math.random() * 2;
          newParticles.push({
            id: Date.now() + i,
            x: centerX,
            y: centerY,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            color: colors[Math.floor(Math.random() * colors.length)],
            emoji: emojis[Math.floor(Math.random() * emojis.length)]
          });
        }
        setParticles(prev => [...prev, ...newParticles]);
      }, delay);
    };

    // Launch fireworks at different positions
    launchFireworks(0, 20, 30);
    launchFireworks(200, 50, 40);
    launchFireworks(400, 80, 35);
    launchFireworks(600, 35, 45);
    launchFireworks(800, 65, 30);

    // Show message after fireworks
    setTimeout(() => setShowMessage(true), 1200);

    // Cleanup particles
    const cleanup = setInterval(() => {
      setParticles(prev => prev.filter(p => Date.now() - p.id < 3000));
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Firework particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute text-2xl"
          initial={{ x: `${particle.x}vw`, y: `${particle.y}vh`, opacity: 1, scale: 1 }}
          animate={{
            x: `${particle.x + particle.vx * 10}vw`,
            y: `${particle.y + particle.vy * 10}vh`,
            opacity: 0,
            scale: 0.3
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ color: particle.color }}
        >
          {particle.emoji}
        </motion.div>
      ))}

      {/* Message reveal */}
      {showMessage && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
        >
          <h1 className="handwritten text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
            {message.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </motion.div>
      )}
    </div>
  );
};
