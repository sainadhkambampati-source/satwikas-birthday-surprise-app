"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Edit2, Trash2, Plus } from "lucide-react";

interface Exam {
  id: string;
  name: string;
  date: string;
  icon: string;
  color: string;
}

const motivationalMessages = [
  "Every heartbeat takes you closer to your dream white coat 🩺✨",
  "You're building a legacy of healing, one exam at a time 💜",
  "Future doctor, your dedication lights the way forward 🌟",
  "Each moment of study is a step toward saving lives 🫀",
  "Your hard work today heals tomorrow's world 🌸",
  "Medicine chose you because you're meant for greatness 💫"
];

const examIcons = ["📚", "🩺", "🧠", "💉", "🔬", "⚕️", "💊", "🫀"];
const examColors = [
  "from-purple-100 to-pink-100",
  "from-blue-100 to-purple-100",
  "from-pink-100 to-peach-100",
  "from-indigo-100 to-purple-100",
  "from-rose-100 to-pink-100"
];

export const ExamCountdown = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(examIcons[0]);
  const [selectedColor, setSelectedColor] = useState(examColors[0]);
  const [countdowns, setCountdowns] = useState<Record<string, { days: number; hours: number; minutes: number; seconds: number }>>({});
  const [motivationalMessage] = useState(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);

  // Load exams from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("medical-exams");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setExams(parsed);
      } catch (e) {
        console.error("Failed to load exams:", e);
      }
    }
  }, []);

  // Save exams to localStorage whenever they change
  useEffect(() => {
    if (exams.length > 0) {
      localStorage.setItem("medical-exams", JSON.stringify(exams));
    }
  }, [exams]);

  // Update countdowns every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns: Record<string, { days: number; hours: number; minutes: number; seconds: number }> = {};
      
      exams.forEach((exam) => {
        const now = new Date().getTime();
        const target = new Date(exam.date).getTime();
        const difference = target - now;

        if (difference > 0) {
          newCountdowns[exam.id] = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
          };
        } else {
          newCountdowns[exam.id] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });

      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [exams]);

  const handleAddOrUpdateExam = () => {
    if (!examName.trim() || !examDate) return;

    if (editingId) {
      // Update existing exam
      setExams(exams.map(exam => 
        exam.id === editingId 
          ? { ...exam, name: examName, date: examDate, icon: selectedIcon, color: selectedColor }
          : exam
      ));
      setEditingId(null);
    } else {
      // Add new exam
      const newExam: Exam = {
        id: Date.now().toString(),
        name: examName,
        date: examDate,
        icon: selectedIcon,
        color: selectedColor
      };
      setExams([...exams, newExam]);
    }

    // Reset form
    setExamName("");
    setExamDate("");
    setSelectedIcon(examIcons[0]);
    setSelectedColor(examColors[0]);
    setShowForm(false);
  };

  const handleEdit = (exam: Exam) => {
    setExamName(exam.name);
    setExamDate(exam.date);
    setSelectedIcon(exam.icon);
    setSelectedColor(exam.color);
    setEditingId(exam.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setExams(exams.filter(exam => exam.id !== id));
    if (exams.length === 1) {
      localStorage.removeItem("medical-exams");
    }
  };

  const handleCancel = () => {
    setExamName("");
    setExamDate("");
    setSelectedIcon(examIcons[0]);
    setSelectedColor(examColors[0]);
    setEditingId(null);
    setShowForm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-purple-600" />
          <h3 className="text-2xl font-bold text-purple-800">Exam Countdown ⏰</h3>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            Add Exam
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-lg border-2 border-purple-200 animate-fade-in-up">
          <h4 className="text-lg font-bold text-purple-800 mb-4">
            {editingId ? "Edit Exam" : "Add New Exam"}
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-purple-700 font-semibold mb-2">Exam Name</label>
              <input
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="e.g., First Internal, Final Exams"
                className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-purple-700 font-semibold mb-2">Exam Date & Time</label>
              <input
                type="datetime-local"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none transition-colors"
              />
            </div>
            
            {/* Icon Selector */}
            <div>
              <label className="block text-purple-700 font-semibold mb-2">Choose Icon</label>
              <div className="flex flex-wrap gap-2">
                {examIcons.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setSelectedIcon(icon)}
                    className={`text-2xl p-2 rounded-lg transition-all hover:scale-110 ${
                      selectedIcon === icon ? "bg-purple-200 ring-2 ring-purple-400" : "bg-white hover:bg-purple-50"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <label className="block text-purple-700 font-semibold mb-2">Choose Color Theme</label>
              <div className="flex flex-wrap gap-2">
                {examColors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} transition-all hover:scale-110 ${
                      selectedColor === color ? "ring-4 ring-purple-400" : "ring-2 ring-purple-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAddOrUpdateExam}
                disabled={!examName.trim() || !examDate}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {editingId ? "Update Exam" : "Set Countdown"}
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 border-2 border-purple-300 text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exams List */}
      {exams.length > 0 ? (
        <div className="space-y-4">
          {exams.map((exam, index) => {
            const countdown = countdowns[exam.id] || { days: 0, hours: 0, minutes: 0, seconds: 0 };
            const isPast = countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0;
            
            return (
              <div
                key={exam.id}
                className={`p-6 bg-gradient-to-br ${exam.color} rounded-3xl shadow-lg border-2 border-white/50 animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{exam.icon}</span>
                    <div>
                      <h4 className="text-xl font-bold text-purple-800">{exam.name}</h4>
                      <p className="text-sm text-purple-600 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(exam.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(exam)}
                      className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                      title="Edit exam"
                    >
                      <Edit2 className="w-4 h-4 text-purple-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(exam.id)}
                      className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                      title="Delete exam"
                    >
                      <Trash2 className="w-4 h-4 text-rose-600" />
                    </button>
                  </div>
                </div>

                {/* Countdown Display */}
                {!isPast ? (
                  <div className="grid grid-cols-4 gap-2 sm:gap-4">
                    {[
                      { label: "Days", value: countdown.days },
                      { label: "Hours", value: countdown.hours },
                      { label: "Mins", value: countdown.minutes },
                      { label: "Secs", value: countdown.seconds },
                    ].map((item) => (
                      <div key={item.label} className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 shadow-md">
                        <div className="text-2xl sm:text-3xl font-bold text-purple-700">{item.value}</div>
                        <div className="text-xs sm:text-sm text-purple-600 mt-1">{item.label}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-rose-100 rounded-2xl p-4 text-center">
                    <p className="text-rose-700 font-semibold">🎯 Exam Day Has Arrived!</p>
                  </div>
                )}

                {/* Days Left Badge */}
                {!isPast && countdown.days > 0 && (
                  <div className="mt-4 text-center">
                    <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-800 rounded-full font-bold text-sm">
                      {countdown.days} {countdown.days === 1 ? "Day" : "Days"} Left
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        !showForm && (
          <div className="p-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-lg text-center border-2 border-dashed border-purple-300">
            <Calendar className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <p className="text-purple-600 text-lg font-semibold mb-2">No exams scheduled yet</p>
            <p className="text-purple-500 text-sm">Click "Add Exam" to start tracking your countdown!</p>
          </div>
        )
      )}

      {/* Motivational Message */}
      {exams.length > 0 && (
        <div className="text-center p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-peach-100 rounded-2xl shadow-md border-2 border-white/50">
          <p className="text-purple-700 font-semibold text-lg handwritten">
            {motivationalMessage}
          </p>
        </div>
      )}
    </div>
  );
};