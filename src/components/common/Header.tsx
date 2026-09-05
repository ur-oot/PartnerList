import Link from "next/link";
import { Shield } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 text-white border-b border-white/[0.08] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity"
        >
          <div className="relative">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-tochigi-yellow via-yellow-400 to-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-glow-yellow tracking-tighter">
              TSC
            </span>
            <div className="absolute -inset-1 bg-tochigi-yellow/20 rounded-xl blur-sm -z-10 group-hover:bg-tochigi-yellow/40 transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-tochigi-yellow transition-colors flex items-center gap-1.5">
              栃木SC パートナー企業一覧
            </span>
            <span className="text-[10px] text-slate-400 tracking-widest font-mono uppercase hidden sm:block">
              Official Partners Archive
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-3 text-xs font-semibold">
          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/[0.08] transition-all"
          >
            一覧
          </Link>
          <a
            href="https://x.com/ur_oot"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white border border-white/[0.08] transition-all"
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
        </nav>
      </div>
    </header>
  );
}
