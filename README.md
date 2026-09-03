# 栃木SC パートナー企業一覧 (PartnerList)

[栃木SC](https://www.tochigisc.jp/sponsor/) を熱くサポートするパートナー企業・スポンサーをまとめた非公式ファンサービスです。

## App URL
https://elastic-shockley-e9a519.netlify.app

## 技術スタック (Tech Stack)
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, SSG)
- **Library**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Schema & Validation**: [Zod](https://zod.dev/)
- **Container**: Docker / Docker Compose (Node.js 20 Alpine)

## 主な機能
- **企業一覧 & リアルタイム検索**: 企業名・業種・詳細をまたぐキーワード検索
- **複合フィルタリング**: サポートメニュー（カテゴリ）および業種による絞り込み
- **企業詳細ページ (SSG)**: 個別URLによるシェア対応（リロード耐性）
- **応援ポスト機能**: パートナー企業への感謝を込めたワンクリックX（Twitter）投稿

## 開発環境のセットアップ (Usage)

### Docker を使用する場合 (推奨)
```sh
# コンテナのビルドおよび起動
docker compose up --build

# http://localhost:3000 でアクセス
```

### ローカル環境で実行する場合
```sh
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# http://localhost:3000 でアクセス
```

### ビルド (Production Build)
```sh
npm run build
npm run start
```

## Author
- X (Twitter): [@ur_oot](https://x.com/ur_oot)
- GitHub: [ur-oot](https://github.com/ur-oot)
