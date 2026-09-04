"use client";

import { useFavorites } from "@/hooks/useFavorites";
import { Star } from "lucide-react";

interface FavoriteButtonProps {
  companyId: number;
  companyName?: string;
  variant?: "icon" | "button";
}

export default function FavoriteButton({
  companyId,
  companyName,
  variant = "icon",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const idNum = Number(companyId);
  const isFav = isLoaded && isFavorite(idNum);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(idNum);
  };

  const label = isFav
    ? `${companyName ? `${companyName}を` : ""}お気に入りから解除`
    : `${companyName ? `${companyName}を` : ""}お気に入りに追加`;

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={label}
        aria-pressed={isFav}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-all duration-200 shadow-sm ${
          isFav
            ? "bg-amber-400 text-slate-900 hover:bg-amber-500 shadow-amber-200"
            : "bg-white text-slate-600 hover:text-amber-600 hover:bg-amber-50/50 border border-slate-200"
        }`}
      >
        <Star
          className={`w-4 h-4 transition-transform duration-200 ${
            isFav ? "fill-slate-900 text-slate-900 scale-110" : "text-slate-400"
          }`}
        />
        <span>{isFav ? "お気に入り登録中" : "お気に入りに追加"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      aria-pressed={isFav}
      title={isFav ? "お気に入り解除" : "お気に入り追加"}
      className={`p-2 rounded-full transition-all duration-200 shadow-sm backdrop-blur-sm ${
        isFav
          ? "bg-amber-400 text-slate-900 hover:bg-amber-500 shadow-amber-200 scale-105"
          : "bg-white/90 text-slate-400 hover:text-amber-500 hover:bg-white border border-slate-200/80 hover:scale-105"
      }`}
    >
      <Star
        className={`w-4 h-4 transition-transform duration-200 ${
          isFav ? "fill-slate-900 text-slate-900" : ""
        }`}
      />
    </button>
  );
}
