"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="ページ先頭に戻る"
      className={`fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-2xl bg-[#040915]/90 text-white shadow-xl border border-white/15 backdrop-blur-xl transition-all duration-300 hover:bg-tochigi-yellow hover:text-slate-950 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-tochigi-yellow hover:shadow-glow-yellow ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
    </button>
  );
}
