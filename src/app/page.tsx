import { Suspense } from "react";
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

      {/* ヒーローセクション: THE ARENA CINEMATIC HERO */}
      <section className="relative rounded-3xl p-6 sm:p-12 mb-10 overflow-hidden bg-[#040915] text-white border border-white/[0.08] shadow-2xl">
        {/* 背景ウォーターマーク・タイポグラフィ */}
        <div className="absolute -right-6 -bottom-10 select-none pointer-events-none opacity-[0.03] text-right font-black text-7xl sm:text-9xl tracking-tighter leading-none text-white whitespace-nowrap">
          TOCHIGI SC<br />PARTNERS
        </div>

        {/* スタジアム投光器（Floodlights）アンビエントライティング（ブリージング・オーロラ） */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-tochigi-yellow/20 rounded-full blur-3xl pointer-events-none animate-aurora-slow" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-tochigi-blue/25 rounded-full blur-3xl pointer-events-none animate-aurora-reverse" />
        <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-amber-500/15 rounded-full blur-2xl pointer-events-none animate-aurora-slow" />

        <div className="relative z-10 max-w-3xl">
          {/* オフィシャル・アーカイブ・バッジ */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-tochigi-yellow text-xs font-bold mb-5 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-tochigi-yellow animate-pulse" />
            <Shield className="w-3.5 h-3.5 fill-current" />
            <span className="tracking-widest font-mono text-[11px] uppercase">
              Official Partners Archive
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white leading-[1.15]">
            栃木SCを支える、<br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tochigi-yellow via-yellow-200 to-amber-300">
              誇り高きパートナー企業
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl font-normal">
            ピッチの内外でクラブと共に闘い続けるパートナー・スポンサー企業の皆様。
            サポーターの日常の消費やビジネスでの利用を通じて、地域とクラブの未来を共創しましょう。
          </p>

          {/* クイックスタッツピル */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs">
              <span className="text-slate-400">掲載企業数</span>
              <strong className="text-white font-mono font-bold text-sm">
                {companies.length}
              </strong>
              <span className="text-slate-400">社</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs">
              <span className="text-slate-400">カテゴリー</span>
              <strong className="text-tochigi-yellow font-mono font-bold text-sm">
                7
              </strong>
              <span className="text-slate-400">区分</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs">
              <span className="text-slate-400">推しパートナー機能</span>
              <span className="text-amber-400 font-bold">★ 保存対応</span>
            </div>
          </div>
        </div>
      </section>

      {/* 企業一覧・検索・フィルター */}
      <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-slate-400">読み込み中...</div>}>
        <CompanyList initialCompanies={companies} />
      </Suspense>
    </main>
  );
}
