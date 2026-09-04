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
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const [imgSrc, setImgSrc] = useState(company.image);
  const [hasError, setHasError] = useState(false);

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col h-full overflow-hidden">
      {/* 企業ロゴエリア */}
      <div className="relative w-full h-44 bg-slate-50 border-b border-slate-100 flex items-center justify-center p-6">
        {/* お気に入りボタン */}
        <div className="absolute top-3 right-3 z-20">
          <FavoriteButton companyId={company.id} companyName={company.name} variant="icon" />
        </div>

        {!hasError && company.image ? (
          <Image
            src={imgSrc}
            alt={company.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            onError={() => {
              setHasError(true);
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
            <Building2 className="w-10 h-10 stroke-1" />
            <span className="text-xs font-medium text-slate-400">No Image</span>
          </div>
        )}
      </div>

      {/* コンテンツエリア */}
      <div className="p-5 flex-1 flex flex-col">
        {/* カテゴリ & 業種タグ */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-tochigi-yellow/25 text-tochigi-navy border border-tochigi-yellow/50">
            {company.category}
          </span>
          {company.industries && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
              {company.industries}
            </span>
          )}
        </div>

        {/* 企業名 */}
        <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-tochigi-navy transition-colors line-clamp-1">
          {company.name}
        </h3>

        {/* 説明文 */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3 flex-1">
          {company.description || "栃木SCを応援しています。"}
        </p>

        {/* フッターアクション */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {company.officialsite && (
              <a
                href={company.officialsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-tochigi-navy font-medium inline-flex items-center gap-1 transition-colors"
                title="公式サイトを開く"
              >
                公式サイト
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {company.twitter && (
              <a
                href={getXProfileUrl(company.twitter)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-slate-400 hover:text-black transition-colors rounded hover:bg-slate-100"
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
                className="p-1 text-slate-400 hover:text-pink-600 transition-colors rounded hover:bg-pink-50"
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
            className="inline-flex items-center gap-1 font-bold text-tochigi-navy hover:text-tochigi-blue transition-colors group-hover:translate-x-0.5 transform duration-150 shrink-0"
          >
            詳細
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
