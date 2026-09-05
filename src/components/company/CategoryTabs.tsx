"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { CategoryTabKey } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type { CategoryTabKey };

export interface CategoryTabItem {
  key: CategoryTabKey;
  label: string;
  count: number;
  icon?: string;
}

interface CategoryTabsProps {
  tabs: CategoryTabItem[];
  activeTab: CategoryTabKey;
  onSelectTab: (key: CategoryTabKey) => void;
}

export default function CategoryTabs({
  tabs,
  activeTab,
  onSelectTab,
}: CategoryTabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
  } | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // スクロール可能状態を判定
  const checkScrollability = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScrollability();
    el.addEventListener("scroll", checkScrollability, { passive: true });
    window.addEventListener("resize", checkScrollability);

    return () => {
      el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [checkScrollability, tabs]);

  // アクティブタブの位置・幅を計測しスプリングピルを追従 & 自動センタリング
  useEffect(() => {
    const activeIndex = tabs.findIndex((t) => t.key === activeTab);
    const activeEl = tabRefs.current[activeIndex];
    const containerEl = containerRef.current;

    if (activeEl && containerEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });

      // 選択したタブが視界外にある場合、スムーズに中央へスクロール
      activeEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab, tabs]);

  // マウスドラッグによる掴みスクロール（Grab to Scroll）
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // 左クリックのみ
    const el = scrollContainerRef.current;
    if (!el) return;

    setIsDragging(true);
    hasMovedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.4; // スクロール感度
    if (Math.abs(walk) > 4) {
      hasMovedRef.current = true;
    }
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // マウスホイールの縦回転を横スクロールに変換
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    // 縦方向のホイール移動を横スクロールに変換
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
    }
  };

  // 左右矢印ボタンによるスクロール
  const scrollByAmount = (amount: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  // WAI-ARIA準拠のキーボードナビゲーション（左右矢印キー、Home、End）
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;

    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      const nextTab = tabs[nextIndex];
      onSelectTab(nextTab.key);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="relative mb-8 group/tabbar select-none">
      {/* 左スクロールボタン & フェードグラデーション */}
      <div
        className={`absolute left-0 top-0 bottom-0 z-20 flex items-center pr-6 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent transition-opacity duration-200 pointer-events-none ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => scrollByAmount(-220)}
          aria-label="前のタブを表示"
          className="pointer-events-auto p-1.5 rounded-full bg-white/95 text-slate-700 shadow-md border border-slate-200/80 hover:bg-white hover:text-slate-950 hover:scale-105 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* 右スクロールボタン & フェードグラデーション */}
      <div
        className={`absolute right-0 top-0 bottom-0 z-20 flex items-center pl-6 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent transition-opacity duration-200 pointer-events-none ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => scrollByAmount(220)}
          aria-label="次のタブを表示"
          className="pointer-events-auto p-1.5 rounded-full bg-white/95 text-slate-700 shadow-md border border-slate-200/80 hover:bg-white hover:text-slate-950 hover:scale-105 active:scale-95 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* スクロールコンテナ */}
      <div
        ref={scrollContainerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className={`overflow-x-auto pb-1 scrollbar-none select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div
          ref={containerRef}
          role="tablist"
          aria-label="パートナーカテゴリー"
          className="relative inline-flex items-center gap-1 bg-white/80 backdrop-blur-xl border border-slate-200/80 p-1.5 rounded-2xl shadow-sm min-w-full sm:min-w-0"
        >
          {/* スプリング物理スライディング・ピル */}
          {indicatorStyle && (
            <div
              aria-hidden="true"
              className="absolute top-1.5 bottom-1.5 rounded-xl bg-[#040915] shadow-md ring-1 ring-tochigi-yellow/30 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
              }}
            />
          )}

          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                id={`tab-${tab.key}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.key}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => {
                  // ドラッグ移動した直後はタブ選択を発火させない
                  if (hasMovedRef.current) return;
                  onSelectTab(tab.key);
                }}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`group relative z-10 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors duration-200 shrink-0 select-none ${
                  isActive
                    ? "text-tochigi-yellow font-bold"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/60"
                }`}
              >
                {tab.icon && (
                  <span aria-hidden="true" className="text-sm">
                    {tab.icon}
                  </span>
                )}
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-tight transition-colors ${
                    isActive
                      ? "bg-tochigi-yellow/20 text-tochigi-yellow"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
