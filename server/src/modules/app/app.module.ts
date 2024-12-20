import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { User } from '../auth/model/user.model';
import { ListModule } from '../list/list.module';
import { List } from '../list/models/list.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, List],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    ListModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
