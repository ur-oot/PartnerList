"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Company } from "@/types/company";
import { getXProfileUrl, getInstagramProfileUrl } from "@/lib/constants";
import FavoriteButton from "./FavoriteButton";
import { ExternalLink, ArrowRight, Building2 } from "lucide-react";

interface CompanyCardProps {
  company: Company;
  variant?: "showcase" | "gallery" | "plaque";
}

export default function CompanyCard({
  company,
  variant = "gallery",
}: CompanyCardProps) {
  const [imgSrc, setImgSrc] = useState(company.image);
  const [hasError, setHasError] = useState(false);

  // マウス追従スポットライト用の座標更新
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  // -------------------------------------------------------------
  // 1. SHOWCASE VARIANT (Tier 1: トップパートナー向け大型パノラマカード)
  // -------------------------------------------------------------
  if (variant === "showcase") {
    return (
      <article
        onMouseMove={handleMouseMove}
        className="specular-card spotlight-card group bg-white rounded-3xl border border-slate-200/80 shadow-card-modern hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden col-span-1 md:col-span-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[300px]">
          {/* 左側: 大判ロゴスペース */}
          <div className="relative md:col-span-5 bg-gradient-to-br from-slate-950 via-[#071124] to-slate-900 p-8 flex items-center justify-center overflow-hidden">
            {/* スタジアムアンビエントグロー */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-tochigi-yellow/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-tochigi-blue/20 rounded-full blur-2xl pointer-events-none" />

            {/* お気に入りボタン */}
            <div className="absolute top-4 right-4 z-20">
              <FavoriteButton companyId={company.id} companyName={company.name} variant="icon" />
            </div>

            {/* 巨大ロゴ */}
            <div className="relative w-full h-44 sm:h-52 z-10 flex items-center justify-center p-4 bg-white/95 rounded-2xl shadow-xl backdrop-blur-sm border border-white/20 group-hover:scale-105 transition-transform duration-300">
              {!hasError && company.image ? (
                <Image
                  src={imgSrc}
                  alt={company.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-4"
                  onError={() => setHasError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                  <Building2 className="w-12 h-12 stroke-1 text-slate-300" />
                  <span className="text-xs font-mono text-slate-400">OFFICIAL LOGO</span>
                </div>
              )}
            </div>
          </div>

          {/* 右側: エディトリアルストーリー */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* クラウンバッジ & 業種 */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-tochigi-yellow to-yellow-400 text-slate-950 shadow-glow-yellow">
                  👑 トップパートナー
                </span>
                {company.industries && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600">
                    {company.industries}
                  </span>
                )}
              </div>

              {/* 企業名 */}
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-3 group-hover:text-tochigi-blue transition-colors">
                {company.name}
              </h3>

              {/* 概要 */}
              <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3 font-normal">
                {company.description || "栃木SCのトップパートナーとしてクラブを力強く支える企業です。"}
              </p>

              {/* 主な事業内容 */}
              {company.detail && (
                <div className="mb-4 text-xs text-slate-500 bg-slate-50/80 p-3 rounded-xl border border-slate-100 line-clamp-2">
                  <span className="font-bold text-slate-700">主な事業: </span>
                  {company.detail}
                </div>
              )}
            </div>

            {/* フッターアクション */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                {company.officialsite && (
                  <a
                    href={company.officialsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-slate-900 font-medium inline-flex items-center gap-1.5 transition-colors"
                    title="公式サイトを開く"
                  >
                    <span>公式サイト</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {company.twitter && (
                  <a
                    href={getXProfileUrl(company.twitter)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-black transition-colors rounded-lg hover:bg-slate-100"
                    title={`X (@${company.twitter})`}
                    aria-label={`X (@${company.twitter})`}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}

                {company.instagram && (
                  <a
                    href={getInstagramProfileUrl(company.instagram)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-pink-600 transition-colors rounded-lg hover:bg-pink-50"
                    title={`Instagram (@${company.instagram})`}
                    aria-label={`Instagram (@${company.instagram})`}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}
              </div>

              <Link
                href={`/companies/${company.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-black transition-colors shrink-0 shadow-sm"
              >
                <span>企業詳細を見る</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // -------------------------------------------------------------
  // 2. PLAQUE VARIANT (Tier 3: サポートカンパニー・地域支援向け高密度プレート)
  // -------------------------------------------------------------
  if (variant === "plaque") {
    return (
      <article
        onMouseMove={handleMouseMove}
        className="specular-card spotlight-card group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full overflow-hidden"
      >
        {/* コンパクトロゴエリア */}
        <div className="relative w-full h-32 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 flex items-center justify-center p-3 overflow-hidden">
          <div className="absolute top-2 right-2 z-20">
            <FavoriteButton companyId={company.id} companyName={company.name} variant="icon" />
          </div>

          {!hasError && company.image ? (
            <Image
              src={imgSrc}
              alt={company.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-3 group-hover:scale-105 transition-transform duration-200"
              onError={() => setHasError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-300 gap-1">
              <Building2 className="w-7 h-7 stroke-1" />
              <span className="text-[10px] font-mono text-slate-400">NO LOGO</span>
            </div>
          )}
        </div>

        {/* コンパクトコンテンツエリア */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[10px] font-mono text-slate-400 truncate">
                {company.industries || company.category}
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-tochigi-blue transition-colors line-clamp-1">
              {company.name}
            </h3>

            <p className="text-[11px] text-slate-500 leading-relaxed mb-3 line-clamp-2">
              {company.description || "栃木SCを応援しています。"}
            </p>
          </div>

          <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              {company.officialsite && (
                <a
                  href={company.officialsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-800 text-[11px] font-medium inline-flex items-center gap-0.5"
                  title="公式サイトを開く"
                >
                  <span>WEB</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>

            <Link
              href={`/companies/${company.id}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-800 group-hover:text-tochigi-blue transition-colors"
            >
              <span>詳細</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // -------------------------------------------------------------
  // 3. GALLERY VARIANT (Tier 2: オフィシャル / サプライヤー / お気に入り)
  // -------------------------------------------------------------
  return (
    <article
      onMouseMove={handleMouseMove}
      className="specular-card spotlight-card group bg-white rounded-3xl border border-slate-200/80 shadow-card-modern hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden"
    >
      {/* 企業ロゴエリア: Floating Art-piece Frame */}
      <div className="relative w-full h-48 bg-gradient-to-b from-slate-50/90 via-white/50 to-slate-50/50 border-b border-slate-100 flex items-center justify-center p-6 overflow-hidden">
        {/* ホバー時のアンビエント光彩 */}
        <div className="absolute inset-0 bg-radial-gradient from-tochigi-yellow/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* お気に入りボタン */}
        <div className="absolute top-3.5 right-3.5 z-20">
          <FavoriteButton companyId={company.id} companyName={company.name} variant="icon" />
        </div>

        {!hasError && company.image ? (
          <Image
            src={imgSrc}
            alt={company.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-5 group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
            onError={() => {
              setHasError(true);
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
            <Building2 className="w-10 h-10 stroke-1 text-slate-300" />
            <span className="text-xs font-mono text-slate-400">NO LOGO</span>
          </div>
        )}
      </div>

      {/* コンテンツエリア */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        {/* カテゴリ & 業種タグ */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#040915] text-tochigi-yellow border border-white/10 shadow-sm">
            {company.category}
          </span>
          {company.industries && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600">
              {company.industries}
            </span>
          )}
        </div>

        {/* 企業名 */}
        <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-tochigi-blue transition-colors line-clamp-1">
          {company.name}
        </h3>

        {/* 説明文 */}
        <p className="text-xs text-slate-500 leading-relaxed mb-5 line-clamp-3 flex-1 font-normal">
          {company.description || "栃木SCの活動と発展を支える公式パートナー企業です。"}
        </p>

        {/* フッターアクション */}
        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {company.officialsite && (
              <a
                href={company.officialsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-900 font-medium inline-flex items-center gap-1 transition-colors"
                title="公式サイトを開く"
              >
                <span>WEB</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {company.twitter && (
              <a
                href={getXProfileUrl(company.twitter)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-400 hover:text-black transition-colors rounded-lg hover:bg-slate-100"
                title={`X (@${company.twitter})`}
                aria-label={`X (@${company.twitter})`}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}

            {company.instagram && (
              <a
                href={getInstagramProfileUrl(company.instagram)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-400 hover:text-pink-600 transition-colors rounded-lg hover:bg-pink-50"
                title={`Instagram (@${company.instagram})`}
                aria-label={`Instagram (@${company.instagram})`}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            )}
          </div>

          <Link
            href={`/companies/${company.id}`}
            className="inline-flex items-center gap-1.5 font-bold text-slate-900 group-hover:text-tochigi-blue transition-colors shrink-0"
          >
            <span>詳細</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
