import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllCompanies, getCompanyById, getAdjacentCompanies } from "@/lib/companies";
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

  return {
    title: `${company.name} | 栃木SC パートナー企業一覧`,
    description: `${company.name}（${company.category}）の企業情報。${company.description}`,
    openGraph: {
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

  // 応援ツイート用リンク
  const tweetText = encodeURIComponent(
    `栃木SCパートナー企業の「${company.name}」さんをチェックしました！⚽️🟡\nいつも栃木SCへの熱いサポートありがとうございます！\n#栃木SC #全員戦力\n`
  );

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* 戻るボタン */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tochigi-yellow text-tochigi-navy font-bold text-sm hover:bg-yellow-400 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>一覧に戻る</span>
        </Link>
      </div>

      {/* 企業詳細カード */}
      <article className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* ロゴ画像バナー */}
        <div className="relative w-full h-64 bg-slate-50 border-b border-slate-100 flex items-center justify-center p-8">
          {company.image ? (
            <Image
              src={company.image}
              alt={company.name}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain p-6"
              priority
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
              <Building2 className="w-12 h-12 stroke-1" />
              <span className="text-xs font-medium text-slate-400">No Image</span>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-10">
          {/* カテゴリ & 企業名 */}
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-tochigi-yellow/30 text-tochigi-navy border border-tochigi-yellow/60 mb-3">
              {company.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {company.name}
            </h1>
          </div>

          {/* 概要文 */}
          {company.description && (
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {company.description}
            </p>
          )}

          {/* 詳細スペックリスト */}
          <dl className="divide-y divide-slate-100 text-sm">
            {/* 業種 */}
            <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-1">
              <dt className="text-slate-400 font-medium">業種</dt>
              <dd className="sm:col-span-2 text-slate-800 font-medium">
                {company.industries || "ー"}
              </dd>
            </div>

            {/* 詳細カテゴリ */}
            {company.detail && (
              <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <dt className="text-slate-400 font-medium">詳細</dt>
                <dd className="sm:col-span-2 text-slate-800">
                  {company.detail}
                </dd>
              </div>
            )}

            {/* オフィシャルサイト */}
            {company.officialsite && (
              <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <dt className="text-slate-400 font-medium">オフィシャルサイト</dt>
                <dd className="sm:col-span-2">
                  <a
                    href={company.officialsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all inline-flex items-center gap-1 font-medium"
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
                <dt className="text-slate-400 font-medium">公式SNS</dt>
                <dd className="sm:col-span-2 flex items-center gap-4">
                  {company.twitter && (
                    <a
                      href={`https://twitter.com/${company.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:border-slate-400 hover:text-black transition-colors font-medium text-xs"
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
                      href={`https://instagram.com/${company.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-pink-200 bg-pink-50/50 text-pink-700 hover:bg-pink-100 transition-colors font-medium text-xs"
                    >
                      <span>Instagram</span>
                      <span>@{company.instagram}</span>
                    </a>
                  )}
                </dd>
              </div>
            )}
          </dl>

          {/* 応援・シェアアクション */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 font-medium">
              パートナー企業をSNSで応援しよう！
            </span>

            <a
              href={`https://x.com/intent/tweet?text=${tweetText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-black font-semibold text-xs transition-colors shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>X で応援ポストする</span>
            </a>
          </div>
        </div>
      </article>

      {/* 前後企業ナビゲーション */}
      <nav aria-label="前後の企業" className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/companies/${prev.id}`}
            className="group flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all text-left"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-tochigi-yellow group-hover:text-tochigi-navy transition-colors shrink-0">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] text-slate-400 font-medium">前の企業</span>
              <span className="block text-xs font-bold text-slate-800 truncate group-hover:text-tochigi-navy">
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
            className="group flex items-center justify-end gap-3 p-4 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all text-right sm:col-start-2"
          >
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] text-slate-400 font-medium">次の企業</span>
              <span className="block text-xs font-bold text-slate-800 truncate group-hover:text-tochigi-navy">
                {next.name}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-tochigi-yellow group-hover:text-tochigi-navy transition-colors shrink-0">
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
