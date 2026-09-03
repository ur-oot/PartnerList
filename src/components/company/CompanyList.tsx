"use client";

import { useState, useMemo } from "react";
import { Company } from "@/types/company";
import CompanyCard from "./CompanyCard";
import CompanySearchFilter from "./CompanySearchFilter";
import { getCategories, getIndustries } from "@/lib/companies";
import { SearchX } from "lucide-react";

interface CompanyListProps {
  initialCompanies: Company[];
}

export default function CompanyList({ initialCompanies }: CompanyListProps) {
  const [keyword, setKeyword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  // 選択肢一覧（重複排除）
  const categories = useMemo(() => getCategories(initialCompanies), [initialCompanies]);
  const industries = useMemo(() => getIndustries(initialCompanies), [initialCompanies]);

  // カテゴリトグル
  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((item) => item !== cat) : [...prev, cat]
    );
  };

  // 業種トグル
  const handleIndustryToggle = (ind: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(ind) ? prev.filter((item) => item !== ind) : [...prev, ind]
    );
  };

  // リセット
  const handleReset = () => {
    setKeyword("");
    setSelectedCategories([]);
    setSelectedIndustries([]);
  };

  // 高速フィルタリング
  const filteredCompanies = useMemo(() => {
    const q = keyword.trim().toLowerCase();

    return initialCompanies.filter((company) => {
      // 1. キーワード検索（会社名、業種、説明、詳細）
      if (q) {
        const matchName = company.name.toLowerCase().includes(q);
        const matchIndustry = company.industries.toLowerCase().includes(q);
        const matchDesc = company.description.toLowerCase().includes(q);
        const matchDetail = company.detail.toLowerCase().includes(q);
        if (!matchName && !matchIndustry && !matchDesc && !matchDetail) {
          return false;
        }
      }

      // 2. カテゴリ（OR判定）
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(company.category)) {
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
  }, [initialCompanies, keyword, selectedCategories, selectedIndustries]);

  return (
    <div>
      {/* 検索・絞り込みバー */}
      <CompanySearchFilter
        keyword={keyword}
        onKeywordChange={setKeyword}
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        industries={industries}
        selectedIndustries={selectedIndustries}
        onIndustryToggle={handleIndustryToggle}
        onReset={handleReset}
        totalCount={initialCompanies.length}
        matchedCount={filteredCompanies.length}
      />

      {/* 企業一覧グリッド */}
      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
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
            検索キーワードを変えるか、絞り込み条件を解除してお試しください。
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-tochigi-yellow text-tochigi-navy font-bold text-xs hover:bg-yellow-400 transition-colors"
          >
            検索条件をクリアする
          </button>
        </div>
      )}
    </div>
  );
}
