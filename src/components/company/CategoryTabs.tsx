"use client";

import { useRef } from "react";
import { CategoryTabKey } from "@/lib/constants";

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
    <div
      role="tablist"
      aria-label="パートナーカテゴリー"
      className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none select-none"
    >
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
            onClick={() => onSelectTab(tab.key)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
              isActive
                ? "bg-tochigi-navy text-tochigi-yellow shadow-md scale-100 ring-2 ring-tochigi-yellow/40"
                : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-sm"
            }`}
          >
            {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                isActive
                  ? "bg-tochigi-yellow text-tochigi-navy"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
