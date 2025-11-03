"use client";

import { useState } from "react";
import { Sparkles, Heart } from "lucide-react";

export const FutureVision = () => {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-peach-50">
      <div className="max-w-4xl mx-auto text-center">
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="group relative mx-auto"
          >
            <div className="p-16 bg-gradient-to-br from-purple-500 via-pink-500 to-peach-400 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 animate-pulse-gentle">
              <div className="relative">
                <Sparkles className="w-32 h-32 text-white" />
                <div className="absolute inset-0 animate-sparkle">
                  <Sparkles className="w-32 h-32 text-yellow-200" />
                </div>
              </div>
            </div>
            <p className="mt-8 text-2xl md:text-3xl font-bold handwritten text-purple-700">
              🪄 Tap to see your future ✨
            </p>
          </button>
        ) : (
          <div className="animate-fade-in-up space-y-8">
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-7xl font-bold handwritten mb-6"
                style={{
                  background: "linear-gradient(135deg, #c084fc 0%, #f472b6 50%, #fb923c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Dr. Satwika
              </h2>
              <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 animate-sparkle" />
              <Sparkles className="absolute -bottom-4 -left-4 w-6 h-6 text-pink-400 animate-sparkle" style={{ animationDelay: "0.5s" }} />
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-12 space-y-6">
              <Heart className="w-20 h-20 text-pink-500 fill-pink-500 animate-heartbeat mx-auto" />
              
              <h3 className="text-4xl font-bold text-purple-700">
                Saving Lives ✨
              </h3>
              
              <div className="space-y-4 text-lg text-purple-600 max-w-2xl mx-auto">
                <p>
                  A compassionate healer, bringing hope to countless patients.
                </p>
                <p>
                  A brilliant diagnostician, solving medical mysteries with expertise and care.
                </p>
                <p>
                  A beacon of light in the medical community, inspiring the next generation.
                </p>
                <p className="text-2xl font-bold text-pink-600 handwritten mt-8">
                  The world is waiting for you! 🌍💫
                </p>
              </div>

              <div className="flex justify-center gap-3 mt-8">
                <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-pulse-gentle" />
                <Heart className="w-8 h-8 text-purple-400 fill-purple-400 animate-pulse-gentle" style={{ animationDelay: "0.3s" }} />
                <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-pulse-gentle" style={{ animationDelay: "0.6s" }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
