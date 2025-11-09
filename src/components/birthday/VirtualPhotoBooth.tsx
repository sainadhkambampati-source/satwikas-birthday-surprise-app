"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, Download, RotateCcw, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const VirtualPhotoBooth = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" },
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setIsCameraOn(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraOn(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame
    ctx.drawImage(video, 0, 0);

    // Draw birthday frame overlay
    drawBirthdayFrame(ctx, canvas.width, canvas.height);

    // Convert to image
    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);
    stopCamera();
  };

  const drawBirthdayFrame = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Border frame
    ctx.strokeStyle = "#c084fc";
    ctx.lineWidth = 20;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Inner border
    ctx.strokeStyle = "#f472b6";
    ctx.lineWidth = 10;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    // Text overlay
    ctx.font = "bold 48px 'Dancing Script', cursive";
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#c084fc";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";
    
    const text = "Dr. Satwika's Day 2025 🎂";
    const textY = height - 60;
    
    ctx.strokeText(text, width / 2, textY);
    ctx.fillText(text, width / 2, textY);

    // Decorative elements
    const drawSparkle = (x: number, y: number, size: number) => {
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    };

    drawSparkle(80, 80, 8);
    drawSparkle(width - 80, 80, 8);
    drawSparkle(80, height - 80, 8);
    drawSparkle(width - 80, height - 80, 8);
  };

  const downloadImage = () => {
    if (!capturedImage) return;
    
    const link = document.createElement("a");
    link.href = capturedImage;
    link.download = "satwika-birthday-2025.png";
    link.click();
  };

  const retake = () => {
    setCapturedImage(null);
    startCamera();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-pink-100 via-purple-50 to-peach-50">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4 handwritten flex items-center justify-center gap-3">
          <Camera className="w-10 h-10" />
          Virtual Photo Booth
          <Sparkles className="w-10 h-10" />
        </h2>
        <p className="text-purple-600 text-lg">Capture your special moment with a birthday frame! 📸</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
        >
          {!isCameraOn && !capturedImage && (
            <div className="text-center py-16">
              <Camera className="w-24 h-24 mx-auto mb-6 text-purple-400" />
              <button
                onClick={startCamera}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Start Camera 📸
              </button>
            </div>
          )}

          {isCameraOn && !capturedImage && (
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-200">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover mirror"
                  style={{ transform: "scaleX(-1)" }}
                />
                <div className="absolute inset-0 border-8 border-purple-400/50 pointer-events-none rounded-2xl" />
                <p className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 px-6 py-2 rounded-full text-purple-700 font-semibold">
                  Say Cheese! 📸
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={capturePhoto}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Capture Photo
                </button>
                <button
                  onClick={stopCamera}
                  className="px-6 py-4 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {capturedImage && (
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden">
                <img src={capturedImage} alt="Captured" className="w-full h-auto" />
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={downloadImage}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>
                <button
                  onClick={retake}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Retake
                </button>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </motion.div>
      </div>
    </section>
  );
};