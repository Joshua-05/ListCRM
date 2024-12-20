import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { List } from './models/list.model';
import { User } from '../auth/model/user.model';
import { Product } from '../product/models/product.model';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [SequelizeModule.forFeature([List, User, Product]), ProductModule],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
