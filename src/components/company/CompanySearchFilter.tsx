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
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 mb-8">
      {/* 検索入力 & フィルター開閉ボタン */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder="会社名、業種、キーワードで検索..."
            className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-tochigi-yellow focus:border-transparent transition-all"
          />
          {keyword && (
            <button
              onClick={() => onKeywordChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              aria-label="検索ワードをクリア"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setIsOpenMobileFilter(!isOpenMobileFilter)}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
            isOpenMobileFilter || selectedCategories.length > 0 || selectedIndustries.length > 0
              ? "bg-tochigi-navy text-white border-tochigi-navy"
              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
          }`}
        >
          <Filter className="w-4 h-4" />
          <span>絞り込み</span>
          {(selectedCategories.length > 0 || selectedIndustries.length > 0) && (
            <span className="w-5 h-5 rounded-full bg-tochigi-yellow text-tochigi-navy text-xs font-bold flex items-center justify-center">
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
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                サポートメニュー
              </span>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => {
                  const isSelected = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => onCategoryToggle(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-tochigi-navy text-tochigi-yellow shadow-sm font-semibold"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
            <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              業種
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
              {industries.map((ind) => {
                const isSelected = selectedIndustries.includes(ind);
                return (
                  <button
                    key={ind}
                    onClick={() => onIndustryToggle(ind)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-tochigi-navy text-tochigi-yellow shadow-sm font-semibold"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
          <span>表示中:</span>
          <strong className="text-slate-800 font-bold text-sm">
            {matchedCount} / {totalCount}
          </strong>
          <span>社</span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-tochigi-navy transition-colors font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            条件をクリア
          </button>
        )}
      </div>
    </div>
  );
}
