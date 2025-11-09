"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Play, Pause } from "lucide-react";

export const HeartbeatVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  useEffect(() => {
    // Create audio context and analyser (for real audio if available)
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyserNode = ctx.createAnalyser();
    analyserNode.fftSize = 256;
    
    setAudioContext(ctx);
    setAnalyser(analyserNode);

    return () => {
      ctx.close();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const drawHeartbeat = (time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

    // Clear canvas
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(0, 0, width, height);

    // Draw ECG-style heartbeat line
    ctx.strokeStyle = "#ec4899";
    ctx.lineWidth = 3;
    ctx.beginPath();

    const beatFrequency = isPlaying ? 1.5 : 1;
    const amplitude = isPlaying ? 60 : 40;

    for (let x = 0; x < width; x++) {
      const progress = x / width;
      const beatPosition = (time * 0.001 * beatFrequency + progress) % 1;
      
      let y = centerY;

      // ECG waveform pattern
      if (beatPosition < 0.1) {
        y = centerY - amplitude * (beatPosition / 0.1);
      } else if (beatPosition < 0.15) {
        y = centerY - amplitude + amplitude * 2 * ((beatPosition - 0.1) / 0.05);
      } else if (beatPosition < 0.25) {
        y = centerY + amplitude - amplitude * 3 * ((beatPosition - 0.15) / 0.1);
      } else if (beatPosition < 0.35) {
        y = centerY - amplitude * 2 + amplitude * 2 * ((beatPosition - 0.25) / 0.1);
      } else {
        y = centerY;
      }

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();

    // Draw glow effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ec4899";
    ctx.stroke();
    ctx.shadowBlur = 0;

    animationRef.current = requestAnimationFrame(drawHeartbeat);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    animationRef.current = requestAnimationFrame(drawHeartbeat);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-rose-100 via-pink-50 to-red-50">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-pink-700 mb-4 handwritten flex items-center justify-center gap-3">
          <Heart className="w-10 h-10 fill-pink-500" />
          Heartbeat Music Visualizer
          <Heart className="w-10 h-10 fill-pink-500" />
        </h2>
        <p className="text-pink-600 text-lg">A Heart That Heals — This beat's for you 💓</p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          {/* Heartbeat display */}
          <div className="relative mb-8">
            <canvas
              ref={canvasRef}
              className="w-full h-48 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl"
            />
            
            {/* Animated heart icon */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={isPlaying ? {
                scale: [1, 1.2, 1],
              } : {}}
              transition={{
                duration: 0.8,
                repeat: isPlaying ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-16 h-16 text-pink-500 fill-pink-400 drop-shadow-lg" />
            </motion.div>
          </div>

          {/* Controls */}
          <div className="text-center space-y-4">
            <button
              onClick={togglePlay}
              className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5" />
                  Pause Heartbeat
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start Heartbeat
                </>
              )}
            </button>

            <p className="text-pink-600 font-medium">
              {isPlaying ? "💓 Your healing heart beats strong" : "Click to start the heartbeat"}
            </p>
          </div>

          {/* Inspirational text */}
          <motion.div
            className="mt-8 text-center space-y-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xl md:text-2xl handwritten text-pink-700">
              Every beat represents a life you'll touch 💖
            </p>
            <p className="text-lg text-pink-600">
              Keep this rhythm of compassion alive, Dr. Satwika ✨
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
