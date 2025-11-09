"use client";

import { useState } from "react";
import { BirthdayIntro } from "@/components/birthday/BirthdayIntro";
import { CakeCuttingScene } from "@/components/birthday/CakeCuttingScene";
import { Navigation } from "@/components/layout/Navigation";
import { StudyHub } from "@/components/medical/StudyHub";
import { MedAiAssistant } from "@/components/medical/MedAiAssistant";
import { MotivationZone } from "@/components/medical/MotivationZone";
import { SurpriseGift } from "@/components/birthday/SurpriseGift";
import { StethoscopeHeartSound } from "@/components/medical/StethoscopeHeartSound";
import { Footer } from "@/components/layout/Footer";
import { SparkleTrail } from "@/components/birthday/SparkleTrail";
import { HeartRipple } from "@/components/birthday/HeartRipple";
import { MoonStars } from "@/components/birthday/MoonStars";
import { FloatingWishes } from "@/components/birthday/FloatingWishes";
import { MBBSJourneyBook } from "@/components/birthday/MBBSJourneyBook";
import { FutureVision } from "@/components/birthday/FutureVision";
import { MBBSWarriorBadges } from "@/components/medical/MBBSWarriorBadges";
import { AnatomicalHeartGlow } from "@/components/birthday/AnatomicalHeartGlow";
import { BreathingAnimation } from "@/components/birthday/BreathingAnimation";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showCakeCutting, setShowCakeCutting] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleIntroComplete = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowIntro(false);
      setShowCakeCutting(true);
    }, 1000);
  };

  const handleCakeCuttingComplete = () => {
    setShowCakeCutting(false);
  };

  return (
    <>
      {showIntro && (
        <div
          className={`transition-opacity duration-1000 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <BirthdayIntro onComplete={handleIntroComplete} />
        </div>
      )}

      {showCakeCutting && (
        <CakeCuttingScene onContinue={handleCakeCuttingComplete} />
      )}

      {!showIntro && !showCakeCutting && (
        <div className="animate-fade-in-up">
          {/* Magical background effects */}
          <SparkleTrail />
          <HeartRipple />
          <MoonStars />
          <FloatingWishes />
          
          <Navigation />
          
          <main className="pt-16">
            {/* Hero Welcome Section */}
            <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-peach-50 relative overflow-hidden">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold text-purple-700 mb-4 handwritten">
                  Welcome, Dr. Satwika! 🌸
                </h1>
                <p className="text-xl text-purple-600 mb-8">
                  Your personalized medical study companion & birthday celebration ✨
                </p>
              </div>
              
              {/* Interactive Stethoscope */}
              <div className="max-w-2xl mx-auto">
                <StethoscopeHeartSound />
              </div>
            </section>

            {/* Anatomical Heart Glow */}
            <section className="py-16 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-white">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h2 className="text-4xl font-bold text-purple-700 mb-4">
                  🫀 A Heart That Heals
                </h2>
                <p className="text-purple-600 text-lg cursor-pointer hover:scale-105 transition-transform duration-300">
                  Your compassion is the heartbeat of medicine
                </p>
              </div>
              <AnatomicalHeartGlow />
            </section>

            {/* Breathing Animation */}
            <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h2 className="text-4xl font-bold text-purple-700 mb-4">
                  🕊️ Take a Moment
                </h2>
                <p className="text-purple-600 text-lg mb-8 cursor-pointer hover:scale-105 transition-transform duration-300">
                  Calm your mind, find your peace
                </p>
              </div>
              <BreathingAnimation />
            </section>

            <StudyHub />
            <MedAiAssistant />
            <MotivationZone />
            
            {/* MBBS Journey Book */}
            <MBBSJourneyBook />
            
            {/* Future Vision */}
            <FutureVision />
            
            {/* MBBS Warrior Badges */}
            <MBBSWarriorBadges />
            
            <SurpriseGift />
          </main>

          <Footer />
        </div>
      )}
    </>
  );
}