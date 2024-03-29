import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { printInfo } from './helpers/print';
import { getSwaggerDoc } from './helpers/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const swaggerData = await getSwaggerDoc();
  SwaggerModule.setup('api', app, swaggerData);

  await app.listen(PORT, () =>
    printInfo(`Server start on Port=${PORT}`, 'green'),
  );
}
bootstrap();
