import { Injectable, Logger } from '@nestjs/common';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { betterAuth } from 'better-auth';
import { fromNodeHeaders, toNodeHandler } from 'better-auth/node';
import type { IncomingHttpHeaders } from 'node:http';

import { env } from '../config/env';
import { PrismaService } from '../prisma/prisma.service';
import { ensurePersonalWorkspace } from '../workspaces/personal-workspace';

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
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly prisma: PrismaService) {
    this.auth = betterAuth({
      database: prismaAdapter(this.prisma, {
        provider: 'postgresql',
      }),
      emailAndPassword: {
        enabled: true,
        // Matches the sign-up form: at least 10 characters.
        minPasswordLength: 10,
      },
      session: {
        // "Keep me logged in for 30 days" on the log-in form.
        expiresIn: 60 * 60 * 24 * 30,
      },
      baseURL: env.API_URL,
      basePath: '/api/auth',
      secret: env.BETTER_AUTH_SECRET,
      trustedOrigins: [env.WEB_URL, env.API_URL],
      databaseHooks: {
        user: {
          create: {
            // Every account starts with a personal workspace. If this fails the
            // sign-up still succeeds: WorkspaceGuard creates it on first use.
            after: async (user) => {
              try {
                await ensurePersonalWorkspace(this.prisma, user);
              } catch (error) {
                this.logger.error(
                  `Couldn't create a personal workspace for ${user.id}`,
                  error instanceof Error ? error.stack : String(error),
                );
              }
            },
          },
        },
      },
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
