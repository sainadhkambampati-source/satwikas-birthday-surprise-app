"use client";

import { useEffect, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { ConfettiBurst } from "./ConfettiBurst";
import { InteractiveBalloons } from "./InteractiveBalloons";
import { FloatingFlowers } from "./FloatingFlowers";

interface BirthdayIntroProps {
  onComplete: () => void;
}

export const BirthdayIntro = ({ onComplete }: BirthdayIntroProps) => {
  const [phase, setPhase] = useState<"loading" | "balloons" | "reveal" | "message" | "confetti">("loading");
  const [loadingText, setLoadingText] = useState("Loading smiles...");
  const [typewriterText, setTypewriterText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; left: string; delay: number; duration: number }>>([]);

  const fullTitle = "Happy Birthday, Dr. Satwika 🌸🩺✨";

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
    }));
    setParticles(newParticles);

    // Phase 1: Loading screen with ECG
    const loadingTexts = ["Loading smiles...", "Warming wishes...", "Preparing magic..."];
    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex++;
      if (textIndex < loadingTexts.length) {
        setLoadingText(loadingTexts[textIndex]);
      }
    }, 1500);

    // Phase 2: Balloons and flowers entrance
    const balloonsTimer = setTimeout(() => {
      clearInterval(textInterval);
      setPhase("balloons");
    }, 4500);

    // Phase 3: Big reveal with typewriter
    const revealTimer = setTimeout(() => {
      setPhase("reveal");
    }, 7500);

    // Phase 4: Wish message
    const messageTimer = setTimeout(() => {
      setPhase("message");
    }, 10500);

    // Phase 5: Confetti burst
    const confettiTimer = setTimeout(() => {
      setPhase("confetti");
    }, 13500);

    // Show button
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 15500);

    return () => {
      clearInterval(textInterval);
      clearTimeout(balloonsTimer);
      clearTimeout(revealTimer);
      clearTimeout(messageTimer);
      clearTimeout(confettiTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  // Typewriter effect for title
  useEffect(() => {
    if (phase === "reveal") {
      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        if (currentIndex <= fullTitle.length) {
          setTypewriterText(fullTitle.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 100);
      return () => clearInterval(typeInterval);
    }
  }, [phase]);

  return (
    <div className="fixed inset-0 bokeh-bg overflow-hidden z-50">
      {/* Phase 1: ECG Loading Screen */}
      {phase === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-white animate-fade-in-up">
          <div className="mb-8">
            {/* ECG Animation */}
            <svg width="300" height="120" viewBox="0 0 300 120" className="text-pink-500">
              <path
                d="M 0 60 L 60 60 L 75 20 L 90 100 L 105 40 L 120 60 L 180 60 L 195 20 L 210 100 L 225 40 L 240 60 L 300 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="animate-pulse-gentle"
                strokeLinecap="round"
              />
              <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-pink-500 fill-pink-500 animate-heartbeat" />
            </svg>
          </div>
          <p className="text-2xl font-semibold text-purple-700 animate-pulse-gentle">{loadingText}</p>
          <div className="mt-6 flex gap-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" />
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            <div className="w-3 h-3 bg-peach-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      )}

      {/* Phase 2+: Balloons & Flowers */}
      {phase !== "loading" && (
        <>
          <InteractiveBalloons show={phase === "balloons" || phase === "reveal" || phase === "message" || phase === "confetti"} />
          <FloatingFlowers show={phase === "balloons" || phase === "reveal" || phase === "message" || phase === "confetti"} />
        </>
      )}

      {/* Floating particles */}
      {phase !== "loading" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute bottom-0 animate-float"
              style={{
                left: particle.left,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            >
              {particle.id % 3 === 0 ? (
                <Heart className="w-4 h-4 text-pink-400 fill-pink-300 opacity-60" />
              ) : particle.id % 3 === 1 ? (
                <Sparkles className="w-3 h-3 text-purple-400 opacity-60" />
              ) : (
                <div className="w-2 h-2 bg-peach-400 rounded-full opacity-60" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Phase 3: Title Reveal with Typewriter */}
      {(phase === "reveal" || phase === "message" || phase === "confetti") && (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <h1
            className="handwritten text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up"
            style={{
              background: "linear-gradient(135deg, #c084fc 0%, #f472b6 50%, #fb923c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 30px rgba(192, 132, 252, 0.3)",
            }}
          >
            {typewriterText}
            {typewriterText.length < fullTitle.length && (
              <span className="inline-block w-1 h-16 bg-purple-500 ml-2 animate-pulse" />
            )}
          </h1>

          {/* Phase 4: Wish Message */}
          {(phase === "message" || phase === "confetti") && (
            <div className="max-w-3xl mx-auto space-y-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <p className="text-2xl md:text-3xl handwritten text-purple-700 leading-relaxed">
                May your dreams heal the world.
              </p>
              <p className="text-2xl md:text-3xl handwritten text-pink-600 leading-relaxed">
                May your journey in medicine shine bright.
              </p>
              <p className="text-2xl md:text-3xl handwritten text-peach-600 leading-relaxed">
                Proud of you, future doctor. ✨
              </p>
            </div>
          )}

          {/* Phase 5: Confetti Burst */}
          {phase === "confetti" && <ConfettiBurst />}

          {/* Button Appears */}
          {showButton && (
            <button
              onClick={onComplete}
              className="mt-12 group relative px-10 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-peach-400 text-white rounded-full font-semibold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-fade-in-up"
              style={{ animationDelay: "1s" }}
            >
              <span className="flex items-center gap-2">
                Begin Your Journey ✨
              </span>
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              <Sparkles className="absolute -top-3 -right-3 w-6 h-6 text-yellow-300 animate-sparkle" />
              <Sparkles className="absolute -bottom-3 -left-3 w-5 h-5 text-pink-300 animate-sparkle" style={{ animationDelay: "0.5s" }} />
            </button>
          )}

          {/* Glowing sparkle effects */}
          <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-yellow-300 rounded-full animate-sparkle blur-sm" />
          <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-pink-300 rounded-full animate-sparkle blur-sm" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-300 rounded-full animate-sparkle blur-sm" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-blue-300 rounded-full animate-sparkle blur-sm" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/5 w-4 h-4 bg-peach-300 rounded-full animate-sparkle blur-sm" style={{ animationDelay: "2s" }} />
          <div className="absolute top-2/3 right-1/5 w-3 h-3 bg-yellow-300 rounded-full animate-sparkle blur-sm" style={{ animationDelay: "2.5s" }} />
        </div>
      )}
    </div>
  );
};