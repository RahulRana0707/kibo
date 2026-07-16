import { Injectable } from '@nestjs/common';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { betterAuth } from 'better-auth';
import { fromNodeHeaders, toNodeHandler } from 'better-auth/node';
import type { IncomingHttpHeaders } from 'node:http';

import { env } from '../config/env';
import { PrismaService } from '../prisma/prisma.service';

type AuthSession = {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
} | null;

type AuthApi = {
  handler: (request: Request) => Promise<Response>;
  api: {
    getSession(input: { headers: Headers }): Promise<AuthSession>;
  };
};

@Injectable()
export class AuthService {
  private readonly auth: AuthApi;

  constructor(private readonly prisma: PrismaService) {
    this.auth = betterAuth({
      database: prismaAdapter(this.prisma, {
        provider: 'postgresql',
      }),
      emailAndPassword: {
        enabled: true,
      },
      baseURL: env.API_URL,
      basePath: '/api/auth',
      secret: env.BETTER_AUTH_SECRET,
      trustedOrigins: [env.WEB_URL, env.API_URL],
    });
  }

  getSession(headers: IncomingHttpHeaders) {
    return this.auth.api.getSession({
      headers: fromNodeHeaders(headers),
    });
  }

  getNodeHandler() {
    return toNodeHandler(this.auth);
  }
}
