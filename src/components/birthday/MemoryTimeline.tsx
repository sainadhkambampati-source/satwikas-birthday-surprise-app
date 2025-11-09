"use client";

import { motion } from "framer-motion";
import { GraduationCap, Heart, Book, Stethoscope, Star, Sparkles } from "lucide-react";

interface Memory {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const memories: Memory[] = [
  {
    year: "Year 1",
    title: "Anatomy Hero 🧠",
    description: "Conquered bones, muscles, and nerves with determination and grace",
    icon: <Book className="w-8 h-8" />,
    color: "from-purple-400 to-pink-400",
  },
  {
    year: "Year 2",
    title: "Pathology Queen 👑",
    description: "Mastered diseases and their mysteries with brilliant insight",
    icon: <GraduationCap className="w-8 h-8" />,
    color: "from-pink-400 to-rose-400",
  },
  {
    year: "Year 3",
    title: "Clinical Star ⭐",
    description: "First patient interactions that showed your compassionate heart",
    icon: <Stethoscope className="w-8 h-8" />,
    color: "from-blue-400 to-cyan-400",
  },
  {
    year: "Year 4",
    title: "Ward Warrior 💪",
    description: "Handling cases with confidence and endless dedication",
    icon: <Heart className="w-8 h-8" />,
    color: "from-green-400 to-emerald-400",
  },
  {
    year: "Final Year",
    title: "Future Doctor ✨",
    description: "Ready to heal the world with knowledge and kindness",
    icon: <Star className="w-8 h-8" />,
    color: "from-yellow-400 to-orange-400",
  },
];

export const MemoryTimeline = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4 handwritten flex items-center justify-center gap-3">
          <Sparkles className="w-10 h-10" />
          Your MBBS Journey
          <Sparkles className="w-10 h-10" />
        </h2>
        <p className="text-purple-600 text-lg">A timeline of triumph and transformation 🌟</p>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-300 via-pink-300 to-yellow-300 -translate-x-1/2 hidden md:block" />

        {/* Timeline items */}
        <div className="space-y-12">
          {memories.map((memory, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className={`flex items-center gap-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex-col`}
            >
              {/* Content card */}
              <div className="flex-1 w-full md:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-br ${memory.color} p-6 rounded-2xl shadow-xl text-white relative overflow-hidden`}
                >
                  {/* Sparkle effect */}
                  <div className="absolute top-2 right-2">
                    <Sparkles className="w-6 h-6 animate-sparkle opacity-70" />
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                      {memory.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{memory.title}</h3>
                      <p className="text-white/90 leading-relaxed">{memory.description}</p>
                    </div>
                  </div>

                  {/* Wave decoration */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/20" />
                </motion.div>
              </div>

              {/* Year badge */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-white rounded-full w-24 h-24 flex items-center justify-center shadow-xl border-4 border-purple-300 md:relative md:z-10 shrink-0"
              >
                <span className="text-purple-700 font-bold text-lg text-center">{memory.year}</span>
              </motion.div>

              {/* Spacer for alignment */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>

        {/* Final celebration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: memories.length * 0.2, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 p-8 rounded-3xl shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 handwritten">
              And The Journey Continues... 🚀
            </h3>
            <p className="text-white/90 text-lg">
              Every chapter has been brilliant, Dr. Satwika! 💖
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
