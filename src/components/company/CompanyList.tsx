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
  const { topPartners, officialPartners, supportPartners } = useMemo(() => {
    const top: Company[] = [];
    const official: Company[] = [];
    const support: Company[] = [];

    for (const company of filteredCompanies) {
      if (company.category === "トップパートナー") {
        top.push(company);
      } else if (
        company.category === "オフィシャルパートナー" ||
        company.category.includes("サプライヤー")
      ) {
        official.push(company);
      } else {
        support.push(company);
      }
    }

    return { topPartners: top, officialPartners: official, supportPartners: support };
  }, [filteredCompanies]);

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

      {/* 企業一覧タブパネル: TIERED ARENA EXHIBITION */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
        className="outline-none"
      >
        {filteredCompanies.length > 0 ? (
          activeTab === "all" ? (
            /* ALL タブ: 階層型アリーナ・エキシビション */
            <div className="space-y-14">
              {/* Tier 1: トップパートナー */}
              {topPartners.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200/80">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                        <span>👑</span> トップパートナー
                      </h2>
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold hidden sm:inline">
                        Tier 1: Top Partners
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {topPartners.length} 社
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {topPartners.map((company) => (
                      <CompanyCard key={company.id} company={company} variant="showcase" />
                    ))}
                  </div>
                </section>
              )}

              {/* Tier 2: オフィシャルパートナー & サプライヤー */}
              {officialPartners.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200/80">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                        <span>⭐</span> オフィシャルパートナー & サプライヤー
                      </h2>
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold hidden sm:inline">
                        Tier 2: Official Partners & Suppliers
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {officialPartners.length} 社
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {officialPartners.map((company) => (
                      <CompanyCard key={company.id} company={company} variant="gallery" />
                    ))}
                  </div>
                </section>
              )}

              {/* Tier 3: サポートカンパニー & 地域・メディア支援 */}
              {supportPartners.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200/80">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                        <span>🤝</span> サポートカンパニー & 地域・メディア支援
                      </h2>
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold hidden sm:inline">
                        Tier 3: Support Companies & Community
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {supportPartners.length} 社
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {supportPartners.map((company) => (
                      <CompanyCard key={company.id} company={company} variant="plaque" />
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : activeTab === "top" ? (
            /* TOP タブ: ショーケース大判グリッド */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} variant="showcase" />
              ))}
            </div>
          ) : activeTab === "support" || activeTab === "community" ? (
            /* SUPPORT / COMMUNITY タブ: 高密度銘板グリッド */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} variant="plaque" />
              ))}
            </div>
          ) : (
            /* OFFICIAL / SUPPLIER / FAVORITE タブ: ギャラリープレート */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} variant="gallery" />
              ))}
            </div>
          )
        ) : activeTab === "favorite" && favorites.length === 0 ? (
          /* お気に入り未登録時: PRESTIGE EMPTY STATE */
          <div className="specular-card bg-white/90 backdrop-blur-xl rounded-3xl border border-amber-200/80 p-12 sm:p-16 text-center my-8 shadow-card-modern">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/15 text-amber-500 flex items-center justify-center mx-auto mb-4 shadow-glow-gold">
              <Star className="w-7 h-7 fill-current" />
            </div>
            <h3 className="text-lg font-black tracking-tight text-slate-900 mb-2">
              推しパートナー企業がまだ登録されていません
            </h3>
            <p className="text-xs text-slate-500 mb-6 max-w-md mx-auto leading-relaxed">
              企業カードや詳細ページの ★ マークをクリックすると、応援・利用しているパートナー企業をここにコレクションできます。
            </p>
            <button
              onClick={() => setActiveTab("all")}
              className="px-5 py-2.5 rounded-2xl bg-[#040915] text-tochigi-yellow font-bold text-xs hover:opacity-90 transition-all shadow-sm active:scale-95"
            >
              すべてのパートナー企業を見る
            </button>
          </div>
        ) : (
          /* 検索結果 0 件時: PRESTIGE EMPTY STATE */
          <div className="specular-card bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 p-12 sm:p-16 text-center my-8 shadow-card-modern">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <SearchX className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black tracking-tight text-slate-900 mb-2">
              該当するパートナー企業が見つかりませんでした
            </h3>
            <p className="text-xs text-slate-500 mb-6 max-w-md mx-auto leading-relaxed">
              キーワードを変えるか、タブや業種の絞り込み条件をリセットしてお試しください。
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-2xl bg-[#040915] text-tochigi-yellow font-bold text-xs hover:opacity-90 transition-all shadow-sm active:scale-95"
            >
              検索条件をクリアする
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
