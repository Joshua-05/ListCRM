import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const port = process.env.PORT
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:5173']
    }
  });

  
  await app.listen(port);
}
bootstrap();
