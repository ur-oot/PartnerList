"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Company } from "@/types/company";
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
        {!hasError ? (
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
          {company.officialsite ? (
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
          ) : (
            <span />
          )}

          <Link
            href={`/companies/${company.id}`}
            className="inline-flex items-center gap-1 font-bold text-tochigi-navy hover:text-tochigi-blue transition-colors group-hover:translate-x-0.5 transform duration-150"
          >
            詳細を見る
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
