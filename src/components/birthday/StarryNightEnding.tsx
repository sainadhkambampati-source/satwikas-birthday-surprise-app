"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";

interface StarParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export const StarryNightEnding = () => {
  const [stars, setStars] = useState<StarParticle[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Generate stars
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }));
    setStars(newStars);

    // Show message after stars appear
    setTimeout(() => setShowMessage(true), 2000);
  }, []);

  const message = "Happy Birthday Dr. Satwika";

  return (
    <section className="relative min-h-screen py-20 px-4 bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 overflow-hidden">
      {/* Stars background */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0.7, 1],
            scale: [0, 1, 0.8, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Twinkling larger stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`twinkle-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
        >
          <Star className="w-4 h-4 text-yellow-200 fill-yellow-100" />
        </motion.div>
      ))}

      {/* Message formed by stars */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
            className="text-center space-y-8"
          >
            {/* Main message with star effect */}
            <div className="relative">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold handwritten">
                {message.split(" ").map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    className="inline-block mr-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: wordIndex * 0.3,
                      duration: 0.8,
                      type: "spring",
                    }}
                  >
                    {word.split("").map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        className="inline-block bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent"
                        style={{
                          textShadow: "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 200, 100, 0.6)",
                        }}
                        animate={{
                          textShadow: [
                            "0 0 20px rgba(255, 255, 255, 0.8)",
                            "0 0 40px rgba(255, 200, 100, 1)",
                            "0 0 20px rgba(255, 255, 255, 0.8)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          delay: wordIndex * 0.3 + charIndex * 0.1,
                          repeat: Infinity,
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                ))}
              </h1>

              {/* Sparkles around text */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 1 + i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-200" />
                </motion.div>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-xl md:text-2xl text-purple-200 handwritten"
            >
              May your dreams shine as bright as these stars ✨
            </motion.p>

            {/* Shooting star effect */}
            <motion.div
              className="absolute top-1/4 left-0 w-1 h-1 bg-white rounded-full"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: [0, 400],
                y: [0, 200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: 3,
                repeat: Infinity,
                repeatDelay: 5,
              }}
              style={{
                boxShadow: "0 0 20px 10px rgba(255, 255, 255, 0.8)",
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Moon */}
      <motion.div
        className="absolute top-20 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        style={{
          boxShadow: "0 0 60px 30px rgba(255, 255, 200, 0.3)",
        }}
      >
        {/* Moon craters */}
        <div className="absolute top-6 left-4 w-4 h-4 rounded-full bg-yellow-200 opacity-40" />
        <div className="absolute bottom-8 right-6 w-6 h-6 rounded-full bg-yellow-200 opacity-30" />
        <div className="absolute top-12 right-4 w-3 h-3 rounded-full bg-yellow-200 opacity-50" />
      </motion.div>

      {/* Gentle piano note animation hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-purple-300 text-sm"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        ♪ ♫ ♪
      </motion.div>
    </section>
  );
};
