"use client";

import { useState } from "react";

export const BreathingAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  const handleClick = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Play calming chime sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const playChime = (frequency: number, time: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = "sine";
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime + time);
      gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + time + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + time + 2);
      
      oscillator.start(audioContext.currentTime + time);
      oscillator.stop(audioContext.currentTime + time + 2);
    };
    
    // Calming chime sequence
    playChime(523.25, 0);      // C5
    playChime(659.25, 0.3);    // E5
    playChime(783.99, 0.6);    // G5
    
    // Create floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 300,
      y: Math.random() * -400,
      delay: Math.random() * 0.5,
    }));
    setParticles(newParticles);
    
    setTimeout(() => {
      setIsAnimating(false);
      setParticles([]);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 relative">
      <div 
        className="relative cursor-pointer"
        onClick={handleClick}
      >
        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0"
            style={{
              animation: `float ${3 + Math.random()}s ease-out ${particle.delay}s forwards`,
              left: `calc(50% + ${particle.x}px)`,
            }}
          />
        ))}

        {/* Breathing circle - expands/contracts more dramatically on click */}
        <div 
          className={`w-32 h-32 rounded-full bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 opacity-40 transition-all duration-300 ${
            isAnimating ? "scale-150" : ""
          }`}
          style={{
            animation: isAnimating ? "breathing 2s ease-in-out 2" : "breathing 4s ease-in-out infinite",
          }}
        />
        
        {/* Inner circle */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
        >
          <div 
            className={`w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 opacity-60 transition-all duration-300 ${
              isAnimating ? "scale-150" : ""
            }`}
            style={{
              animation: isAnimating ? "breathing 2s ease-in-out 0.25s 2" : "breathing 4s ease-in-out infinite 0.5s",
            }}
          />
        </div>

        {/* Core circle */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
        >
          <div 
            className={`w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 opacity-80 transition-all duration-300 ${
              isAnimating ? "scale-150" : ""
            }`}
            style={{
              animation: isAnimating ? "breathing 2s ease-in-out 0.5s 2" : "breathing 4s ease-in-out infinite 1s",
            }}
          />
        </div>

        {/* Glow effect on click */}
        {isAnimating && (
          <div className="absolute inset-0 -m-16 rounded-full bg-purple-400/30 blur-2xl animate-pulse" />
        )}
      </div>

      <p 
        className={`mt-8 text-2xl font-semibold text-purple-600 handwritten transition-all duration-300 ${
          isAnimating ? "scale-110 text-purple-700" : ""
        }`}
        style={{
          animation: "breathingText 4s ease-in-out infinite",
        }}
      >
        Breathe... You&apos;ve got this 🌸
      </p>
    </div>
  );
};