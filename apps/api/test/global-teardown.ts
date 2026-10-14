import type { ChildProcess } from 'node:child_process';

export default function globalTeardown() {
  const server = (globalThis as { __API_SERVER__?: ChildProcess })
    .__API_SERVER__;
  server?.kill();
}
