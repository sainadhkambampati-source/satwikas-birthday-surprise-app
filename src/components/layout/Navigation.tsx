"use client";

import { useState } from "react";
import { Menu, X, Heart, Stethoscope } from "lucide-react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Study Hub", href: "#study-hub" },
    { label: "MedAI", href: "#medai" },
    { label: "Motivation", href: "#motivation" },
    { label: "Gift", href: "#gift" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-purple-600" />
            <span className="font-bold text-xl text-purple-700">Dr. Satwika&apos;s Hub</span>
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-heartbeat" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-purple-600 hover:bg-purple-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-purple-600 hover:bg-purple-100 rounded-lg font-semibold transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
