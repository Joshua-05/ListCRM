import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { ListModule } from '../list/list.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), ListModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
