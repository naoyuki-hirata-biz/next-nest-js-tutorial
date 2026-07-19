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
