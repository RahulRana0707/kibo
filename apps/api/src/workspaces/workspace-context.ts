import type { MemberRole } from '@kibo/contracts';

/** The workspace a request acts in, resolved once by `WorkspaceGuard`. */
export type WorkspaceContext = {
  id: string;
  role: MemberRole;
  botLimit: number;
  defaultBotId: string | null;
};

// See session-user.ts: Express request types are extended through the global namespace.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      workspace?: WorkspaceContext;
    }
  }
}
