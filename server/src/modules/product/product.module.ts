import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { List } from '../list/models/list.model';

@Module({
  imports: [SequelizeModule.forFeature([Product, List])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
