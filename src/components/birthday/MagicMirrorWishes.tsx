"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Wand2 } from "lucide-react";

const wishes = [
  "Your kindness shines brighter than any stethoscope light 💖",
  "Future Dr. Satwika, the world needs your healing touch 🩺✨",
  "Your compassion is the best medicine anyone could ask for 💊",
  "May your stethoscope always hear hope and healing 🫀",
  "You're not just studying medicine, you're becoming magic ✨",
  "Every patient will be blessed by your gentle care 🌸",
  "Your dreams are as powerful as any prescription 💫",
  "Keep shining, future healer of hearts 💝"
];

export const MagicMirrorWishes = () => {
  const [currentWish, setCurrentWish] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);

  const revealNewWish = () => {
    setIsRevealing(true);
    setTimeout(() => {
      setCurrentWish((prev) => (prev + 1) % wishes.length);
      setIsRevealing(false);
    }, 500);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4 handwritten flex items-center justify-center gap-3">
          <Wand2 className="w-10 h-10" />
          Magic Mirror Wishes
          <Sparkles className="w-10 h-10" />
        </h2>
        <p className="text-purple-600 text-lg">Tap the mirror to reveal a heartfelt wish ✨</p>
      </div>

      <div className="max-w-2xl mx-auto relative">
        {/* Mirror frame */}
        <motion.div
          className="relative cursor-pointer"
          onClick={revealNewWish}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Glowing frame */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-3xl blur-xl opacity-60 animate-pulse-gentle" />
          
          {/* Mirror surface */}
          <div className="relative bg-gradient-to-br from-purple-200/80 via-pink-200/80 to-blue-200/80 backdrop-blur-sm rounded-3xl p-12 md:p-16 border-8 border-white/50 shadow-2xl">
            {/* Sparkle decorations */}
            <Sparkles className="absolute top-4 right-4 w-8 h-8 text-yellow-400 animate-sparkle" />
            <Sparkles className="absolute bottom-4 left-4 w-6 h-6 text-pink-400 animate-sparkle" style={{ animationDelay: "0.5s" }} />
            <Heart className="absolute top-4 left-4 w-7 h-7 text-red-400 fill-red-300 animate-heartbeat" />
            
            {/* Wish text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWish}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl handwritten text-purple-800 leading-relaxed">
                  {wishes[currentWish]}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Shimmer effect */}
            {isRevealing && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>

          {/* Tap hint */}
          <motion.p
            className="text-center mt-4 text-purple-600 font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ Tap to reveal another wish ✨
          </motion.p>
        </motion.div>

        {/* Floating particles around mirror */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-pink-400 rounded-full"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </div>
    </section>
  );
};
