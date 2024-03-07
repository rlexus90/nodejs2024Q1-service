import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { printInfo } from './helpers/print';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () =>
    printInfo(`Server start on Port=${PORT}`, 'green'),
  );
}
bootstrap();
