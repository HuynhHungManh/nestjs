import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './repositories/products.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsRepository])],
  controllers: [ProductsController],
  providers: [ProductsService],
})

export class ProductsModule {}
