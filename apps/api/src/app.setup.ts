import type { INestApplication } from '@nestjs/common';
import express, { type Request, type Response } from 'express';

import { AuthService } from './auth/auth.service';
import { EnvelopeExceptionFilter } from './common/envelope-exception.filter';
import { ResponseInterceptor } from './common/response.interceptor';
import { env } from './config/env';

/**
 * Everything the app needs besides its modules. Shared by `main.ts` and the
 * end-to-end tests so they run the same app.
 */
export function configureApp(app: INestApplication) {
  app.enableCors({
    origin: env.WEB_URL,
    credentials: true,
  });

  // better-auth reads the raw body itself, so it's mounted before the JSON
  // parser and keeps its own response format, which its client expects.
  const authHandler = app.get(AuthService).getNodeHandler();
  app.use('/api/auth', (request: Request, response: Response) => {
    void authHandler(request, response);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Every Nest route answers with { status, result, error }
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new EnvelopeExceptionFilter());

  return app;
}
