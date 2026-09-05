import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllCompanies, getCompanyById, getAdjacentCompanies } from "@/lib/companies";
import {
  SITE_URL,
  getXProfileUrl,
  getInstagramProfileUrl,
  getTweetIntentUrl,
} from "@/lib/constants";
import FavoriteButton from "@/components/company/FavoriteButton";
import { ArrowLeft, Globe, Building2, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

interface CompanyDetailPageProps {
  params: {
    id: string;
  };
}

// 全企業のパスを事前静的生成 (SSG)
export async function generateStaticParams() {
  const companies = await getAllCompanies();
  return companies.map((c) => ({
    id: c.id.toString(),
  }));
}

// SEO / 動的メタデータ
export async function generateMetadata({
  params,
}: CompanyDetailPageProps): Promise<Metadata> {
  const company = await getCompanyById(Number(params.id));

  if (!company) {
    return {
      title: "企業が見つかりませんでした | 栃木SC パートナー企業一覧",
    };
  }

  const pageUrl = `${SITE_URL}/companies/${company.id}`;

  return {
    title: `${company.name} | 栃木SC パートナー企業一覧`,
    description: `${company.name}（${company.category}）の企業情報。${company.description}`,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${company.name} | 栃木SC パートナー企業一覧`,
      description: company.description,
      url: pageUrl,
      type: "website",
      ...(company.image ? { images: [company.image] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${company.name} | 栃木SC パートナー企業一覧`,
      description: company.description,
      ...(company.image ? { images: [company.image] } : {}),
    },
  };
}

