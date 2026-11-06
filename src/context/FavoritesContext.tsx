"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";
import { FAVORITES_STORAGE_KEY } from "@/lib/constants";

interface FavoritesContextType {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
  isLoaded: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const STORAGE_CHANGE_EVENT = "favorites-storage-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(STORAGE_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(STORAGE_CHANGE_EVENT, callback);
  };
}

let cachedRaw: string | null = null;
let cachedFavorites: number[] = [];

function getFavoritesSnapshot(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY) || "[]";
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      const parsed = JSON.parse(raw);
      cachedFavorites = Array.isArray(parsed)
        ? parsed
            .map((id) => Number(id))
            .filter((id) => !isNaN(id) && id > 0)
        : [];
    }
  } catch {
    cachedFavorites = [];
  }
  return cachedFavorites;
}

const emptyServerFavorites: number[] = [];
function getServerFavoritesSnapshot(): number[] {
  return emptyServerFavorites;
}

function getLoadedSnapshot(): boolean {
  return true;
}
function getServerLoadedSnapshot(): boolean {
  return false;
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const favorites = useSyncExternalStore(
    subscribe,
    getFavoritesSnapshot,
    getServerFavoritesSnapshot
  );

  const isLoaded = useSyncExternalStore(
    subscribe,
    getLoadedSnapshot,
    getServerLoadedSnapshot
  );

  const toggleFavorite = useCallback((id: number) => {
    const numId = Number(id);
    const current = getFavoritesSnapshot();
    const exists = current.includes(numId);
    const updated = exists
      ? current.filter((item) => item !== numId)
      : [...current, numId];

    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(STORAGE_CHANGE_EVENT));
    } catch (err) {
      console.error("Failed to save favorites to localStorage:", err);
    }
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
