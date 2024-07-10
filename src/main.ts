import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Smartika API')
    .setDescription('The Smartika API description')
    .setVersion('1.0')
    .setContact('Smartika', 'https://smartikcorp.com/', 'smartikacorp')
    .setContact(
      'Dev',
      'contactojosegutierrez10@gmail.com',
      'Jose Manuel Gutierrez Navarro',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT_API);
  logger.log('################################');
  logger.log(`######### API SERVER ON ########`);
  logger.log('################################');
  logger.log(`${process.env.HOST_API}`);
}
bootstrap();
