"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { FAVORITES_STORAGE_KEY } from "@/lib/constants";

interface FavoritesContextType {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
  isLoaded: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

/**
 * localStorage からお気に入りID配列を取得
 */
function getStoredFavorites(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const item = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!item) return [];
    const parsed = JSON.parse(item);
    if (Array.isArray(parsed)) {
      return parsed
        .map((id) => Number(id))
        .filter((id) => !isNaN(id) && id > 0);
    }
    return [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // マウント時に localStorage から安全に初期化
  useEffect(() => {
    setFavorites(getStoredFavorites());
    setIsLoaded(true);

    // 別タブ・ウィンドウ間での更新同期
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === FAVORITES_STORAGE_KEY) {
        setFavorites(getStoredFavorites());
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // お気に入りトグル（単一のContext内で確実に同期）
  const toggleFavorite = useCallback((id: number) => {
    const numId = Number(id);
    setFavorites((prev) => {
      const exists = prev.includes(numId);
      const updated = exists
        ? prev.filter((item) => item !== numId)
        : [...prev, numId];
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to save favorites to localStorage:", err);
      }
      return updated;
    });
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.includes(Number(id)),
    [favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        isLoaded,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
