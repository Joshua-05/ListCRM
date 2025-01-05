import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:5173']
    }
  });

  const setting = new DocumentBuilder()
    .setTitle('ListSRM API')
    .setDescription('This api for productList')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, setting)
  SwaggerModule.setup('api', app, document)

  await app.listen(port);
}
bootstrap();
