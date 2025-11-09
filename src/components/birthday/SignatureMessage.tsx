"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export const SignatureMessage = () => {
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 3,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.5,
        },
      },
    },
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-pink-100 via-purple-50 to-rose-100 relative overflow-hidden">
      {/* Floating hearts */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <Heart className="w-4 h-4 text-pink-400 fill-pink-300" />
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Handwritten SVG text animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <svg
            width="100%"
            height="200"
            viewBox="0 0 800 200"
            className="max-w-3xl mx-auto"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: "#c084fc", stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: "#f472b6", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#fb923c", stopOpacity: 1 }} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Handwritten "With love, from your friends" */}
            <motion.path
              d="M 50 100 Q 80 60, 120 100 T 200 100 Q 220 80, 240 100 T 300 100 M 320 100 Q 340 120, 360 100 T 420 100 M 440 80 L 440 120 Q 460 100, 480 120 M 500 80 Q 520 60, 540 80 L 540 120 M 560 100 Q 580 80, 600 100 T 660 100 M 680 80 L 680 120 M 700 80 Q 720 100, 740 80"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              variants={pathVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />
          </svg>
        </motion.div>

        {/* Actual text (appears after animation) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2, duration: 1 }}
          className="space-y-6"
        >
          <h3 className="text-4xl md:text-6xl handwritten bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            With love, from your friends 💌
          </h3>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <Heart className="w-8 h-8 text-pink-500 fill-pink-400" />
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Sparkles className="w-8 h-8 text-yellow-500" />
            </motion.div>
            <motion.div
              animate={{
                rotate: [0, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                delay: 0.5,
              }}
            >
              <Heart className="w-8 h-8 text-purple-500 fill-purple-400" />
            </motion.div>
          </div>

          {/* Sparkle trail effect */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 3, duration: 1 }}
            className="relative h-12"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2"
                initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                whileInView={{
                  scale: [0, 1, 0],
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 100,
                  opacity: [0, 1, 0],
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 2,
                  delay: 3 + i * 0.1,
                  ease: "easeOut",
                }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
