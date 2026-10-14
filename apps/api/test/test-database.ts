import 'dotenv/config';

/** The port the e2e API listens on, beside the dev API on 8090. */
export const TEST_PORT = 8091;
export const TEST_API_URL = `http://localhost:${TEST_PORT}`;

/** The dev database URL with the database renamed to `kibo_test`. */
export function testDatabaseUrl() {
  const url = new URL(process.env.DATABASE_URL ?? '');
  url.pathname = '/kibo_test';
  return url.toString();
}
