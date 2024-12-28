// products/products.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productProviders } from './products.providers';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...productProviders,
    ProductsService,
    PaginationService
  ],
  controllers: [ProductsController],
})
export class ProductsModule { }