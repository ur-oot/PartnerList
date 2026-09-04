/**
 * サイト共通の定数定義
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://elastic-shockley-e9a519.netlify.app";

export const SITE_NAME = "栃木SC パートナー企業一覧 | Tochigi SC Partner List";

export const SITE_DESCRIPTION =
  "栃木サッカークラブ（栃木SC）を支えるパートナー企業・スポンサーの検索・まとめサービスです。";

/**
 * お気に入り（推しパートナー）の localStorage キー
 */
export const FAVORITES_STORAGE_KEY = "tochigi_sc_partner_favorites";

/**
 * カテゴリータブのキー定義
 */
export type CategoryTabKey =
  | "all"
  | "favorite"
  | "top"
  | "supplier"
  | "official"
  | "community"
  | "support";

/**
 * カテゴリータブの定義
 */
export interface TabDefinition {
  key: CategoryTabKey;
  label: string;
  icon: string;
  match: (category: string) => boolean;
}

export const TAB_DEFINITIONS: TabDefinition[] = [
  { key: "all", label: "すべて", icon: "⚽️", match: () => true },
  { key: "favorite", label: "お気に入り", icon: "⭐️", match: () => true },
  { key: "top", label: "トップパートナー", icon: "👑", match: (c) => c === "トップパートナー" },
  { key: "supplier", label: "サプライヤー", icon: "👕", match: (c) => c.includes("サプライヤー") },
  { key: "official", label: "オフィシャルパートナー", icon: "⭐", match: (c) => c === "オフィシャルパートナー" },
  { key: "community", label: "メディア・地域支援", icon: "🤝", match: (c) => c.includes("メディア") || c.includes("地域") || c.includes("ラッピング") },
  { key: "support", label: "サポートカンパニー", icon: "📣", match: (c) => c === "サポートカンパニー" },
];

/**
 * X (旧Twitter) プロフィールURLを生成
 */
export function getXProfileUrl(username: string): string {
  return `https://x.com/${username}`;
}

/**
 * Instagram プロフィールURLを生成
 */
export function getInstagramProfileUrl(username: string): string {
  return `https://instagram.com/${username}`;
}

/**
 * 応援ポスト（Tweet Intent）URLを生成
 */
export function getTweetIntentUrl(text: string): string {
  return `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
}
