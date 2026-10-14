import { execSync, spawn } from 'node:child_process';
import path from 'node:path';

import { Client } from 'pg';

import { TEST_API_URL, TEST_PORT, testDatabaseUrl } from './test-database';

const apiRoot = path.join(__dirname, '..');

/**
 * Prepares a real API for the tests:
 * 1. creates the `kibo_test` database if it's missing and applies every migration;
 * 2. builds the API and starts it on its own port against that database.
 *
 * Tests then talk to it over HTTP, exactly like the web app does. (Jest can't
 * load better-auth's ES modules in-process, so the server runs in Node itself.)
 */
export default async function globalSetup() {
  const databaseUrl = testDatabaseUrl();
  await createDatabase(databaseUrl);

  const env = {
    ...process.env,
    DATABASE_URL: databaseUrl,
    NODE_ENV: 'test',
    PORT: String(TEST_PORT),
    API_URL: TEST_API_URL,
  };

  execSync('pnpm exec prisma migrate deploy', {
    cwd: apiRoot,
    env,
    stdio: 'pipe',
  });
  // Its own output folder, so a running dev server's dist/ is never touched
  execSync('pnpm exec tsc -p tsconfig.build.json --outDir dist-e2e', {
    cwd: apiRoot,
    env,
    stdio: 'pipe',
  });

  const server = spawn('node', ['dist-e2e/main'], {
    cwd: apiRoot,
    env,
    stdio: 'pipe',
  });
  let output = '';
  server.stdout?.on('data', (chunk: Buffer) => (output += chunk.toString()));
  server.stderr?.on('data', (chunk: Buffer) => (output += chunk.toString()));
  (globalThis as { __API_SERVER__?: typeof server }).__API_SERVER__ = server;

  await waitForHealth(() => output);
}

async function createDatabase(databaseUrl: string) {
  const admin = new URL(databaseUrl);
  admin.pathname = '/postgres';
  const client = new Client({ connectionString: admin.toString() });
  await client.connect();
  const exists = await client.query(
    'SELECT 1 FROM pg_database WHERE datname = $1',
    ['kibo_test'],
  );
  if (exists.rowCount === 0) {
    await client.query('CREATE DATABASE kibo_test');
  }
  await client.end();
}

async function waitForHealth(output: () => string) {
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      const response = await fetch(`${TEST_API_URL}/health`);
      if (response.ok) return;
    } catch {
      // Not listening yet
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`The test API didn't start:\n${output()}`);
}
