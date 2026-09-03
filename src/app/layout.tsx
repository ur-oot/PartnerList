import type { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "栃木SC パートナー企業一覧 | Tochigi SC Partner List",
  description: "栃木サッカークラブ（栃木SC）を支えるパートナー企業・スポンサーの検索・まとめサービスです。",
  keywords: ["栃木SC", "パートナー", "スポンサー", "Jリーグ", "サッカー", "栃木"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased">
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
