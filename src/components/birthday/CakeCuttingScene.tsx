"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Star, PartyPopper, Stethoscope, Gift } from "lucide-react";

interface CakePiece {
  id: number;
  message: string;
  emoji: string;
  clicked: boolean;
}

interface CakeCuttingSceneProps {
  onContinue?: () => void;
}

export const CakeCuttingScene = ({ onContinue }: CakeCuttingSceneProps) => {
  const [cakeState, setCakeState] = useState<"intact" | "cutting" | "cut">("intact");
  const [showMessage, setShowMessage] = useState(false);
  const [showPieces, setShowPieces] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [lights, setLights] = useState<Array<{ id: number; color: string; x: string; y: string; delay: number }>>([]);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([]);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; type: string }>>([]);
  const [showKnife, setShowKnife] = useState(false);
  const [flashLights, setFlashLights] = useState(false);
  const [cakePieces, setCakePieces] = useState<CakePiece[]>([
    { id: 1, message: "A slice of joy", emoji: "🍰", clicked: false },
    { id: 2, message: "A wish of success", emoji: "🎓", clicked: false },
    { id: 3, message: "A sprinkle of love", emoji: "💕", clicked: false },
    { id: 4, message: "Healing hearts ahead", emoji: "🩺", clicked: false },
    { id: 5, message: "Dreams come true", emoji: "✨", clicked: false },
    { id: 6, message: "Endless laughter", emoji: "😊", clicked: false },
  ]);

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

  const handleCutCake = () => {
    setCakeState("cutting");
    setShowKnife(true);
    playCelebrationSound();

    // Knife animation duration
    setTimeout(() => {
      setCakeState("cut");
      setShowKnife(false);
      
      // Create particle burst
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: 50 + (Math.random() - 0.5) * 40,
        y: 50 + (Math.random() - 0.5) * 40,
        type: ["sprinkle", "heart", "glitter"][i % 3],
      }));
      setParticles(newParticles);

      // Show birthday message
      setTimeout(() => {
        setShowMessage(true);
        setFlashLights(true);
        playBirthdayMelody();
        
        // Stop flashing after 3 seconds
        setTimeout(() => {
          setFlashLights(false);
        }, 3000);

        // Show cake pieces after message
        setTimeout(() => {
          setShowPieces(true);
          
          // Show navigation buttons after pieces
          setTimeout(() => {
            setShowNavigation(true);
          }, 1000);
        }, 2000);
      }, 1000);
    }, 2000);
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
    <div className="fixed inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-600 overflow-hidden z-50">
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

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 md:py-12">
        
        {/* Cake Scene */}
        <motion.div
          className="relative mb-6 md:mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Cake Container - Made larger */}
          <div className="relative w-80 h-96 md:w-[28rem] md:h-[30rem] flex items-center justify-center">
            
            {/* Intact Cake */}
            {cakeState === "intact" && (
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
                  {/* Cake Layers - Made larger */}
                  <div className="relative">
                    {/* Top Layer - Frosting */}
                    <motion.div
                      className="w-72 md:w-80 h-24 md:h-28 bg-gradient-to-br from-pink-200 via-pink-300 to-pink-200 rounded-t-full border-4 border-pink-400"
                      style={{
                        boxShadow: "0 0 60px rgba(236, 72, 153, 0.8), 0 0 100px rgba(236, 72, 153, 0.4), inset 0 -10px 30px rgba(255, 255, 255, 0.4)",
                        filter: "drop-shadow(0 10px 40px rgba(236, 72, 153, 0.6))",
                      }}
                    />
                    {/* Middle Layer - Cream */}
                    <div 
                      className="w-72 md:w-80 h-20 md:h-24 bg-gradient-to-r from-yellow-100 via-amber-50 to-yellow-100 border-4 border-yellow-300"
                      style={{
                        boxShadow: "0 0 30px rgba(252, 211, 77, 0.5), inset 0 5px 15px rgba(255, 255, 255, 0.5)",
                      }}
                    />
                    {/* Bottom Layer - Chocolate */}
                    <div 
                      className="w-72 md:w-80 h-24 md:h-28 bg-gradient-to-br from-amber-800 via-amber-900 to-amber-800 rounded-b-lg border-4 border-amber-700"
                      style={{
                        boxShadow: "0 20px 50px rgba(146, 64, 14, 0.8), inset 0 -10px 20px rgba(0, 0, 0, 0.3)",
                      }}
                    />
                  </div>

                  {/* Candles */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-6">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="relative">
                        <div className="w-4 h-12 bg-gradient-to-b from-blue-300 to-blue-500 rounded-sm shadow-lg" />
                        <motion.div
                          className="absolute -top-5 left-1/2 -translate-x-1/2 w-5 h-7"
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
                      className="absolute w-1.5 h-2.5 rounded-full"
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
              {showKnife && (
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
            {cakeState === "cut" && !showPieces && (
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
                      <div className="w-20 h-24 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-pink-400 rounded-t-lg border-2 border-pink-500" style={{ clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)" }} />
                        <div className="absolute bottom-0 w-full h-10 bg-gradient-to-r from-yellow-200 to-amber-100 border-2 border-yellow-300" />
                        <div className="absolute bottom-0 w-full h-8 bg-gradient-to-br from-amber-800 to-amber-900 rounded-b-lg border-2 border-amber-700" />
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
                    <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                  ) : particle.type === "glitter" ? (
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Cut the Cake Button - Positioned below cake with proper spacing */}
          {cakeState === "intact" && (
            <motion.div className="flex justify-center mt-6">
              <motion.button
                onClick={handleCutCake}
                className="relative px-10 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full font-bold text-xl md:text-2xl shadow-2xl overflow-hidden group"
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
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-sparkle" />
                <Sparkles className="absolute -bottom-2 -left-2 w-5 h-5 text-pink-300 animate-sparkle" style={{ animationDelay: "0.5s" }} />
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Birthday Message - Updated text */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              className="text-center max-w-3xl mx-auto mb-8 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h2
                className="handwritten text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
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
                className="text-xl md:text-2xl lg:text-3xl text-white font-medium leading-relaxed drop-shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                May your journey be as sweet as this cake! 🍰✨
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cake Pieces with Messages */}
        <AnimatePresence>
          {showPieces && (
            <motion.div
              className="w-full max-w-5xl mx-auto px-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-center text-white text-lg md:text-xl mb-6 handwritten drop-shadow-lg">
                ✨ Click on each slice to reveal a special wish ✨
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {cakePieces.map((piece, index) => (
                  <motion.button
                    key={piece.id}
                    onClick={() => handlePieceClick(piece.id)}
                    className="relative p-4 md:p-6 bg-white/20 backdrop-blur-md rounded-2xl border-2 border-white/40 hover:border-white/60 transition-all group"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      boxShadow: "0 8px 32px rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <div className="text-3xl md:text-4xl mb-2">{piece.emoji}</div>
                    <AnimatePresence mode="wait">
                      {piece.clicked ? (
                        <motion.p
                          key="message"
                          className="text-white font-semibold text-sm md:text-base drop-shadow-md"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {piece.message}
                        </motion.p>
                      ) : (
                        <motion.p
                          key="tap"
                          className="text-white/70 text-xs md:text-sm"
                          exit={{ opacity: 0, y: -10 }}
                        >
                          Tap to reveal
                        </motion.p>
                      )}
                    </AnimatePresence>
                    
                    {/* Sparkle effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-pink-400/0 group-hover:from-yellow-400/20 group-hover:to-pink-400/20 rounded-2xl transition-all pointer-events-none"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Three Navigation Buttons */}
        <AnimatePresence>
          {showNavigation && (
            <motion.div
              className="w-full max-w-5xl mx-auto px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-center text-white/90 text-base md:text-lg mb-6 font-medium drop-shadow-lg">
                Choose your adventure 🚀
              </p>
              
              {/* Desktop: Horizontal layout */}
              <div className="hidden md:flex gap-4 justify-center">
                <motion.button
                  onClick={onContinue}
                  className="group relative px-8 py-4 bg-white/90 hover:bg-white text-purple-700 rounded-2xl font-bold text-lg shadow-2xl overflow-hidden transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 10px 40px rgba(255, 255, 255, 0.3)",
                      "0 15px 50px rgba(255, 255, 255, 0.5)",
                      "0 10px 40px rgba(255, 255, 255, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <PartyPopper className="w-5 h-5" />
                    Continue Celebration
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-200 to-purple-200 opacity-0 group-hover:opacity-50 transition-opacity"
                  />
                </motion.button>

                <motion.button
                  className="group relative px-8 py-4 bg-white/90 hover:bg-white text-blue-700 rounded-2xl font-bold text-lg shadow-2xl overflow-hidden transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 10px 40px rgba(255, 255, 255, 0.3)",
                      "0 15px 50px rgba(255, 255, 255, 0.5)",
                      "0 10px 40px rgba(255, 255, 255, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5" />
                    Medical Magic Tools
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-200 to-cyan-200 opacity-0 group-hover:opacity-50 transition-opacity"
                  />
                </motion.button>

                <motion.button
                  className="group relative px-8 py-4 bg-white/90 hover:bg-white text-pink-700 rounded-2xl font-bold text-lg shadow-2xl overflow-hidden transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 10px 40px rgba(255, 255, 255, 0.3)",
                      "0 15px 50px rgba(255, 255, 255, 0.5)",
                      "0 10px 40px rgba(255, 255, 255, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Gift className="w-5 h-5" />
                    More Surprises
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-200 to-rose-200 opacity-0 group-hover:opacity-50 transition-opacity"
                  />
                </motion.button>
              </div>

              {/* Mobile: Vertical stacked layout */}
              <div className="flex md:hidden flex-col gap-4">
                <motion.button
                  onClick={onContinue}
                  className="group relative w-full px-8 py-5 bg-white/90 hover:bg-white text-purple-700 rounded-2xl font-bold text-lg shadow-2xl overflow-hidden transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    boxShadow: [
                      "0 10px 40px rgba(255, 255, 255, 0.3)",
                      "0 15px 50px rgba(255, 255, 255, 0.5)",
                      "0 10px 40px rgba(255, 255, 255, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <PartyPopper className="w-6 h-6" />
                    Continue Celebration
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-200 to-purple-200 opacity-0 group-active:opacity-50 transition-opacity"
                  />
                </motion.button>

                <motion.button
                  className="group relative w-full px-8 py-5 bg-white/90 hover:bg-white text-blue-700 rounded-2xl font-bold text-lg shadow-2xl overflow-hidden transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    boxShadow: [
                      "0 10px 40px rgba(255, 255, 255, 0.3)",
                      "0 15px 50px rgba(255, 255, 255, 0.5)",
                      "0 10px 40px rgba(255, 255, 255, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Stethoscope className="w-6 h-6" />
                    Medical Magic Tools
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-200 to-cyan-200 opacity-0 group-active:opacity-50 transition-opacity"
                  />
                </motion.button>

                <motion.button
                  className="group relative w-full px-8 py-5 bg-white/90 hover:bg-white text-pink-700 rounded-2xl font-bold text-lg shadow-2xl overflow-hidden transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    boxShadow: [
                      "0 10px 40px rgba(255, 255, 255, 0.3)",
                      "0 15px 50px rgba(255, 255, 255, 0.5)",
                      "0 10px 40px rgba(255, 255, 255, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Gift className="w-6 h-6" />
                    More Surprises
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-200 to-rose-200 opacity-0 group-active:opacity-50 transition-opacity"
                  />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};