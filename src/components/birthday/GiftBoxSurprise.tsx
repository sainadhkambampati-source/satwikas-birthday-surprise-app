"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";

export const GiftBoxSurprise = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openGift = () => {
    setIsOpen(true);

    // Trigger confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random(), y: Math.random() * 0.6 },
        colors: ["#c084fc", "#f472b6", "#fb923c", "#fbbf24"],
      });
    }, 250);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-yellow-100 via-pink-50 to-purple-100">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4 handwritten">
                A Special Gift For You 🎁
              </h2>
              <p className="text-purple-600 text-lg mb-8">Click to unwrap your surprise!</p>

              {/* Gift box */}
              <motion.div
                className="relative inline-block cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openGift}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-400 blur-2xl opacity-50 animate-pulse-gentle" />

                {/* Gift box SVG */}
                <div className="relative">
                  <Gift className="w-48 h-48 md:w-64 md:h-64 text-pink-500 drop-shadow-2xl" strokeWidth={1.5} />
                  
                  {/* Sparkles around gift */}
                  <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 animate-sparkle" />
                  <Sparkles className="absolute -bottom-4 -left-4 w-6 h-6 text-pink-400 animate-sparkle" style={{ animationDelay: "0.5s" }} />
                  <Sparkles className="absolute top-1/2 -right-8 w-5 h-5 text-purple-400 animate-sparkle" style={{ animationDelay: "1s" }} />
                </div>
              </motion.div>

              <p className="text-pink-600 font-semibold text-xl animate-pulse-gentle">
                ✨ Tap the gift to open ✨
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="space-y-8"
            >
              {/* Opened gift content */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative"
              >
                {/* Glowing heart */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="w-32 h-32 md:w-40 md:h-40 mx-auto text-pink-500 fill-pink-400 drop-shadow-2xl" />
                </motion.div>

                {/* Sparkles animation */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: "50%",
                      left: "50%",
                    }}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: Math.cos((i * Math.PI * 2) / 12) * 150,
                      y: Math.sin((i * Math.PI * 2) / 12) * 150,
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.3 + i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="space-y-6"
              >
                <h3 className="text-4xl md:text-5xl font-bold text-purple-700 handwritten">
                  Your Greatest Gift
                </h3>
                <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
                  <p className="text-2xl md:text-3xl text-pink-600 handwritten leading-relaxed mb-4">
                    "The greatest gift you can give the world is your healing presence." 💖
                  </p>
                  <p className="text-lg text-purple-600">
                    Keep shining, Dr. Satwika. Your compassion, dedication, and kindness are the most precious gifts of all. ✨
                  </p>
                </div>

                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="text-pink-600 font-semibold"
                >
                  💝 With endless love and pride 💝
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
