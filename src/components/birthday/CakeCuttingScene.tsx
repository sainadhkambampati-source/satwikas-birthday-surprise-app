"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Star } from "lucide-react";

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

  // Initialize ambient effects
  useEffect(() => {
    // Create ambient lights
    const newLights = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      color: ["#FFC0CB", "#87CEEB", "#FFD700"][i % 3],
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
    }));
    setLights(newLights);

    // Create confetti
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ["#FFC0CB", "#87CEEB", "#FFD700", "#DDA0DD", "#F0E68C"][i % 5],
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
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 overflow-hidden z-50">
      {/* Ambient Lights */}
      <div className="absolute inset-0">
        {lights.map((light) => (
          <motion.div
            key={light.id}
            className="absolute rounded-full blur-3xl"
            style={{
              left: light.x,
              top: light.y,
              width: "200px",
              height: "200px",
              backgroundColor: light.color,
            }}
            animate={{
              scale: flashLights ? [1, 1.5, 1, 1.5, 1] : [1, 1.3, 1],
              opacity: flashLights ? [0.3, 0.6, 0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
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
            className="absolute w-2 h-3 rounded"
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        
        {/* Cake Scene */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Cake Container */}
          <div className="relative w-72 h-80 md:w-96 md:h-96">
            
            {/* Intact Cake */}
            {cakeState === "intact" && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <div className="relative">
                  {/* Cake Layers */}
                  <div className="relative">
                    {/* Top Layer - Frosting */}
                    <motion.div
                      className="w-64 h-20 bg-gradient-to-br from-pink-200 via-pink-300 to-pink-200 rounded-t-full border-4 border-pink-400 shadow-2xl"
                      style={{
                        boxShadow: "0 0 40px rgba(219, 39, 119, 0.6), inset 0 -10px 20px rgba(255, 255, 255, 0.3)",
                      }}
                    />
                    {/* Middle Layer - Cream */}
                    <div className="w-64 h-16 bg-gradient-to-r from-yellow-100 via-cream-200 to-yellow-100 border-4 border-yellow-300 shadow-xl" />
                    {/* Bottom Layer - Chocolate */}
                    <div className="w-64 h-20 bg-gradient-to-br from-amber-800 via-amber-900 to-amber-800 rounded-b-lg border-4 border-amber-700 shadow-2xl" />
                  </div>

                  {/* Candles */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-4">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="relative">
                        <div className="w-3 h-10 bg-gradient-to-b from-blue-300 to-blue-500 rounded-sm" />
                        <motion.div
                          className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-6"
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
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-2 rounded-full"
                      style={{
                        backgroundColor: ["#FF69B4", "#FFD700", "#87CEEB", "#FF6347"][i % 4],
                        left: `${20 + Math.random() * 60}%`,
                        top: `${10 + Math.random() * 20}%`,
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

                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-radial from-pink-300/30 to-transparent rounded-full blur-2xl scale-150" />
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
                        x: (i - 2.5) * 20,
                        y: Math.abs(i - 2.5) * -10,
                      }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      {/* Cake Slice */}
                      <div className="w-16 h-20 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-pink-400 rounded-t-lg border-2 border-pink-500" style={{ clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)" }} />
                        <div className="absolute bottom-0 w-full h-8 bg-gradient-to-r from-yellow-200 to-cream-200 border-2 border-yellow-300" />
                        <div className="absolute bottom-0 w-full h-6 bg-gradient-to-br from-amber-800 to-amber-900 rounded-b-lg border-2 border-amber-700" />
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

          {/* Cut the Cake Button */}
          {cakeState === "intact" && (
            <motion.button
              onClick={handleCutCake}
              className="relative mt-8 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full font-bold text-xl shadow-2xl overflow-hidden group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(236, 72, 153, 0.6)",
                  "0 0 40px rgba(168, 85, 247, 0.8)",
                  "0 0 20px rgba(236, 72, 153, 0.6)",
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
          )}
        </motion.div>

        {/* Birthday Message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              className="text-center max-w-2xl mx-auto mb-8 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h2
                className="handwritten text-3xl md:text-5xl font-bold mb-4"
                style={{
                  background: "linear-gradient(135deg, #FFD700 0%, #FF69B4 50%, #87CEEB 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 30px rgba(255, 215, 0, 0.5)",
                }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎉 Happy Birthday, Dr. Satwika! 🎉
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl text-pink-100 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Wishing you sweetness, laughter, and healing hearts ahead! 💖
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cake Pieces with Messages */}
        <AnimatePresence>
          {showPieces && (
            <motion.div
              className="w-full max-w-4xl mx-auto px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-center text-pink-200 text-lg mb-6 handwritten">
                ✨ Click on each slice to reveal a special wish ✨
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {cakePieces.map((piece, index) => (
                  <motion.button
                    key={piece.id}
                    onClick={() => handlePieceClick(piece.id)}
                    className="relative p-6 bg-gradient-to-br from-pink-300/20 to-purple-300/20 backdrop-blur-sm rounded-2xl border-2 border-pink-300/50 hover:border-pink-400 transition-all group"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-4xl mb-2">{piece.emoji}</div>
                    <AnimatePresence mode="wait">
                      {piece.clicked ? (
                        <motion.p
                          key="message"
                          className="text-pink-100 font-semibold"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {piece.message}
                        </motion.p>
                      ) : (
                        <motion.p
                          key="tap"
                          className="text-pink-200/50 text-sm"
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

        {/* Continue Celebration Button */}
        <AnimatePresence>
          {showPieces && (
            <motion.button
              onClick={onContinue}
              className="mt-12 px-10 py-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-white rounded-full font-bold text-lg shadow-2xl group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Continue Celebration ✨
                <Sparkles className="w-5 h-5" />
              </span>
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                animate={{
                  scale: [1, 1.5, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
