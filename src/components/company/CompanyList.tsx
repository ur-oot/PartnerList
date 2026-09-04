"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Company } from "@/types/company";
import CompanyCard from "./CompanyCard";
import CompanySearchFilter from "./CompanySearchFilter";
import CategoryTabs, { CategoryTabKey, CategoryTabItem } from "./CategoryTabs";
import { getIndustries } from "@/lib/companies";
import { TAB_DEFINITIONS } from "@/lib/constants";
import { useFavorites } from "@/hooks/useFavorites";
import { SearchX, Star } from "lucide-react";

interface CompanyListProps {
  initialCompanies: Company[];
}

const VALID_TAB_KEYS: CategoryTabKey[] = [
  "all",
  "favorite",
  "top",
  "supplier",
  "official",
  "community",
  "support",
];

export default function CompanyList({ initialCompanies }: CompanyListProps) {
  const searchParams = useSearchParams();

  // URLクエリパラメータから初期状態を取得
  const initialTab = useMemo<CategoryTabKey>(() => {
    const tab = searchParams.get("tab") as CategoryTabKey;
    return VALID_TAB_KEYS.includes(tab) ? tab : "all";
  }, [searchParams]);

  const initialKeyword = useMemo(() => {
    return searchParams.get("q") || "";
  }, [searchParams]);

  const initialIndustries = useMemo(() => {
    const indParam = searchParams.get("industry");
    return indParam ? indParam.split(",").map((s) => s.trim()).filter(Boolean) : [];
  }, [searchParams]);

  const [activeTab, setActiveTab] = useState<CategoryTabKey>(initialTab);
  const [keyword, setKeyword] = useState(initialKeyword);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(initialIndustries);
  const { favorites } = useFavorites();
  const isFirstRender = useRef(true);

  // URLクエリパラメータの同期（スクロール位置を維持しつつreplaceState）
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const params = new URLSearchParams();
    if (activeTab && activeTab !== "all") {
      params.set("tab", activeTab);
    }
    if (keyword.trim()) {
      params.set("q", keyword.trim());
    }
    if (selectedIndustries.length > 0) {
      params.set("industry", selectedIndustries.join(","));
    }

    const queryString = params.toString();
    const newSearch = queryString ? `?${queryString}` : "";
    const currentSearch = window.location.search;

    if (newSearch !== currentSearch) {
      const newUrl = `${window.location.pathname}${newSearch}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [activeTab, keyword, selectedIndustries]);

  // ブラウザの戻る・進む（popstate）時のURL同期
  useEffect(() => {
    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const tab = currentParams.get("tab") as CategoryTabKey;
      setActiveTab(VALID_TAB_KEYS.includes(tab) ? tab : "all");

      const q = currentParams.get("q") || "";
      setKeyword(q);

      const indParam = currentParams.get("industry");
      setSelectedIndustries(
        indParam ? indParam.split(",").map((s) => s.trim()).filter(Boolean) : []
      );
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // 業種一覧
  const industries = useMemo(() => getIndustries(initialCompanies).filter(Boolean), [initialCompanies]);

  // タブの件数集計
  const tabItems: CategoryTabItem[] = useMemo(() => {
    return TAB_DEFINITIONS.map((tab) => ({
      key: tab.key,
      label: tab.label,
      icon: tab.icon,
      count:
        tab.key === "favorite"
          ? favorites.length
          : initialCompanies.filter((c) => tab.match(c.category)).length,
    }));
  }, [initialCompanies, favorites]);

  // 業種トグル
  const handleIndustryToggle = (ind: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(ind) ? prev.filter((item) => item !== ind) : [...prev, ind]
    );
  };

  // リセット
  const handleReset = () => {
    setActiveTab("all");
    setKeyword("");
    setSelectedIndustries([]);
  };

  // 高速フィルタリング
  const filteredCompanies = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    const currentTabDef = TAB_DEFINITIONS.find((t) => t.key === activeTab);

    return initialCompanies.filter((company) => {
      // 1. カテゴリータブ判定
      if (activeTab === "favorite") {
        if (!favorites.includes(company.id)) {
          return false;
        }
      } else if (currentTabDef && !currentTabDef.match(company.category)) {
        return false;
      }

      // 2. キーワード検索（会社名、業種、説明、詳細）
      if (q) {
        const matchName = company.name.toLowerCase().includes(q);
        const matchIndustry = company.industries.toLowerCase().includes(q);
        const matchDesc = company.description.toLowerCase().includes(q);
        const matchDetail = company.detail.toLowerCase().includes(q);
        if (!matchName && !matchIndustry && !matchDesc && !matchDetail) {
          return false;
        }
      }

      // 3. 業種（OR判定）
      if (selectedIndustries.length > 0) {
        if (!selectedIndustries.includes(company.industries)) {
          return false;
        }
      }

      return true;
    });
  }, [initialCompanies, activeTab, keyword, selectedIndustries, favorites]);

  return (
    <div>
      {/* 検索・絞り込みバー */}
      <CompanySearchFilter
        keyword={keyword}
        onKeywordChange={setKeyword}
        categories={[]}
        selectedCategories={[]}
        onCategoryToggle={() => {}}
        industries={industries}
        selectedIndustries={selectedIndustries}
        onIndustryToggle={handleIndustryToggle}
        onReset={handleReset}
        totalCount={initialCompanies.length}
        matchedCount={filteredCompanies.length}
      />

      {/* カテゴリー切り替えタブ */}
      <CategoryTabs
        tabs={tabItems}
        activeTab={activeTab}
        onSelectTab={(key) => setActiveTab(key)}
      />

      {/* 企業一覧タブパネル */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
        className="outline-none"
      >
        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : activeTab === "favorite" && favorites.length === 0 ? (
          /* お気に入り未登録時 */
          <div className="bg-white rounded-2xl border border-dashed border-amber-300/80 p-12 text-center my-8 bg-amber-50/20">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 fill-current" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              お気に入りのパートナー企業が登録されていません
            </h3>
            <p className="text-xs text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
              企業カードや詳細ページにある ★ マークをクリックすると、応援・利用しているパートナー企業をお気に入りとしてここに保存できます。
            </p>
            <button
              onClick={() => setActiveTab("all")}
              className="px-4 py-2 rounded-xl bg-tochigi-navy text-tochigi-yellow font-bold text-xs hover:bg-slate-800 transition-colors shadow-sm"
            >
              すべての企業を見る
            </button>
          </div>
        ) : (
          /* 検索結果 0 件時 */
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center my-8">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <SearchX className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-700 mb-1">
              一致するパートナー企業が見つかりませんでした
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              検索キーワードを変えるか、タブや絞り込み条件をリセットしてお試しください。
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-tochigi-yellow text-tochigi-navy font-bold text-xs hover:bg-yellow-400 transition-colors shadow-sm"
            >
              検索条件をクリアする
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
