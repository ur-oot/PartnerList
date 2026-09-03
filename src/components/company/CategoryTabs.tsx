"use client";

export type CategoryTabKey =
  | "all"
  | "top"
  | "supplier"
  | "official"
  | "community"
  | "support";

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
  return (
    <nav
      className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none select-none"
      aria-label="カテゴリー切り替えタブ"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onSelectTab(tab.key)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
              isActive
                ? "bg-tochigi-navy text-tochigi-yellow shadow-md scale-100 ring-2 ring-tochigi-yellow/40"
                : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-sm"
            }`}
          >
            {tab.icon && <span>{tab.icon}</span>}
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
    </nav>
  );
}
