FROM node:20-alpine

WORKDIR /app

# Alpine 用の必要ツール（libc6-compat 等）をインストール
RUN apk add --no-cache libc6-compat

# 依存関係のインストールキャッシュ
COPY package*.json ./

RUN npm install

# ソースコードをコピー
COPY . .

# Next.js のテレメトリ無効化
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["npm", "run", "dev"]