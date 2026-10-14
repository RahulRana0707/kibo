import type { Prisma, PrismaClient } from '@prisma/client';

type Db = PrismaClient | Prisma.TransactionClient;

/**
 * Returns the user’s personal workspace, creating it (and their owner
 * membership) the first time. A transaction-scoped advisory lock on the
 * user stops two simultaneous requests from creating two workspaces.
 *
 * Called from the sign-up hook and, for accounts that predate workspaces,
 * on their first workspace-scoped request.
 */
export async function ensurePersonalWorkspace(
  prisma: PrismaClient,
  user: { id: string; name?: string | null },
) {
  const existing = await findPersonal(prisma, user.id);
  if (existing) return existing;

  return prisma.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${`personal-workspace:${user.id}`}))`;

    const raced = await findPersonal(tx, user.id);
    if (raced) return raced;

    const name =
      user.name?.trim() ||
      (await tx.user.findUnique({ where: { id: user.id } }))?.name ||
      'My workspace';

    return tx.workspace.create({
      data: {
        name,
        personal: true,
        members: { create: { userId: user.id, role: 'OWNER' } },
      },
    });
  });
}

function findPersonal(db: Db, userId: string) {
  return db.workspace.findFirst({
    where: { personal: true, members: { some: { userId, role: 'OWNER' } } },
    orderBy: { createdAt: 'asc' },
  });
}
