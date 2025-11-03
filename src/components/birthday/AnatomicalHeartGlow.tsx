"use client";

import { useState } from "react";

export const AnatomicalHeartGlow = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Play heartbeat sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const playHeartbeat = (time: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 80;
      oscillator.type = "sine";
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime + time);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + time + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + time + 0.2);
      
      oscillator.start(audioContext.currentTime + time);
      oscillator.stop(audioContext.currentTime + time + 0.2);
    };
    
    // Double beat (lub-dub)
    playHeartbeat(0);
    playHeartbeat(0.15);
    
    // Create sparkles
    const newSparkles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
    }));
    setSparkles(newSparkles);
    
    setTimeout(() => {
      setIsAnimating(false);
      setSparkles([]);
    }, 2000);
  };

  return (
    <div className="flex justify-center py-16 relative">
      <div 
        className="relative cursor-pointer transition-transform hover:scale-105"
        onClick={handleClick}
      >
        {/* Animated ripple effect on click */}
        {isAnimating && (
          <>
            <div className="absolute inset-0 -m-8 rounded-full border-4 border-pink-400 animate-[heartbeatRipple_1s_ease-out]" />
            <div className="absolute inset-0 -m-8 rounded-full border-4 border-pink-400 animate-[heartbeatRipple_1s_ease-out_0.15s]" />
            <div className="absolute inset-0 -m-16 rounded-full bg-pink-400/20 animate-[heartbeatRipple_1.5s_ease-out]" />
          </>
        )}

        {/* Sparkles */}
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-[sparkle_1s_ease-out_forwards]"
            style={{
              transform: `translate(${sparkle.x}px, ${sparkle.y}px)`,
            }}
          />
        ))}

        {/* Glowing aura */}
        <div className={`absolute inset-0 blur-3xl opacity-60 ${isAnimating ? "animate-pulse" : "animate-pulse-gentle"}`}>
          <div className="w-full h-full bg-gradient-to-br from-pink-400 via-red-400 to-purple-400 rounded-full" />
        </div>

        {/* Anatomical heart SVG */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className={`relative z-10 ${isAnimating ? "animate-[heartbeat_0.6s_ease-in-out]" : "animate-heartbeat"}`}
          style={{ filter: "drop-shadow(0 0 20px rgba(244, 114, 182, 0.6))" }}
        >
          {/* Main heart shape */}
          <path
            d="M100,170 C50,140 20,110 20,80 C20,55 35,40 55,40 C70,40 85,48 100,65 C115,48 130,40 145,40 C165,40 180,55 180,80 C180,110 150,140 100,170 Z"
            fill="#f472b6"
            className="animate-pulse-gentle"
          />
          
          {/* Anatomical details - ventricles */}
          <path
            d="M100,65 L85,90 L100,110 L115,90 Z"
            fill="#ec4899"
            opacity="0.8"
          />
          
          {/* Aorta */}
          <path
            d="M100,40 L100,65"
            stroke="#be185d"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Pulmonary arteries */}
          <path
            d="M100,50 L85,45"
            stroke="#be185d"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M100,50 L115,45"
            stroke="#be185d"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Veins */}
          <ellipse cx="70" cy="75" rx="8" ry="12" fill="#db2777" opacity="0.7" />
          <ellipse cx="130" cy="75" rx="8" ry="12" fill="#db2777" opacity="0.7" />
          
          {/* Sparkle accents */}
          <circle cx="60" cy="60" r="3" fill="#fbbf24" className="animate-sparkle">
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="140" cy="60" r="3" fill="#fbbf24" className="animate-sparkle">
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle cx="100" cy="100" r="4" fill="#fde047" className="animate-sparkle">
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1s" />
          </circle>
        </svg>

        {/* Heartbeat lines */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64">
          <svg width="256" height="40" viewBox="0 0 256 40" className="opacity-80">
            <path
              d="M 0 20 L 60 20 L 75 5 L 85 35 L 95 15 L 105 20 L 165 20"
              fill="none"
              stroke="#f472b6"
              strokeWidth="3"
              className="animate-pulse-gentle"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};