import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-center text-slate-600 text-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-4">
        <ul className="flex items-center gap-6 font-medium">
          <li>
            <Link href="/" className="hover:text-tochigi-navy transition-colors">
              Home
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
            href="https://twitter.com/kausaus_"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-tochigi-navy hover:border-slate-400 transition-all"
            aria-label="Author Twitter"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        <p className="text-xs text-slate-400">
          栃木SC非公式ファンプロジェクト | Created by{" "}
          <a
            href="https://twitter.com/kausaus_"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-600"
          >
            @kausaus_
          </a>
        </p>
      </div>
    </footer>
  );
}
