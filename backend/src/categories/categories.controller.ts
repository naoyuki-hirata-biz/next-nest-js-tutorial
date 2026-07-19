import { Body, Controller, Get, Post } from '@nestjs/common';
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
