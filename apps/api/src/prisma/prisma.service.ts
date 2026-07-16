import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient as PrismaClientClass } from '@prisma/client';
import { Pool } from 'pg';

import { env } from '../config/env';

@Injectable()
export class PrismaService
  extends PrismaClientClass
  implements OnModuleDestroy
{
  private readonly pool: Pool;

  constructor() {
    const pool = new Pool({
      connectionString: env.DATABASE_URL,
    });

    super({
      adapter: new PrismaPg(pool),
    });

    this.pool = pool;
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
