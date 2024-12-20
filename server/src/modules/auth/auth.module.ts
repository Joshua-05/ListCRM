import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { List } from '../list/models/list.model';

@Module({
  imports: [SequelizeModule.forFeature([User, List])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
