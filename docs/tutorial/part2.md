# Next.js + Nest.js フルスタック開発入門 - 第2章: データベース連携とモデルの作成

第2章では、Dockerを使ってローカルにPostgreSQLデータベースを立ち上げ、Nest.jsからORM（Prisma）を使用してデータベースを操作できるようにします。Djangoでいう `models.py` の定義とマイグレーションの実行に相当する章です。

---

## 1. DockerでPostgreSQLを起動する

プロジェクトルートに、データベース起動用の `docker-compose.yml` を作成します。

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: next-ch_db
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

ファイルを保存したら、以下のコマンドでデータベースを起動します。

```bash
docker-compose up
```

---

## 2. Nest.jsにPrisma（ORM）を導入する

Djangoでは標準のDjango ORMが使われますが、Node.jsの世界では現在非常に人気があり型安全な **Prisma** を採用します。

```bash
npm install @prisma/client
npm install -D prisma
```

次に、Prismaを初期化します。

```bash
npx prisma init
```

これにより、`prisma` フォルダと `schema.prisma`、そして環境変数用の `.env` ファイルが生成されます。

### .env の修正
`.env` ファイルを開き、接続先URLを以下のように修正します。

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/next-ch_db?schema=public"
```

---

## 3. スキーマ（Model）の定義

`prisma/schema.prisma` を開き、最初のモデルである `Category`（板）を定義します。

```prisma
datasource db {
  provider = "postgresql"
}

generator client {
  provider = "prisma-client-client-js"
}

model Category {
  id           Int      @id @default(autoincrement())
  name         String
  categoryKey  String   @unique
  createdAt    DateTime @default(now())

  threads      Thread[]
}

model Thread {
  id         Int      @id @default(autoincrement())
  title      String
  categoryId Int
  createdAt  DateTime @default(now())

  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
}
```

### マイグレーションの実行
スキーマを定義したら、データベースに反映（マイグレーション）させます。Djangoの `makemigrations` と `migrate` に相当するコマンドです。

```bash
npx prisma migrate dev --name init
```

これで、データベースに `Category` と `Thread` テーブルが作成されました。

---

## 第2章のまとめ
これでデータベースが立ち上がり、Nest.jsから型安全にデータを操作するためのスキーマ定義が完了しました。
第3章では、Nest.jsにサービスとコントローラーを作成し、板一覧やスレッドを取得する「REST API」を構築します。
