"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, MessageCircle, Star } from "lucide-react";

interface Wish {
  id: number;
  name: string;
  message: string;
  color: string;
  icon: string;
}

const defaultWishes: Wish[] = [
  { id: 1, name: "Your Best Friend", message: "Happy birthday to the kindest soul I know! May this year bring you closer to your dreams! 💕", color: "from-pink-400 to-rose-400", icon: "💖" },
  { id: 2, name: "Study Group", message: "To our anatomy hero! Wishing you a year filled with success and joy! 🎉", color: "from-purple-400 to-pink-400", icon: "📚" },
  { id: 3, name: "Lab Partner", message: "Happy birthday Dr. Satwika! Your dedication inspires us all! ✨", color: "from-blue-400 to-cyan-400", icon: "🔬" },
  { id: 4, name: "Hostel Roommate", message: "To late-night study sessions and early morning laughs! Happy birthday! 🎂", color: "from-yellow-400 to-orange-400", icon: "🌟" },
  { id: 5, name: "Class Topper", message: "Wishing the future's best doctor an amazing birthday! Keep shining! 💫", color: "from-green-400 to-emerald-400", icon: "🏆" },
  { id: 6, name: "Your Mentor", message: "So proud of your journey! Happy birthday to a compassionate healer! 🩺", color: "from-indigo-400 to-purple-400", icon: "👨‍⚕️" },
];

export const WishesWall = () => {
  const [wishes, setWishes] = useState<Wish[]>(defaultWishes);
  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const colors = [
    "from-pink-400 to-rose-400",
    "from-purple-400 to-pink-400",
    "from-blue-400 to-cyan-400",
    "from-yellow-400 to-orange-400",
    "from-green-400 to-emerald-400",
    "from-indigo-400 to-purple-400",
  ];

  const icons = ["💖", "✨", "🎉", "🌟", "💫", "🎂", "🌸", "💝"];

  const addWish = () => {
    if (!newName.trim() || !newMessage.trim()) return;

    const newWish: Wish = {
      id: Date.now(),
      name: newName,
      message: newMessage,
      color: colors[Math.floor(Math.random() * colors.length)],
      icon: icons[Math.floor(Math.random() * icons.length)],
    };

    setWishes([newWish, ...wishes]);
    setNewName("");
    setNewMessage("");
    setShowForm(false);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Floating background particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-pink-300 rounded-full opacity-40"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto text-center mb-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4 handwritten flex items-center justify-center gap-3">
          <MessageCircle className="w-10 h-10" />
          Digital Wishes Wall
          <Sparkles className="w-10 h-10" />
        </h2>
        <p className="text-purple-600 text-lg mb-6">Messages from friends who love you! 💌</p>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          ✨ Add Your Wish
        </button>
      </div>

      {/* Add wish form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto mb-12 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl relative z-10"
          >
            <h3 className="text-xl font-bold text-purple-700 mb-4">Leave Your Wish 💝</h3>
            <input
              type="text"
              placeholder="Your name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-2 mb-3 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:outline-none"
            />
            <textarea
              placeholder="Your birthday message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 mb-3 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:outline-none resize-none"
            />
            <div className="flex gap-3">
              <button
                onClick={addWish}
                className="flex-1 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:scale-105 transition-all"
              >
                Post Wish
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wishes grid */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {wishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, scale: 0.8, rotateZ: -10 }}
                animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1, type: "spring", bounce: 0.4 }}
                whileHover={{ scale: 1.05, rotateZ: 2 }}
                className={`bg-gradient-to-br ${wish.color} p-6 rounded-2xl shadow-lg cursor-pointer relative overflow-hidden`}
              >
                {/* Sticky note effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-200 opacity-50 rounded-b-lg" />
                
                {/* Icon */}
                <div className="text-4xl mb-3 text-center">{wish.icon}</div>

                {/* Message */}
                <p className="text-white font-medium text-center mb-3 leading-relaxed">
                  {wish.message}
                </p>

                {/* Name */}
                <p className="text-white/90 text-sm text-center font-semibold">
                  — {wish.name}
                </p>

                {/* Sparkle decoration */}
                <Star className="absolute top-2 right-2 w-4 h-4 text-white/60 animate-sparkle" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
