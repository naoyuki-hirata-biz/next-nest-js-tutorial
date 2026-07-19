import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() { // ここに 'function' キーワードを追加
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Next.jsの開発サーバーURL
    credentials: true,
  });
  await app.listen(3001); // ポートを3001に設定
}
bootstrap();
