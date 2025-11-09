"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Star } from "lucide-react";
import { FireworksMessage } from "./FireworksMessage";

interface CakePiece {
  id: number;
  message: string;
  emoji: string;
  clicked: boolean;
}

interface CakeCuttingSceneProps {
  onContinue: () => void;
}

export const CakeCuttingScene = ({ onContinue }: CakeCuttingSceneProps) => {
  const [cakePhase, setCakePhase] = useState<"initial" | "cutting" | "cut">("initial");
  const [revealedPieces, setRevealedPieces] = useState<number[]>([]);
  const [showFireworks, setShowFireworks] = useState(false);
  const [lights, setLights] = useState<any[]>([]);
  const [confetti, setConfetti] = useState<any[]>([]);
  const [particles, setParticles] = useState<any[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showPieces, setShowPieces] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [flashLights, setFlashLights] = useState(false);

  const [cakePieces, setCakePieces] = useState([
    { id: 0, emoji: "💖", message: "May your healing hands touch countless lives", clicked: false },
    { id: 1, emoji: "🌟", message: "Shine bright, future Dr. Satwika!", clicked: false },
    { id: 2, emoji: "🩺", message: "Your stethoscope will hear miracles", clicked: false },
    { id: 3, emoji: "✨", message: "Dreams do come true, one patient at a time", clicked: false },
    { id: 4, emoji: "🎂", message: "Celebrate every small victory", clicked: false },
    { id: 5, emoji: "💫", message: "You're destined for greatness!", clicked: false },
  ]);

  const handleCutCake = () => {
    setCakePhase("cutting");
    setFlashLights(true);
    
    // Create particles burst
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: 50,
      y: 50,
      type: ["heart", "glitter", "sparkle"][i % 3],
    }));
    setParticles(newParticles);
    
    setTimeout(() => {
      setCakePhase("cut");
      setShowFireworks(true);
      setShowMessage(true);
      setFlashLights(false);
      playCelebrationSound();
      
      setTimeout(() => {
        setShowPieces(true);
        setParticles([]);
        
        setTimeout(() => {
          setShowNavigation(true);
        }, 1000);
      }, 1500);
    }, 2000);
  };

  // Initialize ambient effects (reduced for less clutter)
  useEffect(() => {
    // Create ambient lights (reduced from 30 to 15)
    const newLights = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      color: ["#FFC0CB", "#B794F6", "#93C5FD"][i % 3],
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
    }));
    setLights(newLights);

    // Create confetti (reduced from 50 to 30)
    const newConfetti = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ["#FFC0CB", "#B794F6", "#93C5FD", "#DDA0DD", "#F0E68C"][i % 5],
      delay: Math.random() * 5,
    }));
    setConfetti(newConfetti);

    // Play birthday melody
    playBirthdayMelody();
    playAmbientSounds();
  }, []);

  const playBirthdayMelody = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Happy Birthday melody notes (simplified)
    const melody = [
      { freq: 261.63, duration: 0.4 }, // C
      { freq: 261.63, duration: 0.4 }, // C
      { freq: 293.66, duration: 0.8 }, // D
      { freq: 261.63, duration: 0.8 }, // C
      { freq: 349.23, duration: 0.8 }, // F
      { freq: 329.63, duration: 1.2 }, // E
    ];

    let currentTime = audioContext.currentTime;
    
    melody.forEach((note) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = note.freq;
      oscillator.type = "sine";
      
      gainNode.gain.setValueAtTime(0.1, currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);
      
      oscillator.start(currentTime);
      oscillator.stop(currentTime + note.duration);
      
      currentTime += note.duration;
    });
  };

  const playAmbientSounds = () => {
    // Cheering and clapping sound simulation
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const duration = 2;
    
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 100 + Math.random() * 200;
        oscillator.type = "square";
        
        gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
      }, Math.random() * duration * 1000);
    }
  };

  const playCelebrationSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Celebration chime
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = "sine";
      
      const startTime = audioContext.currentTime + i * 0.15;
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.5);
    });
  };

  const handlePieceClick = (pieceId: number) => {
    setCakePieces((prev) =>
      prev.map((piece) =>
        piece.id === pieceId ? { ...piece, clicked: true } : piece
      )
    );

    // Play click sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 overflow-hidden z-50">
      {/* Show fireworks after cake is cut */}
      {showFireworks && <FireworksMessage />}

      {/* Ambient Lights */}
      <div className="absolute inset-0">
        {lights.map((light) => (
          <motion.div
            key={light.id}
            className="absolute rounded-full blur-3xl opacity-40"
            style={{
              left: light.x,
              top: light.y,
              width: "180px",
              height: "180px",
              backgroundColor: light.color,
            }}
            animate={{
              scale: flashLights ? [1, 1.5, 1, 1.5, 1] : [1, 1.2, 1],
              opacity: flashLights ? [0.4, 0.7, 0.4, 0.7, 0.4] : [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: flashLights ? 0.5 : 4,
              repeat: Infinity,
              delay: light.delay,
            }}
          />
        ))}
      </div>

      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none">
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-2 h-3 rounded opacity-80"
            style={{
              left: `${piece.x}%`,
              backgroundColor: piece.color,
            }}
            animate={{
              y: ["0vh", "110vh"],
              rotate: [0, 360, 720],
              x: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: piece.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content - Optimized for mobile */}
      <div className="relative z-10 h-screen flex flex-col">
        
        {/* Scrollable Content Area - Cake and messages */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-6 pb-28 md:pb-32">
          <div className="flex flex-col items-center justify-start min-h-full">
            
            {/* Cake Display - Emotional Highlight */}
            <motion.div
              className="w-full flex flex-col items-center mb-6 md:mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Cake Container - Perfectly sized */}
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[30rem] flex items-center justify-center mb-6">
                
                {/* Intact Cake */}
                {cakePhase === "initial" && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="relative">
                      {/* Cake Layers */}
                      <div className="relative">
                        {/* Top Layer - Frosting */}
                        <motion.div
                          className="w-64 sm:w-72 md:w-80 h-20 sm:h-24 md:h-28 bg-gradient-to-br from-pink-200 via-pink-300 to-pink-200 rounded-t-full border-4 border-pink-400"
                          style={{
                            boxShadow: "0 0 60px rgba(236, 72, 153, 0.8), 0 0 100px rgba(236, 72, 153, 0.4), inset 0 -10px 30px rgba(255, 255, 255, 0.4)",
                            filter: "drop-shadow(0 10px 40px rgba(236, 72, 153, 0.6))",
                          }}
                        />
                        {/* Middle Layer - Cream */}
                        <div 
                          className="w-64 sm:w-72 md:w-80 h-16 sm:h-20 md:h-24 bg-gradient-to-r from-yellow-100 via-amber-50 to-yellow-100 border-4 border-yellow-300"
                          style={{
                            boxShadow: "0 0 30px rgba(252, 211, 77, 0.5), inset 0 5px 15px rgba(255, 255, 255, 0.5)",
                          }}
                        />
                        {/* Bottom Layer - Chocolate */}
                        <div 
                          className="w-64 sm:w-72 md:w-80 h-20 sm:h-24 md:h-28 bg-gradient-to-br from-amber-800 via-amber-900 to-amber-800 rounded-b-lg border-4 border-amber-700"
                          style={{
                            boxShadow: "0 20px 50px rgba(146, 64, 14, 0.8), inset 0 -10px 20px rgba(0, 0, 0, 0.3)",
                          }}
                        />
                      </div>

                      {/* Candles */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-4 sm:gap-6">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="relative">
                            <div className="w-3 sm:w-4 h-10 sm:h-12 bg-gradient-to-b from-blue-300 to-blue-500 rounded-sm shadow-lg" />
                            <motion.div
                              className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 w-4 sm:w-5 h-6 sm:h-7"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.8, 1, 0.8],
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            >
                              <div className="w-full h-full bg-gradient-to-t from-yellow-400 via-orange-400 to-red-400 rounded-full blur-sm" />
                              <div className="absolute inset-0 bg-gradient-to-t from-yellow-200 via-orange-200 to-red-200 rounded-full" />
                            </motion.div>
                          </div>
                        ))}
                      </div>

                      {/* Decorative Sprinkles */}
                      {Array.from({ length: 25 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 sm:w-1.5 h-2 sm:h-2.5 rounded-full"
                          style={{
                            backgroundColor: ["#FF69B4", "#FFD700", "#87CEEB", "#FF6347", "#9370DB"][i % 5],
                            left: `${15 + Math.random() * 70}%`,
                            top: `${10 + Math.random() * 25}%`,
                          }}
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                        />
                      ))}

                      {/* Enhanced Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-radial from-pink-300/40 to-transparent rounded-full blur-3xl scale-150" />
                      <div className="absolute inset-0 bg-gradient-radial from-purple-300/30 to-transparent rounded-full blur-2xl scale-125" />
                    </div>
                  </motion.div>
                )}

                {/* Knife Animation */}
                <AnimatePresence>
                  {cakePhase === "cutting" && (
                    <motion.div
                      className="absolute top-0 left-1/2 z-20"
                      initial={{ x: -200, y: -100, rotate: -45 }}
                      animate={{ x: -32, y: 100, rotate: -25 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    >
                      <div className="w-8 h-32 bg-gradient-to-b from-gray-300 via-gray-100 to-gray-300 rounded-sm shadow-xl" style={{ clipPath: "polygon(50% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)" }} />
                      <div className="w-6 h-8 bg-gradient-to-br from-amber-700 to-amber-900 rounded-b-lg mx-auto" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Cut Cake Pieces */}
                {cakePhase === "cut" && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="relative w-full h-full flex flex-wrap items-center justify-center gap-2">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="relative"
                          initial={{ scale: 0, rotate: 0 }}
                          animate={{
                            scale: 1,
                            rotate: (i - 2.5) * 15,
                            x: (i - 2.5) * 25,
                            y: Math.abs(i - 2.5) * -15,
                          }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                          {/* Cake Slice */}
                          <div className="w-16 sm:w-20 h-20 sm:h-24 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-pink-400 rounded-t-lg border-2 border-pink-500" style={{ clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)" }} />
                            <div className="absolute bottom-0 w-full h-8 sm:h-10 bg-gradient-to-r from-yellow-200 to-amber-100 border-2 border-yellow-300" />
                            <div className="absolute bottom-0 w-full h-6 sm:h-8 bg-gradient-to-br from-amber-800 to-amber-900 rounded-b-lg border-2 border-amber-700" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Particle Burst */}
                <AnimatePresence>
                  {particles.map((particle) => (
                    <motion.div
                      key={particle.id}
                      className="absolute"
                      style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                      }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1.5, 0],
                        x: (Math.random() - 0.5) * 200,
                        y: (Math.random() - 0.5) * 200,
                        opacity: [1, 1, 0],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5 }}
                    >
                      {particle.type === "heart" ? (
                        <Heart className="w-3 sm:w-4 h-3 sm:h-4 text-pink-400 fill-pink-400" />
                      ) : particle.type === "glitter" ? (
                        <Star className="w-2 sm:w-3 h-2 sm:h-3 text-yellow-400 fill-yellow-400" />
                      ) : (
                        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Cut the Cake Button - Positioned below cake */}
              {cakePhase === "initial" && (
                <motion.button
                  onClick={handleCutCake}
                  className="relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full font-bold text-lg sm:text-xl md:text-2xl shadow-2xl overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 30px rgba(236, 72, 153, 0.7)",
                      "0 0 50px rgba(168, 85, 247, 0.9)",
                      "0 0 30px rgba(236, 72, 153, 0.7)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Cut the Cake 🎂
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 opacity-0 group-hover:opacity-30"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <Sparkles className="absolute -top-2 -right-2 w-5 sm:w-6 h-5 sm:h-6 text-yellow-300 animate-sparkle" />
                  <Sparkles className="absolute -bottom-2 -left-2 w-4 sm:w-5 h-4 sm:h-5 text-pink-300 animate-sparkle" style={{ animationDelay: "0.5s" }} />
                </motion.button>
              )}
            </motion.div>

            {/* Birthday Message */}
            <AnimatePresence>
              {showMessage && (
                <motion.div
                  className="text-center max-w-3xl mx-auto mb-6 md:mb-8 px-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <motion.h2
                    className="handwritten text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4"
                    style={{
                      background: "linear-gradient(135deg, #FFD700 0%, #FF69B4 50%, #87CEEB 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))",
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎉 Happy Birthday, Dr. Satwika! 🎉
                  </motion.h2>
                  <motion.p
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-medium leading-relaxed drop-shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    May your journey be as sweet as this cake! 🍰✨
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cake Pieces with Messages - Compact & Mobile-Optimized */}
            <AnimatePresence>
              {showPieces && (
                <motion.div
                  className="w-full max-w-5xl mx-auto mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-center text-white text-sm sm:text-base md:text-lg mb-3 sm:mb-4 handwritten drop-shadow-lg px-4">
                    ✨ Tap each slice to reveal a special wish ✨
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 px-2">
                    {cakePieces.map((piece, index) => (
                      <motion.button
                        key={piece.id}
                        onClick={() => handlePieceClick(piece.id)}
                        className="relative p-3 sm:p-4 md:p-6 bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl border-2 border-white/40 hover:border-white/60 active:border-white/80 transition-all group touch-manipulation"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          boxShadow: "0 8px 32px rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">{piece.emoji}</div>
                        <AnimatePresence mode="wait">
                          {piece.clicked ? (
                            <motion.p
                              key="message"
                              className="text-white font-semibold text-xs sm:text-sm md:text-base drop-shadow-md"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              {piece.message}
                            </motion.p>
                          ) : (
                            <motion.p
                              key="tap"
                              className="text-white/70 text-xs sm:text-sm"
                              exit={{ opacity: 0, y: -10 }}
                            >
                              Tap to reveal
                            </motion.p>
                          )}
                        </AnimatePresence>
                        
                        {/* Sparkle effect on hover/tap */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-pink-400/0 group-hover:from-yellow-400/20 group-hover:to-pink-400/20 group-active:from-yellow-400/30 group-active:to-pink-400/30 rounded-xl sm:rounded-2xl transition-all pointer-events-none"
                        />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Fixed "Continue Celebration" Button - Always visible at bottom */}
        <AnimatePresence>
          {showNavigation && (
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 pb-6 sm:pb-8 pt-4 px-4 bg-gradient-to-t from-purple-600/50 via-purple-600/30 to-transparent backdrop-blur-sm"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <div className="max-w-md mx-auto">
                <motion.button
                  onClick={onContinue}
                  className="w-full group relative px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white rounded-full font-bold text-base sm:text-lg md:text-xl shadow-2xl overflow-hidden touch-manipulation"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(236, 72, 153, 0.8), 0 0 80px rgba(168, 85, 247, 0.6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 10px 40px rgba(236, 72, 153, 0.6)",
                      "0 15px 60px rgba(168, 85, 247, 0.8)",
                      "0 10px 40px rgba(236, 72, 153, 0.6)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="text-2xl sm:text-3xl">🎉</span>
                    <span>Continue Celebration</span>
                    <span className="text-2xl sm:text-3xl">🎉</span>
                  </span>
                  
                  {/* Animated glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-300/30 via-pink-300/30 to-purple-300/30"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Sparkles */}
                  <Sparkles className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 sm:w-5 h-4 sm:h-5 text-yellow-300 animate-sparkle" />
                  <Sparkles className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-3 sm:w-4 h-3 sm:h-4 text-pink-300 animate-sparkle" style={{ animationDelay: "0.5s" }} />
                  <Sparkles className="absolute top-1/2 left-4 sm:left-6 w-2 sm:w-3 h-2 sm:h-3 text-white animate-sparkle" style={{ animationDelay: "1s" }} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};