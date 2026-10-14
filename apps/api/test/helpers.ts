import type { ApiResponse } from '@kibo/contracts';
import { Pool } from 'pg';
import request from 'supertest';
import type TestAgent from 'supertest/lib/agent';

import { TEST_API_URL, testDatabaseUrl } from './test-database';

const WEB_URL = process.env.WEB_URL ?? 'http://localhost:3050';

/** The running test API (started by global-setup.ts). */
export function api() {
  return request(TEST_API_URL);
}

const pool = new Pool({ connectionString: testDatabaseUrl() });

/** Direct access to the test database, for setup the API can't do yet. */
export function db() {
  return pool;
}

export async function closeDatabase() {
  await pool.end();
}

/** Empties every table; users cascade to sessions, workspaces to bots. */
export async function resetDatabase() {
  await pool.query(
    'TRUNCATE TABLE "user", "workspace", "verification" CASCADE',
  );
}

/** Lets a test create more than the trial’s single bot. */
export async function setBotLimit(limit: number) {
  await pool.query('UPDATE "workspace" SET "botLimit" = $1', [limit]);
}

/** Going live arrives with platforms (Module 4); tests set it directly. */
export async function setBotStatus(
  botId: string,
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED',
) {
  await pool.query('UPDATE "bot" SET "status" = $1 WHERE "id" = $2', [
    status,
    botId,
  ]);
}

let counter = 0;

/**
 * Signs a new user up through better-auth and returns an agent that sends
 * their session cookie on every request.
 */
export async function signUp(name = 'Mira Okafor'): Promise<TestAgent> {
  const agent = request.agent(TEST_API_URL);
  counter += 1;
  await agent
    .post('/api/auth/sign-up/email')
    .set('Origin', WEB_URL)
    .send({
      name,
      email: `creator-${Date.now()}-${counter}@kibo.test`,
      password: 'a-strong-pass-42',
    })
    .expect(200);
  return agent;
}

/** Asserts the response is the success envelope and returns `result`. */
export function resultOf<T>(body: unknown): T {
  const envelope = body as ApiResponse<T>;
  expect(envelope.status).toBe('success');
  expect(envelope.error).toBeNull();
  return envelope.result as T;
}

/** Asserts the response is the failure envelope and returns `error`. */
export function errorOf(body: unknown) {
  const envelope = body as ApiResponse<unknown>;
  expect(envelope.status).toBe('failed');
  expect(envelope.result).toBeNull();
  if (envelope.status !== 'failed') throw new Error('Expected a failure');
  return envelope.error;
}
