"use client";

import { useState } from "react";
import { Search, Filter, X, RotateCcw } from "lucide-react";

interface CompanySearchFilterProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
  categories: string[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  industries: string[];
  selectedIndustries: string[];
  onIndustryToggle: (industry: string) => void;
  onReset: () => void;
  totalCount: number;
  matchedCount: number;
}

export default function CompanySearchFilter({
  keyword,
  onKeywordChange,
  categories,
  selectedCategories,
  onCategoryToggle,
  industries,
  selectedIndustries,
  onIndustryToggle,
  onReset,
  totalCount,
  matchedCount,
}: CompanySearchFilterProps) {
  const [isOpenMobileFilter, setIsOpenMobileFilter] = useState(false);

  const hasActiveFilters =
    keyword !== "" || selectedCategories.length > 0 || selectedIndustries.length > 0;

  return (
    <div className="specular-card bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-4 sm:p-6 mb-8 shadow-card-modern">
      {/* 検索入力 & フィルター開閉ボタン */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-700 transition-colors" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder="企業名、取扱品目、業種、キーワードで検索..."
            className="w-full pl-12 pr-11 py-3 bg-slate-50/80 border border-slate-200/80 rounded-2xl text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tochigi-yellow/80 focus:border-transparent transition-all shadow-inner"
          />
          {keyword && (
            <button
              onClick={() => onKeywordChange("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-200 transition-colors"
              aria-label="検索ワードをクリア"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setIsOpenMobileFilter(!isOpenMobileFilter)}
          className={`inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl border text-sm font-semibold transition-all ${
            isOpenMobileFilter || selectedCategories.length > 0 || selectedIndustries.length > 0
              ? "bg-[#040915] text-white border-[#040915] shadow-sm"
              : "bg-slate-50/80 text-slate-700 border-slate-200/80 hover:bg-slate-100"
          }`}
        >
          <Filter className="w-4 h-4" />
          <span>絞り込み</span>
          {(selectedCategories.length > 0 || selectedIndustries.length > 0) && (
            <span className="w-5 h-5 rounded-full bg-tochigi-yellow text-slate-950 text-xs font-black flex items-center justify-center font-mono">
              {selectedCategories.length + selectedIndustries.length}
            </span>
          )}
        </button>
      </div>

      {/* フィルター展開セクション */}
      {isOpenMobileFilter && (
        <div className="mt-6 pt-6 border-t border-slate-100 space-y-5 animate-in fade-in duration-150">
          {/* サポートメニュー（カテゴリ） */}
          {categories.length > 0 && (
            <div>
              <span className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2.5">
                サポートメニュー
              </span>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => {
                  const isSelected = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => onCategoryToggle(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs transition-all ${
                        isSelected
                          ? "bg-[#040915] text-tochigi-yellow shadow-sm font-bold ring-1 ring-tochigi-yellow/30"
                          : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 font-medium"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 業種 */}
          <div>
            <span className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2.5">
              業種で絞り込む
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-52 overflow-y-auto pr-1">
              {industries.map((ind) => {
                const isSelected = selectedIndustries.includes(ind);
                return (
                  <button
                    key={ind}
                    onClick={() => onIndustryToggle(ind)}
                    className={`px-3 py-1.5 rounded-xl text-xs transition-all ${
                      isSelected
                        ? "bg-[#040915] text-tochigi-yellow shadow-sm font-bold ring-1 ring-tochigi-yellow/30"
                        : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 font-medium"
                    }`}
                  >
                    {ind}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 件数表示 & リセット */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">表示中のパートナー:</span>
          <strong className="text-slate-900 font-mono font-bold text-sm">
            {matchedCount}
          </strong>
          <span className="text-slate-400 font-mono">/ {totalCount} 社</span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="group inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-900 transition-colors font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform duration-200" />
            <span>条件をクリア</span>
          </button>
        )}
      </div>
    </div>
  );
}
