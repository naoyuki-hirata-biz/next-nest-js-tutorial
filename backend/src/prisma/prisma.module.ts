import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // アプリ全体でインポートなしで使えるようにグローバル化
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
