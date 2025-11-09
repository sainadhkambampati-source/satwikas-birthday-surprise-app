"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, CheckCircle, XCircle, Trophy, Sparkles } from "lucide-react";

interface Question {
  question: string;
  options: { text: string; emoji: string }[];
  correctIndex: number;
}

const questions: Question[] = [
  {
    question: "What's the best antidote to sadness?",
    options: [
      { text: "Laughter", emoji: "😊" },
      { text: "Chocolate", emoji: "🍫" },
      { text: "Friends", emoji: "👯‍♀️" },
      { text: "Music", emoji: "🎶" },
    ],
    correctIndex: -1, // All are correct!
  },
  {
    question: "What makes a great doctor?",
    options: [
      { text: "Knowledge", emoji: "📚" },
      { text: "Compassion", emoji: "💖" },
      { text: "Dedication", emoji: "⭐" },
      { text: "All of these", emoji: "✨" },
    ],
    correctIndex: 3,
  },
  {
    question: "What's Dr. Satwika's superpower?",
    options: [
      { text: "Healing Hearts", emoji: "💝" },
      { text: "Spreading Joy", emoji: "🌟" },
      { text: "Inspiring Others", emoji: "✨" },
      { text: "All of these!", emoji: "🦸‍♀️" },
    ],
    correctIndex: 3,
  },
];

export const MBBSQuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (index: number) => {
    const question = questions[currentQuestion];
    const correct = question.correctIndex === -1 || question.correctIndex === index;
    
    setSelectedAnswer(index);
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4 handwritten flex items-center justify-center gap-3">
          <Brain className="w-10 h-10" />
          MBBS Brain Game
          <Sparkles className="w-10 h-10" />
        </h2>
        <p className="text-purple-600 text-lg">Test your medical wisdom! 🎯</p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-purple-600">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-semibold text-pink-600">
                    Score: {score}
                  </span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question */}
              <h3 className="text-2xl md:text-3xl font-bold text-purple-700 mb-8 text-center">
                {questions[currentQuestion].question}
              </h3>

              {/* Options */}
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => selectedAnswer === null && handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                    whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                    className={`w-full p-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center gap-4 ${
                      selectedAnswer === index
                        ? isCorrect
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-purple-100 hover:bg-purple-200 text-purple-700"
                    }`}
                  >
                    <span className="text-3xl">{option.emoji}</span>
                    <span className="flex-1 text-left">{option.text}</span>
                    {selectedAnswer === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                      >
                        {isCorrect ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <XCircle className="w-6 h-6" />
                        )}
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {selectedAnswer !== null && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-6 text-center font-semibold text-lg ${
                      isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isCorrect ? "✨ Brilliant! You're amazing!" : "💖 That's okay, you're still wonderful!"}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl text-center"
            >
              <Trophy className="w-24 h-24 mx-auto mb-6 text-yellow-500" />
              <h3 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4 handwritten">
                Dr. Satwika, You Passed!
              </h3>
              <p className="text-3xl font-bold text-pink-600 mb-6">
                Score: {score} / {questions.length}
              </p>
              <p className="text-xl text-purple-600 mb-8">
                🌟 You passed with flying colors! 🌟
              </p>
              <motion.button
                onClick={resetQuiz}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Play Again 🎮
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
