import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PaginationService } from './pagination/pagination.service';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [AuthModule, DatabaseModule, ProductsModule,],
  controllers: [AppController],
  providers: [AppService, PaginationService],
})
export class AppModule {}

