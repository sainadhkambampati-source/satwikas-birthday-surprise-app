"use client";

import { useState, useRef } from "react";
import { Stethoscope, Volume2 } from "lucide-react";

export const StethoscopeHeartSound = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [animating, setAnimating] = useState(false);

  const playHeartSound = () => {
    setAnimating(true);
    setIsPlaying(true);

    // Create heart sound effect using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const playBeat = (delay: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 100;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + delay + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + delay + 0.15);
      
      oscillator.start(audioContext.currentTime + delay);
      oscillator.stop(audioContext.currentTime + delay + 0.15);
    };

    // Play heartbeat pattern: lub-dub
    playBeat(0);
    playBeat(0.2);
    playBeat(0.8);
    playBeat(1.0);
    playBeat(1.6);
    playBeat(1.8);

    setTimeout(() => {
      setIsPlaying(false);
      setAnimating(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl">
      <button
        onClick={playHeartSound}
        disabled={isPlaying}
        className={`relative group ${isPlaying ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div
          className={`p-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 ${
            !isPlaying && 'hover:scale-110'
          } ${animating && 'animate-heartbeat'}`}
        >
          <Stethoscope className="w-16 h-16 text-white" />
        </div>
        
        {isPlaying && (
          <Volume2 className="absolute -top-2 -right-2 w-8 h-8 text-pink-500 animate-pulse" />
        )}
      </button>
      
      <p className="mt-6 text-center text-purple-700 font-semibold text-lg">
        {isPlaying ? "🫀 Listening to heartbeat..." : "Click to hear heartbeat 🩺"}
      </p>
      
      {animating && (
        <div className="mt-4 flex gap-2">
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-ping" />
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-ping" style={{ animationDelay: "0.2s" }} />
        </div>
      )}
    </div>
  );
};
