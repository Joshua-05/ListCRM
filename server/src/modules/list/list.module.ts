import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { List } from './models/list.model';
import { User } from '../auth/model/user.model';
import { Product } from '../product/models/product.model';

@Module({
  imports: [SequelizeModule.forFeature([List, User, Product])],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
