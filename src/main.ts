import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './utils/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const adapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
