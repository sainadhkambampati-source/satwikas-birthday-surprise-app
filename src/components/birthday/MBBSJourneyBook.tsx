"use client";

import { useState } from "react";
import { Book, ChevronLeft, ChevronRight } from "lucide-react";

const pages = [
  {
    title: "Anatomy Grind 📚",
    content: "Late night study sessions, endless diagrams, memorizing every bone, muscle, and nerve. The foundation of medicine.",
    emoji: "🦴",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    title: "Night Shifts ☕",
    content: "Coffee-fueled nights, ward rounds, learning from real cases. Where textbook knowledge meets real life.",
    emoji: "🏥",
    gradient: "from-pink-400 to-peach-400",
  },
  {
    title: "Proud Future Doctor 🩺",
    content: "Every challenge conquered, every exam passed, every patient smile—shaping you into the healer you're meant to be.",
    emoji: "✨",
    gradient: "from-peach-400 to-purple-400",
  },
];

export const MBBSJourneyBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-purple-700">
          📖 Your MBBS Journey
        </h2>
        <p className="text-center text-purple-600 mb-12">
          A story of dedication, growth, and dreams
        </p>

        {!isOpen ? (
          <div className="flex justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="group relative"
            >
              <div className="p-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                <Book className="w-24 h-24 text-white" />
              </div>
              <p className="mt-6 text-xl font-semibold text-purple-700">
                Click to open your journey book
              </p>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Page content */}
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-6 animate-fade-in-up">
              <div className="text-8xl mb-4">{pages[currentPage].emoji}</div>
              <h3 className={`text-3xl md:text-4xl font-bold handwritten bg-gradient-to-r ${pages[currentPage].gradient} bg-clip-text text-transparent`}>
                {pages[currentPage].title}
              </h3>
              <p className="text-lg md:text-xl text-purple-600 max-w-2xl leading-relaxed">
                {pages[currentPage].content}
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="p-3 rounded-full bg-purple-100 text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-200 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex gap-2">
                {pages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentPage
                        ? "bg-purple-500 w-8"
                        : "bg-purple-200"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === pages.length - 1}
                className="p-3 rounded-full bg-purple-100 text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-200 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
