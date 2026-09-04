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
      className={`fixed bottom-6 right-6 z-40 flex items-center justify-center w-11 h-11 rounded-full bg-slate-900/90 text-white shadow-lg border border-slate-700/50 backdrop-blur-sm transition-all duration-300 hover:bg-tochigi-yellow hover:text-tochigi-navy hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-tochigi-yellow focus:ring-offset-2 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
    </button>
  );
}
