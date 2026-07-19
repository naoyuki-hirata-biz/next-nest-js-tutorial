# Next.js + Nest.js フルスタック開発入門 - 第3章: APIの構築とコントローラー

第3章では、Nest.jsでデータベースからデータを取得してクライアントに返す「REST API」を作成します。Djangoでの `views.py` や `urls.py` にあたる部分を、Nest.jsの「Controller」と「Service」を使って実装します。

---

## 1. Prismaサービスの作成

Nest.js全体でPrismaクライアントを使い回せるように、Prismaサービスを作成します。

まず、PostgreSQLアダプターと `pg` ライブラリをインストールします。

```bash
# backend/nest-project ディレクトリで実行
docker compose exec backend npm install pg @prisma/adapter-pg
```

次に、モジュールとサービスの雛形を生成します。

```bash
# backend/nest-project ディレクトリで実行
docker compose exec backend npx nest g module prisma
docker compose exec backend npx nest g service prisma --no-spec
```

`src/prisma/prisma.service.ts` を開き、以下のように実装します。

```typescript src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// PostgreSQLアダプターとpgライブラリをインポート
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg'; // pgライブラリのPoolクラス

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // 環境変数からDATABASE_URLを取得
    const databaseUrl = process.env.DATABASE_URL;

    // DATABASE_URLが定義されているか確認
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined in environment variables.');
    }

    // pg.Pool を作成し、PrismaPgアダプターに渡す
    const pool = new Pool({ connectionString: databaseUrl });
    const adapter = new PrismaPg(pool);

    // super() に adapter オプションを渡す
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

他のモジュールでも使えるように、`src/prisma/prisma.module.ts` でエクスポートします。

```typescript src/prisma/prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // アプリ全体でインポートなしで使えるようにグローバル化
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

---

## 2. Category（板）モジュール・サービス・コントローラーの生成

次に、掲示板の「板（Category）」に関するAPIを作ります。Nest.jsのCLIを使うと、一瞬で3種の神器（Module, Service, Controller）の雛形を自動生成できます。Dockerコンテナ内で実行するため、`docker compose exec` を使用します。

```bash
# プロジェクトルートで実行
docker compose exec backend npx nest g resource categories --no-spec
```
※プロンプトが表示されたら `REST API` を選択し、`Would you like to generate CRUD entry points?` には `Yes` と答えてください。不要なファイルや関数が自動生成されますが、今回はこれを書き換えて使います。

### A. サービスの実装 (`src/categories/categories.service.ts`)
サービスは「ビジネスロジックやDB操作」を担当します。

```typescript src/categories/categories.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  // 全ての板（カテゴリ）を取得する
  async findAll() {
    return this.prisma.category.findMany({
      include: {
        threads: true, // 所属するスレッドも一緒に取得
      },
    });
  }

  // 特定の板を作成する
  async create(data: { name: string; categoryKey: string }) {
    return this.prisma.category.create({
      data,
    });
  }
}
```

### B. コントローラーの実装 (`src/categories/categories.controller.ts`)
コントローラーは「ルーティングとHTTPリクエスト/レスポンス」を担当します（Djangoの `urls.py` + `views.py`）。

```typescript src/categories/categories.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories') // エンドポイントのベースURLが '/categories' になります
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Post()
  create(@Body() createDto: { name: string; categoryKey: string }) {
    return this.categoriesService.create(createDto);
  }
}
```

---

## 3. CORSの有効化とAPIのテスト

フロントエンド（Next.js）からのリクエストを受け付けるために、CORSを有効化します。
`src/main.ts` を開き、以下のように修正します。

```typescript src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Next.jsの開発サーバーURL (Frontendのポートに合わせる)
    credentials: true,
  });
  await app.listen(3001); // Nest.jsのポートを3001に設定 (Backendのポートに合わせる)
}
bootstrap();
```

ここでNest.jsを起動（`npm run start:dev`）し、APIクライアント（PostmanやcURL）で `GET http://localhost:3001/categories` にアクセスして、空の配列 `[]` が返ってくることを確認してください。

---

## 第3章のまとめ
これで、バックエンド側にデータを操作・返却するためのREST APIが完成しました！
第4章では、フロントエンド（Next.js）からこのAPIを呼び出し、モダンなUIで板一覧やスレッド一覧をレンダリングします。
