export type SessionUser = {
  id: string;
};

// Express types are declared through the global `Express` namespace, so this is
// the only way to attach the guard's result to `Request` in a typed way.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      sessionUser?: SessionUser;
    }
  }
}
