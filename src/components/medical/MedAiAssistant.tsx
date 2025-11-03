"use client";

import { useState } from "react";
import { Send, Stethoscope, Lightbulb } from "lucide-react";

export const MedAiAssistant = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; content: string }>>([
    { role: "ai", content: "Hi Dr. Satwika! 👋 I'm your MedAI Assistant. Ask me anything about medicine, mnemonics, or study tips!" },
  ]);

  const handleSend = () => {
    if (!question.trim()) return;

    setMessages([...messages, { role: "user", content: question }]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Great question! Let me help you understand this better...",
        "Here's a helpful mnemonic for that: Remember 'ABCDE' approach!",
        "That's an important concept in medicine. Keep studying hard! 💪",
      ];
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: responses[Math.floor(Math.random() * responses.length)] },
      ]);
    }, 1000);

    setQuestion("");
  };

  return (
    <section id="medai" className="py-16 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-blue-700">
          🤖 MedAI Assistant
        </h2>
        <p className="text-center text-blue-600 mb-12">Your 24/7 medical study companion</p>

        {/* Chat Interface */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-blue-50 to-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-gradient-to-r from-blue-100 to-purple-100 text-purple-800"
                  }`}
                >
                  {msg.role === "ai" && <Stethoscope className="inline w-4 h-4 mr-2" />}
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t-2 border-purple-100">
            <div className="flex gap-3">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about medicine, mnemonics, or get study tips..."
                className="flex-1 px-6 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-purple-400 transition-colors"
              />
              <button
                onClick={handleSend}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl hover:shadow-lg transition-shadow text-left">
            <Lightbulb className="w-6 h-6 text-purple-600 mb-2" />
            <p className="font-semibold text-purple-800">Generate Mnemonic</p>
            <p className="text-sm text-purple-600">Create custom memory aids</p>
          </button>
          <button className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl hover:shadow-lg transition-shadow text-left">
            <Stethoscope className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-semibold text-blue-800">Quick Doubt Solver</p>
            <p className="text-sm text-blue-600">Get instant medical answers</p>
          </button>
        </div>
      </div>
    </section>
  );
};
