"use client";

import { useState, useEffect } from "react";
import { BookOpen, Brain, Clock, FileText, Calendar, Stethoscope, Book as BookIcon, Lightbulb } from "lucide-react";
import { ExamCountdown } from "./ExamCountdown";

export const StudyHub = () => {
  const [activeTab, setActiveTab] = useState<"flashcards" | "mnemonics" | "timer" | "notes" | "countdown">("flashcards");
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Pomodoro timer countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning && (timerMinutes > 0 || timerSeconds > 0)) {
      interval = setInterval(() => {
        if (timerSeconds === 0) {
          if (timerMinutes === 0) {
            setIsTimerRunning(false);
            // Play completion sound
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
          } else {
            setTimerMinutes(timerMinutes - 1);
            setTimerSeconds(59);
          }
        } else {
          setTimerSeconds(timerSeconds - 1);
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning, timerMinutes, timerSeconds]);

  const resetTimer = (minutes: number) => {
    setIsTimerRunning(false);
    setTimerMinutes(minutes);
    setTimerSeconds(0);
  };

  const flashcards = [
    { front: "What is the normal heart rate?", back: "60-100 bpm" },
    { front: "What does COPD stand for?", back: "Chronic Obstructive Pulmonary Disease" },
    { front: "Normal body temperature?", back: "37°C (98.6°F)" },
    { front: "Normal respiratory rate?", back: "12-20 breaths per minute" },
    { front: "Normal blood pressure?", back: "120/80 mmHg" },
  ];

  const mnemonics = [
    { topic: "Cranial Nerves", mnemonic: "Oh Oh Oh To Touch And Feel Very Good Velvet AH!", description: "Olfactory, Optic, Oculomotor, Trochlear, Trigeminal, Abducens, Facial, Vestibulocochlear, Glossopharyngeal, Vagus, Accessory, Hypoglossal", keywords: ["Oh", "Touch", "Feel", "Good", "Velvet"] },
    { topic: "Carpal Bones", mnemonic: "Some Lovers Try Positions That They Can't Handle", description: "Scaphoid, Lunate, Triquetrum, Pisiform, Trapezium, Trapezoid, Capitate, Hamate", keywords: ["Some", "Lovers", "Try", "Positions", "Handle"] },
    { topic: "Wound Healing Phases", mnemonic: "I PROMise", description: "Inflammation, Proliferation, Remodeling, Organization, Maturation", keywords: ["PROM", "ise"] },
  ];

  const handleCardFlip = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  const nextCard = () => {
    setIsCardFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((currentCardIndex + 1) % flashcards.length);
    }, 300);
  };

  const prevCard = () => {
    setIsCardFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((currentCardIndex - 1 + flashcards.length) % flashcards.length);
    }, 300);
  };

  return (
    <section id="study-hub" className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-purple-700">
          📚 Study & Revision Hub
        </h2>
        <p className="text-center text-purple-600 mb-12">Your personal MBBS learning companion</p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { id: "flashcards" as const, icon: BookOpen, label: "Flashcards" },
            { id: "mnemonics" as const, icon: Brain, label: "Mnemonics" },
            { id: "timer" as const, icon: Clock, label: "Pomodoro" },
            { id: "countdown" as const, icon: Calendar, label: "Exam Timer" },
            { id: "notes" as const, icon: FileText, label: "Notes" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.id
                  ? "bg-purple-500 text-white shadow-lg scale-105"
                  : "bg-white text-purple-600 hover:bg-purple-100 shadow-md"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-purple-100">
          {activeTab === "flashcards" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-purple-700 flex items-center gap-2">
                  <Stethoscope className="w-6 h-6" />
                  Quick Review Flashcards
                </h3>
                <div className="text-sm text-purple-600 font-medium bg-purple-100 px-4 py-2 rounded-full">
                  Card {currentCardIndex + 1} / {flashcards.length}
                </div>
              </div>

              {/* Interactive Flashcard */}
              <div className="perspective-1000 mb-6">
                <div
                  onClick={handleCardFlip}
                  className={`relative w-full h-64 cursor-pointer transition-transform duration-500 transform-style-3d ${
                    isCardFlipped ? "rotate-y-180" : ""
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front of card */}
                  <div
                    className={`absolute inset-0 backface-hidden bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl shadow-xl p-8 flex items-center justify-center ${
                      isCardFlipped ? "invisible" : "visible"
                    }`}
                  >
                    <div className="text-center">
                      <p className="text-sm text-purple-100 mb-4">Question</p>
                      <p className="text-2xl font-semibold text-white">{flashcards[currentCardIndex].front}</p>
                      <p className="text-sm text-purple-100 mt-6">Click to reveal answer</p>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className={`absolute inset-0 backface-hidden bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl shadow-xl p-8 flex items-center justify-center ${
                      isCardFlipped ? "visible" : "invisible"
                    }`}
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <div className="text-center">
                      <p className="text-sm text-blue-100 mb-4">Answer</p>
                      <p className="text-3xl font-bold text-white">{flashcards[currentCardIndex].back}</p>
                      <p className="text-sm text-blue-100 mt-6">Click to flip back</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={prevCard}
                  className="px-6 py-3 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  ← Previous
                </button>
                <button
                  onClick={nextCard}
                  className="px-6 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {activeTab === "mnemonics" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-purple-700 mb-6 flex items-center gap-2">
                <Brain className="w-6 h-6" />
                Medical Mnemonics Library
              </h3>
              {mnemonics.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-purple-200"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Lightbulb className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                    <h4 className="font-bold text-purple-800 text-lg">{item.topic}</h4>
                  </div>
                  <p className="text-pink-600 font-semibold handwritten text-2xl mb-3 px-4 py-2 bg-white/50 rounded-lg inline-block">
                    &quot;{item.mnemonic.split(' ').map((word, i) => (
                      <span key={i} className={item.keywords.some(kw => word.includes(kw)) ? "text-purple-700 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" : ""}>
                        {word}{' '}
                      </span>
                    ))}&quot;
                  </p>
                  <p className="text-purple-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "timer" && (
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-purple-700 mb-6 flex items-center justify-center gap-2">
                <Clock className="w-6 h-6" />
                Pomodoro Study Timer
              </h3>
              <div className="inline-block p-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mb-8 shadow-xl transform transition-all duration-300 hover:scale-105">
                <p className="text-6xl font-bold text-purple-700">
                  {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
                </p>
              </div>
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="px-8 py-3 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {isTimerRunning ? "⏸️ Pause" : "▶️ Start"}
                </button>
                <button
                  onClick={() => resetTimer(timerMinutes > 0 ? timerMinutes : 25)}
                  className="px-8 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  🔄 Reset
                </button>
              </div>
              <div className="flex justify-center gap-3">
                {[25, 15, 5].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => resetTimer(mins)}
                    className="px-4 py-2 bg-white border-2 border-purple-300 text-purple-600 rounded-full hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 font-medium shadow-md"
                  >
                    {mins} min
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "countdown" && (
            <div>
              <ExamCountdown />
            </div>
          )}

          {activeTab === "notes" && (
            <div>
              <h3 className="text-2xl font-semibold text-purple-700 mb-6 flex items-center gap-2">
                <BookIcon className="w-6 h-6" />
                Quick Notes & Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Anatomy Diagrams", icon: "🦴", color: "from-red-100 to-pink-100" },
                  { title: "Pharmacology Tables", icon: "💊", color: "from-blue-100 to-purple-100" },
                  { title: "Clinical Cases", icon: "🩺", color: "from-green-100 to-teal-100" },
                  { title: "Examination Techniques", icon: "🔬", color: "from-yellow-100 to-orange-100" },
                ].map((note, idx) => (
                  <div
                    key={idx}
                    className={`p-6 bg-gradient-to-r ${note.color} rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center justify-between border border-purple-200`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{note.icon}</span>
                      <span className="font-semibold text-purple-800">{note.title}</span>
                    </div>
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};