import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { printInfo } from './helpers/print';
import { getSwaggerDoc } from './helpers/swagger';
import { SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());

  const swaggerData = await getSwaggerDoc();
  SwaggerModule.setup('doc', app, swaggerData);

  await app.listen(PORT, () =>
    printInfo(`Server start on Port=${PORT}`, 'green'),
  );
}
bootstrap();
