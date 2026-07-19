# Next.js + Nest.js Beginners Guide

このプロジェクトは、[Simple is Better Than Complex の Django チュートリアル](https://simpleisbetterthancomplex.com/series/2017/09/04/a-complete-beginners-guide-to-django-part-1.html) を Next.js + Nest.js で復習・学習するための環境です。

## 構成

- Next.js (Frontend)
- Nest.js (Backend)
- Node.js
- TypeScript
- Docker / Docker Compose

## 前提条件

- [Docker](https://www.docker.com/) と [Docker Compose](https://docs.docker.com/compose/) がインストールされていること

## 🚀 セットアップ手順

### 1. リポジトリをクローン

```bash
git clone https://github.com/naoyuki-hirata-biz/next-nest-js-tutorial.git
cd next-nest-js-tutorial.
```

### 2. Docker Compose でビルド & 起動

```bash
docker compose up --build
```

これにより、Nest.js バックエンドと Next.js フロントエンドがそれぞれ以下のポートで起動します。

- **Nest.js (Backend):** [http://localhost:3000](http://localhost:3000)
- **Next.js (Frontend):** [http://localhost:3001](http://localhost:3001)

---

## 🔧 Lint / フォーマット

Dockerコンテナ内でLinterとFormatterを実行します。

#### フロントエンド (Next.js)

```bash
docker compose exec frontend npm run lint
docker compose exec frontend npm run format
```

#### バックエンド (Nest.js)

```bash
docker compose exec backend npm run lint
docker compose exec backend npm run format
```

---

## 📄 ディレクトリ構成

```
.
├── backend/             # Nest.js バックエンドプロジェクト
│    └── Dockerfile
│    └── README.md
├── frontend/            # Next.js フロントエンドプロジェクト
│    └── Dockerfile
│    └── README.md
├── .github/
├── .vscode/
├── docs/
├── docker-compose.yml
└── README.md
```
