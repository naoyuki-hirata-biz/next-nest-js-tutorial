# Next.js + Nest.js フルスタック開発入門 - 第1章: 環境構築とロードマップ

このチュートリアルは、Djangoの有名な入門チュートリアル（A Complete Beginner's Guide to Django）の構成と丁寧さをベースに、現代的なフルスタックWeb開発（Next.js + Nest.js）に焼き直したものです。
実際に掲示板アプリケーションを作りながら、両フレームワークの基本概念と連携方法を学びます。

---

## 1. 今回構築するアーキテクチャの概要

Djangoは「MVT (Model-View-Template)」と呼ばれるオールインワンのフレームワークですが、Next.js + Nest.jsの構成では、役割を以下のように分離します。

| 役割 | テクノロジー | 説明 | Djangoでの相当機能 |
| :--- | :--- | :--- | :--- |
| **フロントエンド** | **Next.js (App Router)** | 画面表示、ルーティング、UIの状態管理、サーバーサイドレンダリング(SSR) | Template / View |
| **バックエンド** | **Nest.js** | REST APIの提供、ビジネスロジック、データベース操作、セキュリティ/認証 | View (Controller) / Model |
| **データベース** | **PostgreSQL** | データの永続化 | PostgreSQL / SQLite |

---

## 2. 開発環境の準備

まずはPCに以下の環境がインストールされていることを確認してください。

- **Node.js**: v20以上推奨
- **Docker**: PostgreSQLをローカルで簡単に立ち上げるために使用します

---

## 3. バックエンド (Nest.js) の初期セットアップ

まずはプロジェクトのルートディレクトリを作成し、その中にNest.jsプロジェクトを作成します。

```bash
npx @nestjs/cli new backend --package-manager npm
```

セットアップが完了したら、`backend` フォルダに移動してサーバーが起動するか確認しましょう。

```bash
cd backend
npm run start:dev
```
ブラウザで `http://localhost:3000` にアクセスし、`Hello World!` と表示されれば成功です！

---

## 4. フロントエンド (Next.js) の初期セットアップ

一度プロジェクトルートに戻り、今度はNext.jsプロジェクトを「frontend」として作成します。

```bash
cd ..
npx create-next-app@latest frontend
```

対話式のプロンプトが表示されるので、以下のように選択してください（推奨構成）：

- Would you like to use **TypeScript**? › **Yes**
- Would you like to use **ESLint**? › **Yes**
- Would you like to use React Compiler? › **No**
- Would you like to use **Tailwind CSS**? › **Yes**
- Would you like to use **`src/` directory**? › **Yes**
- Would you like to use **App Router**? › **Yes**
- Would you like to customize the import alias (`@/*` by default)? › **No**
- Would you like to include AGENTS.md to guide coding agents to write up-to-date Next.js code? › **Yes**

作成できたら、起動を確認します。

```bash
cd frontend
npm run dev
```
ブラウザで `http://localhost:3000`（※Nest.jsとポートが衝突する場合は自動で `http://localhost:3001` 等になります）を開き、Next.jsのウェルカム画面が出れば準備完了です！

---

### Docker Composeを使ったビルドと起動

プロジェクトルートで以下のコマンドを実行して、すべてのサービスをビルドし起動します。

```bash
docker compose up --build
```

これにより、Nest.js バックエンド (ポート `3001`)、Next.js フロントエンド (ポート `3000`)、および PostgreSQL データベース (ポート `5432`) が起動します。

- **Nest.js (Backend):** `http://localhost:3001` にアクセスし、`Hello World!` と表示されれば成功です！
- **Next.js (Frontend):** `http://localhost:3000` を開くと、Next.jsのウェルカム画面が出れば準備完了です！

## 第1章のまとめ
これでフロントエンド（Next.js）とバックエンド（Nest.js）の2つの独立したプロジェクトの土台が整いました。
第2章では、データベース（PostgreSQL）を立ち上げ、Nest.jsから接続して最初の「板（Categories）モデル」を作成していきます。

