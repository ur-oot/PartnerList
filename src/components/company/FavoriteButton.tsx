"use client";

import { useState } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { Star } from "lucide-react";

interface FavoriteButtonProps {
  companyId: number;
  companyName?: string;
  variant?: "icon" | "button";
}

// 8方向のパーティクル角度と距離（視認性の高いダイナミックな放射）
const PARTICLES = [
  { x: 0, y: -28 },
  { x: 20, y: -20 },
  { x: 28, y: 0 },
  { x: 20, y: 20 },
  { x: 0, y: 28 },
  { x: -20, y: 20 },
  { x: -28, y: 0 },
  { x: -20, y: -20 },
];

export default function FavoriteButton({
  companyId,
  companyName,
  variant = "icon",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const [isBursting, setIsBursting] = useState(false);
  const idNum = Number(companyId);
  const isFav = isLoaded && isFavorite(idNum);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // お気に入り追加時のみスターバーストを発火
    if (!isFav) {
      setIsBursting(true);
      setTimeout(() => setIsBursting(false), 600);
    }

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
        className={`relative group inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-xs transition-all duration-200 active:scale-95 shadow-sm overflow-visible ${
          isFav
            ? "bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 shadow-glow-gold ring-1 ring-amber-400/50"
            : "bg-white/90 backdrop-blur-md text-slate-700 hover:text-amber-600 hover:bg-amber-50/50 border border-slate-200/80"
        }`}
      >
        <div className="relative flex items-center justify-center">
          <span className={`inline-flex ${isBursting ? "animate-star-pop" : ""}`}>
            <Star
              className={`w-4 h-4 transition-transform duration-200 ${
                isFav
                  ? "fill-slate-950 text-slate-950 scale-110"
                  : "text-slate-400 group-hover:text-amber-500 group-hover:scale-110"
              }`}
            />
          </span>

          {/* スターバースト・パーティクル */}
          {isBursting && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
              {PARTICLES.map((p, i) => (
                <span
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-amber-400 shadow-md animate-particle ring-1 ring-yellow-200"
                  style={
                    {
                      "--burst-x": `${p.x}px`,
                      "--burst-y": `${p.y}px`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          )}
        </div>
        <span>{isFav ? "推しパートナー登録中" : "推しパートナーに追加"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      aria-pressed={isFav}
      title={isFav ? "お気に入り解除" : "推しパートナーに追加"}
      className={`relative p-2 rounded-xl transition-all duration-200 active:scale-90 shadow-sm backdrop-blur-md overflow-visible ${
        isFav
          ? "bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 shadow-glow-gold scale-105 ring-1 ring-amber-400/50"
          : "bg-white/90 text-slate-400 hover:text-amber-500 hover:bg-white border border-slate-200/80 hover:scale-110 hover:shadow"
      }`}
    >
      <div className="relative flex items-center justify-center">
        <span className={`inline-flex ${isBursting ? "animate-star-pop" : ""}`}>
          <Star
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isFav ? "fill-slate-950 text-slate-950" : ""
            }`}
          />
        </span>

        {/* スターバースト・パーティクル */}
        {isBursting && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
            {PARTICLES.map((p, i) => (
              <span
                key={i}
                className="absolute w-2 h-2 rounded-full bg-amber-400 shadow-md animate-particle ring-1 ring-yellow-200"
                style={
                  {
                    "--burst-x": `${p.x}px`,
                    "--burst-y": `${p.y}px`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
