import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { List } from './models/list.model';
import { User } from '../auth/model/user.model';

@Module({
  imports: [SequelizeModule.forFeature([List, User])],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
