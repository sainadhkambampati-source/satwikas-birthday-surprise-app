"use client";

import { Award, Heart, BookOpen, Stethoscope } from "lucide-react";
import { useState } from "react";

const badges = [
  {
    icon: BookOpen,
    title: "Anatomy Survivor",
    description: "Conquered the complexities of human anatomy",
    color: "from-purple-400 to-purple-600",
    emoji: "🦴",
  },
  {
    icon: Heart,
    title: "White Coat Dreamer",
    description: "Dreams of healing and making a difference",
    color: "from-pink-400 to-pink-600",
    emoji: "🥼",
  },
  {
    icon: Stethoscope,
    title: "Medicine Warrior",
    description: "Fighting through challenges with determination",
    color: "from-blue-400 to-blue-600",
    emoji: "⚔️",
  },
  {
    icon: Award,
    title: "Future Life-Saver",
    description: "Destined to save lives and change the world",
    color: "from-yellow-400 to-orange-500",
    emoji: "🏆",
  },
];

export const MBBSWarriorBadges = () => {
  const [activated, setActivated] = useState(false);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {!activated ? (
          <div className="text-center">
            <button
              onClick={() => setActivated(true)}
              className="group"
            >
              <div className="inline-block p-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 animate-pulse-gentle">
                <Award className="w-24 h-24 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mt-8 mb-4">
                🎮 Ready for a surprise?
              </h2>
              <p className="text-xl text-purple-200">
                Click to activate MBBS Warrior Mode!
              </p>
            </button>
          </div>
        ) : (
          <div className="animate-fade-in-up space-y-12">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 handwritten">
                🎮 Level 2: MBBS Warrior Mode Activated! 🎮
              </h2>
              <p className="text-xl text-purple-200">
                Achievement Unlocked: Year 2 Completed! 🏆
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {badges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.title}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-4 bg-gradient-to-br ${badge.color} rounded-xl`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-2xl font-bold">{badge.title}</h3>
                          <span className="text-3xl">{badge.emoji}</span>
                        </div>
                        <p className="text-purple-200">{badge.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${badge.color} rounded-full animate-pulse-gentle`}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <span className="text-sm font-bold">✅</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 shadow-xl">
              <p className="text-2xl md:text-3xl font-bold text-white handwritten">
                Keep leveling up, Dr. Satwika! 🚀✨
              </p>
              <p className="text-lg text-white/90 mt-2">
                The next level awaits... 🎯
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
