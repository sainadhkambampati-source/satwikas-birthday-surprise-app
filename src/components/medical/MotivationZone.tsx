"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export const MotivationZone = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    { text: "The art of medicine consists of amusing the patient while nature cures the disease.", author: "Voltaire" },
    { text: "Wherever the art of medicine is loved, there is also a love of humanity.", author: "Hippocrates" },
    { text: "Medicine is not only a science; it is also an art.", author: "Paracelsus" },
    { text: "To study medicine without books is to sail an uncharted sea, but to study medicine only from books is not to go to sea at all.", author: "William Osler" },
    { text: "Keep going, Dr. Satwika! Every page you study brings healing to someone's tomorrow. 🌟", author: "Your Journey" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <section id="motivation" className="py-16 px-4 bg-gradient-to-br from-pink-50 via-peach-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-pink-700">
          💬 Motivation Zone
        </h2>
        <p className="text-center text-pink-600 mb-12">Stay inspired on your medical journey</p>

        {/* Quote Card */}
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400" />
          
          <div className="relative z-10">
            <p className="text-2xl md:text-3xl text-purple-800 mb-6 leading-relaxed handwritten text-center">
              &quot;{quotes[currentQuote].text}&quot;
            </p>
            <p className="text-right text-purple-600 font-semibold">
              — {quotes[currentQuote].author}
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 opacity-20">
            <Heart className="w-16 h-16 text-pink-400 fill-pink-400" />
          </div>
          <div className="absolute bottom-4 left-4 opacity-20">
            <Heart className="w-12 h-12 text-purple-400 fill-purple-400" />
          </div>
        </div>

        {/* Heartbeat Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <svg width="200" height="60" viewBox="0 0 200 60" className="text-pink-500">
              <path
                d="M 0 30 L 40 30 L 50 10 L 60 50 L 70 20 L 80 30 L 120 30 L 130 10 L 140 50 L 150 20 L 160 30 L 200 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="animate-pulse-gentle"
              />
            </svg>
            <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-pink-500 fill-pink-500 animate-heartbeat" />
          </div>
        </div>

        {/* Encouragement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-purple-800 text-xl mb-2">🩺 Stay Strong</h3>
            <p className="text-purple-600">
              MBBS is challenging, but remember: every doctor who inspires you once sat where you are now. You&apos;ve got this!
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-blue-800 text-xl mb-2">📚 One Step at a Time</h3>
            <p className="text-blue-600">
              Don&apos;t be overwhelmed by the mountain of knowledge. Take it one page, one concept, one day at a time.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-pink-100 to-peach-100 rounded-2xl hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-pink-800 text-xl mb-2">✨ Believe in Yourself</h3>
            <p className="text-pink-600">
              You chose medicine because you want to make a difference. That compassion will carry you through every challenge.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-peach-100 to-yellow-100 rounded-2xl hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-orange-800 text-xl mb-2">🌟 Future Dr. Satwika</h3>
            <p className="text-orange-600">
              In a few years, you&apos;ll be saving lives, healing patients, and making the world better. Keep pushing forward!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
