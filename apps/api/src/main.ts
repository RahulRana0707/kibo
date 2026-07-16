import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import express, { type Request, type Response } from 'express';

import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';
import { env } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.enableCors({
    origin: env.WEB_URL,
    credentials: true,
  });

  const authHandler = app.get(AuthService).getNodeHandler();

  app.use('/api/auth', (request: Request, response: Response) => {
    void authHandler(request, response);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  await app.listen(env.PORT);
}
void bootstrap();
