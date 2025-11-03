"use client";

import { useState } from "react";
import { Gift, Heart, Sparkles } from "lucide-react";

export const SurpriseGift = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setShowMessage(true), 1500);
  };

  return (
    <section id="gift" className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-peach-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-purple-700">
          🎁 Special Birthday Surprise
        </h2>
        <p className="text-purple-600 mb-12">A gift made just for you</p>

        {!isOpen ? (
          <div className="flex flex-col items-center">
            <button
              onClick={handleOpen}
              className="group relative mb-8"
            >
              <div className="p-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-pulse-gentle">
                <Gift className="w-24 h-24 text-white" />
              </div>
              <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 animate-sparkle" />
              <Sparkles className="absolute -bottom-4 -left-4 w-6 h-6 text-pink-400 animate-sparkle" style={{ animationDelay: "0.5s" }} />
            </button>
            <p className="text-xl font-semibold text-purple-700 mb-4">
              Tap for Your Birthday Gift 🎁
            </p>
            <p className="text-purple-600">
              Something special awaits you...
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Heartbeat to Heart Animation */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {!showMessage ? (
                  <svg width="200" height="100" viewBox="0 0 200 100" className="text-pink-500">
                    <path
                      d="M 0 50 L 40 50 L 50 20 L 60 80 L 70 30 L 80 50 L 120 50 L 130 20 L 140 80 L 150 30 L 160 50 L 200 50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="animate-pulse-gentle"
                    />
                  </svg>
                ) : (
                  <Heart className="w-32 h-32 text-pink-500 fill-pink-500 animate-heartbeat" />
                )}
              </div>
            </div>

            {showMessage && (
              <div className="bg-white rounded-3xl shadow-2xl p-12 animate-fade-in-up">
                <h3 className="text-3xl font-bold text-purple-700 mb-6 handwritten">
                  Dear Future Dr. Satwika,
                </h3>
                
                <div className="space-y-4 text-lg text-purple-600 leading-relaxed text-left max-w-2xl mx-auto">
                  <p>
                    Happy Birthday to an incredible person with an even more incredible future ahead! 🌸
                  </p>
                  <p>
                    As you navigate through the challenging yet rewarding journey of MBBS, remember that every sleepless night, every difficult exam, and every complex concept you master is shaping you into the amazing doctor you&apos;re meant to be.
                  </p>
                  <p>
                    Your dedication to medicine shows the beautiful heart you have for helping others. The world needs more compassionate doctors like you.
                  </p>
                  <p>
                    This platform is built with admiration for your hard work and belief in your bright future. May it support you through your studies and remind you that you&apos;re capable of achieving anything you set your mind to.
                  </p>
                  <p className="text-center font-semibold text-purple-800 text-xl mt-8">
                    Keep shining, keep healing, keep inspiring! ✨
                  </p>
                  <p className="text-center text-pink-600 handwritten text-2xl mt-4">
                    Made for future Dr. Satwika 🩺✨
                  </p>
                </div>

                {/* Decorative hearts */}
                <div className="flex justify-center gap-4 mt-8">
                  <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-pulse-gentle" />
                  <Heart className="w-8 h-8 text-purple-400 fill-purple-400 animate-pulse-gentle" style={{ animationDelay: "0.3s" }} />
                  <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-pulse-gentle" style={{ animationDelay: "0.6s" }} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