export default async function CompanyDetailPage({
  params,
}: CompanyDetailPageProps) {
  const company = await getCompanyById(Number(params.id));

  if (!company) {
    notFound();
  }

  const { prev, next } = await getAdjacentCompanies(company.id);

  // 応援ポスト用テキスト
  const tweetText = `栃木SCパートナー企業の「${company.name}」さんをチェックしました！⚽️🟡\nいつも栃木SCへの熱いサポートありがとうございます！\n#栃木SC #全員戦力\n`;

  // 構造化データ (schema.org/Organization)
  const sameAs: string[] = [];
  if (company.officialsite) sameAs.push(company.officialsite);
  if (company.twitter) sameAs.push(getXProfileUrl(company.twitter));
  if (company.instagram) sameAs.push(getInstagramProfileUrl(company.instagram));

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    ...(company.officialsite ? { url: company.officialsite } : {}),
    ...(company.image ? { image: company.image } : {}),
    ...(company.description ? { description: company.description } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(company.detail ? { knowsAbout: company.detail } : {}),
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* 構造化データ (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* 戻るボタン & お気に入りボタン */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md text-slate-700 hover:text-slate-950 font-bold text-xs border border-slate-200/80 hover:bg-white transition-all shadow-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>一覧に戻る</span>
        </Link>

        <FavoriteButton
          companyId={company.id}
          companyName={company.name}
          variant="button"
        />
      </div>

      {/* 企業詳細カード: THE ARENA SHOWCASE */}
      <article className="specular-card bg-white rounded-3xl border border-slate-200/80 shadow-card-modern overflow-hidden">
        {/* ロゴ画像バナー: Floating Art-piece Exhibition */}
        <div className="relative w-full h-64 sm:h-72 bg-gradient-to-b from-slate-50 via-white to-slate-50/60 border-b border-slate-100 flex items-center justify-center p-8 overflow-hidden">
          {/* アンビエントスポットライト */}
          <div className="absolute inset-0 bg-radial-gradient from-tochigi-yellow/10 via-transparent to-transparent pointer-events-none" />

          <div className="absolute top-4 right-4 z-10">
            <FavoriteButton
              companyId={company.id}
              companyName={company.name}
              variant="icon"
            />
          </div>

          {company.image ? (
            <Image
              src={company.image}
              alt={company.name}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain p-8 drop-shadow-sm hover:scale-105 transition-transform duration-300"
              priority
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
              <Building2 className="w-14 h-14 stroke-1 text-slate-300" />
              <span className="text-xs font-mono text-slate-400 tracking-wider">OFFICIAL PARTNER</span>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-10">
          {/* カテゴリ & 企業名 */}
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#040915] text-tochigi-yellow border border-white/10 shadow-sm mb-3">
              {company.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {company.name}
            </h1>
          </div>

          {/* 概要文（エディトリアル引用スタイル） */}
          {company.description && (
            <div className="text-sm sm:text-base text-slate-700 leading-relaxed mb-8 bg-slate-50/80 p-5 rounded-2xl border-l-4 border-tochigi-yellow border-y border-r border-slate-200/80 font-normal">
              {company.description}
            </div>
          )}

          {/* 詳細スペックリスト */}
          <dl className="divide-y divide-slate-100 text-sm">
            {/* 業種 */}
            <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-1 items-baseline">
              <dt className="text-slate-400 font-mono text-xs uppercase tracking-wider">業種</dt>
              <dd className="sm:col-span-2 text-slate-800 font-medium">
                {company.industries || "ー"}
              </dd>
            </div>

            {/* 主な事業内容 */}
            {company.detail && (
              <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <dt className="text-slate-400 font-mono text-xs uppercase tracking-wider">主な事業内容</dt>
                <dd className="sm:col-span-2 text-slate-700 leading-relaxed font-normal">
                  {company.detail}
                </dd>
              </div>
            )}

            {/* オフィシャルサイト */}
            {company.officialsite && (
              <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-1 items-baseline">
                <dt className="text-slate-400 font-mono text-xs uppercase tracking-wider">公式サイト</dt>
                <dd className="sm:col-span-2">
                  <a
                    href={company.officialsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-tochigi-blue hover:text-blue-700 hover:underline break-all inline-flex items-center gap-1.5 font-medium"
                  >
                    <Globe className="w-4 h-4 shrink-0" />
                    <span>{company.officialsite}</span>
                  </a>
                </dd>
              </div>
            )}

            {/* 公式SNS */}
            {(company.twitter || company.instagram) && (
              <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-1 items-center">
                <dt className="text-slate-400 font-mono text-xs uppercase tracking-wider">公式SNS</dt>
                <dd className="sm:col-span-2 flex flex-wrap items-center gap-3">
                  {company.twitter && (
                    <a
                      href={getXProfileUrl(company.twitter)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:text-black transition-colors font-semibold text-xs shadow-sm"
                    >
                      <svg
                        className="w-3.5 h-3.5 fill-current"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span>@{company.twitter}</span>
                    </a>
                  )}

                  {company.instagram && (
                    <a
                      href={getInstagramProfileUrl(company.instagram)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-pink-200 bg-pink-50/70 text-pink-700 hover:bg-pink-100 transition-colors font-semibold text-xs shadow-sm"
                    >
                      <svg
                        className="w-3.5 h-3.5 fill-current"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span>@{company.instagram}</span>
                    </a>
                  )}
                </dd>
              </div>
            )}
          </dl>

          {/* 応援・シェアアクション: STADIUM MATCH TICKET PASS */}
          <div className="mt-10 p-6 rounded-3xl bg-[#040915] text-white border border-white/10 shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-48 h-48 bg-tochigi-yellow/15 rounded-full blur-2xl pointer-events-none animate-aurora-slow" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <span className="inline-block text-[10px] font-mono tracking-widest text-tochigi-yellow uppercase font-bold mb-1">
                  TSC Supporter Action Pass
                </span>
                <h2 className="text-base sm:text-lg font-black tracking-tight text-white mb-1">
                  パートナー企業をSNSで応援しよう！
                </h2>
                <p className="text-xs text-slate-400">
                  サポーターの熱いメッセージが、クラブと企業の力になります。
                </p>
              </div>

              <a
                href={getTweetIntentUrl(tweetText)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-tochigi-yellow via-yellow-300 to-amber-400 text-slate-950 hover:opacity-95 font-black text-xs transition-all shadow-glow-yellow shrink-0 active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>X で応援ポストする</span>
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* 前後企業ナビゲーション */}
      <nav aria-label="前後の企業" className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/companies/${prev.id}`}
            className="specular-card group flex items-center gap-4 p-5 bg-white rounded-3xl border border-slate-200/80 hover:border-slate-300 shadow-card-modern hover:shadow-card-hover hover:-translate-y-0.5 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#040915] group-hover:text-tochigi-yellow transition-colors shrink-0">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">前のパートナー</span>
              <span className="block text-xs font-bold text-slate-900 truncate group-hover:text-tochigi-blue transition-colors">
                {prev.name}
              </span>
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {next ? (
          <Link
            href={`/companies/${next.id}`}
            className="specular-card group flex items-center justify-end gap-4 p-5 bg-white rounded-3xl border border-slate-200/80 hover:border-slate-300 shadow-card-modern hover:shadow-card-hover hover:-translate-y-0.5 transition-all text-right sm:col-start-2"
          >
            <div className="min-w-0 flex-1">
              <span className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">次のパートナー</span>
              <span className="block text-xs font-bold text-slate-900 truncate group-hover:text-tochigi-blue transition-colors">
                {next.name}
              </span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#040915] group-hover:text-tochigi-yellow transition-colors shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </nav>
    </main>
  );
}
