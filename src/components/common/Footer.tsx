import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white/70 backdrop-blur-md py-10 text-center text-slate-500 text-xs">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-5">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-tochigi-navy text-tochigi-yellow flex items-center justify-center font-black text-[10px]">
            TSC
          </span>
          <span className="font-bold text-slate-800 tracking-tight text-sm">
            栃木SC パートナー企業一覧
          </span>
        </div>

        <ul className="flex items-center gap-6 font-medium text-xs text-slate-600">
          <li>
            <Link href="/" className="hover:text-tochigi-navy transition-colors">
              トップページ
            </Link>
          </li>
          <li>
            <a
              href="https://www.tochigisc.jp/sponsor/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-tochigi-navy transition-colors"
            >
              栃木SC スポンサー公式
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="https://x.com/ur_oot"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-black hover:border-slate-400 hover:shadow-sm transition-all"
            aria-label="Author X (Twitter)"
          >
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        <p className="text-[11px] text-slate-400 tracking-wider">
          栃木SC非公式ファンプロジェクト | Crafted by{" "}
          <a
            href="https://x.com/ur_oot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:underline font-medium"
          >
            @ur_oot
          </a>
        </p>
      </div>
    </footer>
  );
}
