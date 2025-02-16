import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthGuard, AuthService, SuccessResponseDto } from './common';

function initializeFirebase() {
  const logger = new Logger('Firebase');
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
    });
    logger.log('Firebase initialized');
  } else {
    logger.log('Firebase already initialized');
  }
}

async function bootstrap() {
  initializeFirebase();

  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    }),
  );

  const reflector = app.get(Reflector);
  const authService = app.get(AuthService);
  app.useGlobalGuards(new AuthGuard(reflector, authService));

  const config = new DocumentBuilder()
    .setTitle('Nest React RBAC API')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey(
      { type: 'apiKey', name: 'x-tenant-id', in: 'header' },
      'x-tenant-id',
    )
    .addSecurityRequirements({ 'x-api-key': [], 'x-tenant-id': [] })
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [SuccessResponseDto],
  });
  SwaggerModule.setup('api/docs', app, document, {
    jsonDocumentUrl: '/api/docs/swagger.json',
    swaggerOptions: {
      url: '/api/docs/swagger.json',
      displayRequestDuration: true,
    },
  });

  const origins = [/^http:\/\/localhost(:\d+)?$/];
  app.enableCors({ origin: origins });

  const port = process.env.PORT ?? 8080;

  logger.log(`Application is running on: http://localhost:${port}/api`);
  logger.log(`Swagger is running on: http://localhost:${port}/api/docs`);

  await app.listen(port ?? 8080);
}

bootstrap().catch(console.error);
