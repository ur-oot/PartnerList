import Link from "next/link";
import { Shield } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-tochigi-yellow text-tochigi-navy border-b border-yellow-400 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg tracking-wide hover:opacity-90 transition-opacity"
        >
          <span className="w-8 h-8 rounded-lg bg-tochigi-navy text-tochigi-yellow flex items-center justify-center font-black text-sm shadow-inner">
            TSC
          </span>
          <span>栃木SC パートナー企業一覧</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm font-semibold">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-full hover:bg-yellow-300 transition-colors"
          >
            HOME
          </Link>
          <a
            href="https://twitter.com/kausaus_"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-yellow-300 transition-colors"
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
        </nav>
      </div>
    </header>
  );
}
