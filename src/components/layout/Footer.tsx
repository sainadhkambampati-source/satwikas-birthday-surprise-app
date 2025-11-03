import { Heart, Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-100 via-pink-100 to-peach-100 py-8 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-heartbeat" />
          <Sparkles className="w-5 h-5 text-purple-600" />
        </div>
        <p className="text-purple-700 font-semibold text-lg mb-2">
          Created with pride for future Dr. Satwika — keep shining ✨
        </p>
        <p className="text-purple-600 text-sm">
          Your journey to becoming an amazing doctor starts here 🩺💜
        </p>
      </div>
    </footer>
  );
};
