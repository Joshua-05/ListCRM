import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'hj;ltcndj8',
      database: 'ListCRM',
      models: [],
      autoLoadModels: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
