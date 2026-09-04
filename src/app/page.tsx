import { getAllCompanies } from "@/lib/companies";
import CompanyList from "@/components/company/CompanyList";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { Shield } from "lucide-react";

export default async function HomePage() {
  const companies = await getAllCompanies();

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "ja",
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12 sm:px-6">
      {/* 構造化データ (WebSite) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-tochigi-navy via-[#02182b] to-tochigi-navy text-white rounded-3xl p-6 sm:p-10 shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-tochigi-yellow/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tochigi-yellow text-tochigi-navy font-extrabold text-xs mb-4 shadow-sm">
            <Shield className="w-3.5 h-3.5 fill-current" />
            TOCHIGI SC OFFICIAL PARTNERS
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            栃木SC パートナー企業一覧
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            栃木サッカークラブを支えてくださるパートナー・スポンサー企業の皆様です。
            サポーターの皆様の日常のお買い物やサービス利用の参考にぜひご活用ください！
          </p>
        </div>
      </section>

      {/* 企業一覧・検索・フィルター */}
      <CompanyList initialCompanies={companies} />
    </main>
  );
}
