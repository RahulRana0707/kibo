import type {
  BotDto,
  BotListResult,
  EscalationRuleDto,
  WorkspaceDto,
} from '@kibo/contracts';

import {
  closeDatabase,
  errorOf,
  resetDatabase,
  resultOf,
  setBotLimit,
  setBotStatus,
  signUp,
} from './helpers';

describe('Bots (e2e)', () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  describe('workspace', () => {
    it('gives every new account a personal workspace with a 1-bot trial', async () => {
      const agent = await signUp('Mira Okafor');
      const response = await agent.get('/workspaces/current').expect(200);
      const workspace = resultOf<WorkspaceDto>(response.body);

      expect(workspace).toMatchObject({
        name: 'Mira Okafor',
        personal: true,
        role: 'owner',
        defaultBotId: null,
        metadata: {},
        limits: { bots: { used: 0, max: 1 } },
      });
    });

    it('updates the name and metadata, dropping unknown metadata keys', async () => {
      const agent = await signUp();
      const response = await agent
        .patch('/workspaces/current')
        .send({
          name: 'Mira’s streams',
          metadata: { description: 'Valorant, mostly', unknown: true },
        })
        .expect(200);

      expect(resultOf<WorkspaceDto>(response.body)).toMatchObject({
        name: 'Mira’s streams',
        metadata: { description: 'Valorant, mostly' },
      });
    });
  });

  describe('create', () => {
    it('creates a draft, silent bot with defaults and the three starter rules', async () => {
      const agent = await signUp();
      const response = await agent
        .post('/bots')
        .send({ name: '  Pip  ' })
        .expect(201);
      const bot = resultOf<BotDto>(response.body);

      expect(bot).toMatchObject({
        name: 'Pip',
        status: 'draft',
        replyMode: 'silent',
        personality: 'friendly',
        languages: ['en'],
        confidenceThreshold: 85,
        isDefault: true,
      });
      expect(bot.escalationRules.map((rule) => rule.severity)).toEqual([
        'highest',
        'high',
        'normal',
      ]);
    });

    it('applies a template, then what was typed on top', async () => {
      const agent = await signUp();
      const response = await agent
        .post('/bots')
        .send({
          name: 'Pip',
          templateKey: 'gaming',
          personality: 'chill',
          languages: ['en', 'hi-Latn'],
        })
        .expect(201);

      expect(resultOf<BotDto>(response.body)).toMatchObject({
        templateKey: 'gaming',
        replyMode: 'approval',
        personality: 'chill',
        languages: ['en', 'hi-Latn'],
      });
    });

    it('accepts Hinglish and rejects Devanagari Hindi with field issues', async () => {
      const agent = await signUp();
      const response = await agent
        .post('/bots')
        .send({ name: 'Pip', languages: ['hi'] })
        .expect(400);
      const error = errorOf(response.body);

      expect(error.code).toBe('VALIDATION_FAILED');
      expect(error.details?.issues).toEqual([
        { path: 'languages.0', message: 'Pick English or Hinglish.' },
      ]);
    });

    it('stops at the trial limit of 1 bot', async () => {
      const agent = await signUp();
      await agent.post('/bots').send({ name: 'Pip' }).expect(201);

      const response = await agent
        .post('/bots')
        .send({ name: 'Cozy Pip' })
        .expect(409);

      expect(errorOf(response.body)).toMatchObject({
        code: 'BOT_LIMIT_REACHED',
        message:
          'Your plan includes 1 bot. Archive Pip to make room for another.',
      });
    });

    it('allows more bots when the workspace limit is raised', async () => {
      const agent = await signUp();
      await setBotLimit(3);
      for (const name of ['Pip', 'Cozy Pip', 'Hindi Pip']) {
        await agent.post('/bots').send({ name }).expect(201);
      }
      await agent.post('/bots').send({ name: 'Fourth' }).expect(409);
    });

    it('keeps names unique per workspace, ignoring case', async () => {
      const agent = await signUp();
      await setBotLimit(3);
      await agent.post('/bots').send({ name: 'Pip' }).expect(201);

      const response = await agent
        .post('/bots')
        .send({ name: 'pip' })
        .expect(409);
      expect(errorOf(response.body).code).toBe('BOT_NAME_TAKEN');
    });

    it('copies settings and rules from another bot', async () => {
      const agent = await signUp();
      await setBotLimit(2);
      const source = resultOf<BotDto>(
        (await agent.post('/bots').send({ name: 'Pip' })).body,
      );
      await agent
        .patch(`/bots/${source.id}`)
        .send({ confidenceThreshold: 92, blockedTopics: ['Politics'] })
        .expect(200);

      const response = await agent
        .post('/bots')
        .send({ name: 'Cozy Pip', copyFrom: { botId: source.id } })
        .expect(201);

      expect(resultOf<BotDto>(response.body)).toMatchObject({
        name: 'Cozy Pip',
        confidenceThreshold: 92,
        blockedTopics: ['Politics'],
        isDefault: false,
      });
    });
  });

  describe('workspace isolation', () => {
    it('answers 404 for another workspace’s bot, never 403', async () => {
      const owner = await signUp('Mira Okafor');
      const bot = resultOf<BotDto>(
        (await owner.post('/bots').send({ name: 'Pip' })).body,
      );

      const stranger = await signUp('Someone Else');
      const response = await stranger.get(`/bots/${bot.id}`).expect(404);
      expect(errorOf(response.body).code).toBe('BOT_NOT_FOUND');

      await stranger
        .patch(`/bots/${bot.id}`)
        .send({ quietMode: true })
        .expect(404);
      const list = resultOf<BotListResult>((await stranger.get('/bots')).body);
      expect(list.items).toEqual([]);
    });
  });

  describe('list', () => {
    it('filters by status and search while counts stay whole', async () => {
      const agent = await signUp();
      await setBotLimit(3);
      await agent
        .post('/bots')
        .send({ name: 'Pip', purpose: 'Ranked nights' })
        .expect(201);
      const cozy = resultOf<BotDto>(
        (await agent.post('/bots').send({ name: 'Cozy Pip' })).body,
      );
      await agent.post(`/bots/${cozy.id}/archive`).expect(200);

      const all = resultOf<BotListResult>((await agent.get('/bots')).body);
      expect(all.items.map((bot) => bot.name)).toEqual(['Pip']);
      expect(all.counts).toEqual({
        all: 1,
        active: 0,
        paused: 0,
        draft: 1,
        archived: 1,
      });
      expect(all.limit).toEqual({ used: 1, max: 3 });

      const archived = resultOf<BotListResult>(
        (await agent.get('/bots?status=archived')).body,
      );
      expect(archived.items.map((bot) => bot.name)).toEqual(['Cozy Pip']);

      const searched = resultOf<BotListResult>(
        (await agent.get('/bots?q=ranked')).body,
      );
      expect(searched.items.map((bot) => bot.name)).toEqual(['Pip']);
      expect(searched.counts.all).toBe(1);
    });
  });

  describe('update', () => {
    it('saves one section at a time and validates each field', async () => {
      const agent = await signUp();
      const bot = resultOf<BotDto>(
        (await agent.post('/bots').send({ name: 'Pip' })).body,
      );

      const saved = resultOf<BotDto>(
        (
          await agent
            .patch(`/bots/${bot.id}`)
            .send({
              personality: 'hype',
              voiceNotes: 'Short replies.',
              replyMode: 'auto',
              confidenceThreshold: 90,
              viewerCooldownSeconds: 60,
            })
            .expect(200)
        ).body,
      );
      expect(saved).toMatchObject({
        personality: 'hype',
        voiceNotes: 'Short replies.',
        replyMode: 'auto',
        confidenceThreshold: 90,
        viewerCooldownSeconds: 60,
      });

      const tooLow = await agent
        .patch(`/bots/${bot.id}`)
        .send({ confidenceThreshold: 49 })
        .expect(400);
      expect(errorOf(tooLow.body).details?.issues?.[0]?.path).toBe(
        'confidenceThreshold',
      );

      await agent.patch(`/bots/${bot.id}`).send({}).expect(400);
    });

    it('replaces the escalation rules in the order given', async () => {
      const agent = await signUp();
      const bot = resultOf<BotDto>(
        (await agent.post('/bots').send({ name: 'Pip' })).body,
      );

      const response = await agent
        .put(`/bots/${bot.id}/escalation-rules`)
        .send({
          rules: [
            {
              trigger: 'Spoilers',
              severity: 'normal',
              action: 'hide_and_review',
            },
            { trigger: 'Self-harm', severity: 'highest', action: 'alert_mods' },
          ],
        })
        .expect(200);
      const rules = resultOf<EscalationRuleDto[]>(response.body);

      expect(rules.map((rule) => [rule.trigger, rule.position])).toEqual([
        ['Spoilers', 0],
        ['Self-harm', 1],
      ]);
    });
  });

  describe('pause and resume', () => {
    it('refuses a draft bot', async () => {
      const agent = await signUp();
      const bot = resultOf<BotDto>(
        (await agent.post('/bots').send({ name: 'Pip' })).body,
      );

      const response = await agent.post(`/bots/${bot.id}/pause`).expect(409);
      expect(errorOf(response.body).code).toBe('BOT_IS_DRAFT');
    });

    it('pauses and resumes a live bot', async () => {
      const agent = await signUp();
      const bot = resultOf<BotDto>(
        (await agent.post('/bots').send({ name: 'Pip' })).body,
      );
      await setBotStatus(bot.id, 'ACTIVE');

      const paused = resultOf<BotDto>(
        (await agent.post(`/bots/${bot.id}/pause`).expect(200)).body,
      );
      expect(paused.status).toBe('paused');
      expect(paused.pausedAt).not.toBeNull();

      const resumed = resultOf<BotDto>(
        (await agent.post(`/bots/${bot.id}/resume`).expect(200)).body,
      );
      expect(resumed).toMatchObject({ status: 'active', pausedAt: null });
    });
  });

  describe('archive, restore and the default bot', () => {
    it('frees the slot, moves the default and refuses restore over the limit', async () => {
      const agent = await signUp();
      const pip = resultOf<BotDto>(
        (await agent.post('/bots').send({ name: 'Pip' })).body,
      );

      const archived = resultOf<BotDto>(
        (await agent.post(`/bots/${pip.id}/archive`).expect(200)).body,
      );
      expect(archived.archivedAt).not.toBeNull();
      expect(archived.isDefault).toBe(false);

      // The freed slot lets a second bot in; it becomes the default
      const cozy = resultOf<BotDto>(
        (await agent.post('/bots').send({ name: 'Cozy Pip' }).expect(201)).body,
      );
      expect(cozy.isDefault).toBe(true);

      const blocked = await agent.post(`/bots/${pip.id}/restore`).expect(409);
      expect(errorOf(blocked.body).code).toBe('BOT_LIMIT_REACHED');

      await agent
        .patch(`/bots/${pip.id}`)
        .send({ quietMode: true })
        .expect(409);
    });

    it('makes another bot the default, but not an archived one', async () => {
      const agent = await signUp();
      await setBotLimit(2);
      const pip = resultOf<BotDto>(
        (await agent.post('/bots').send({ name: 'Pip' })).body,
      );
      const cozy = resultOf<BotDto>(
        (await agent.post('/bots').send({ name: 'Cozy Pip' })).body,
      );

      const workspace = resultOf<WorkspaceDto>(
        (await agent.post(`/bots/${cozy.id}/make-default`).expect(200)).body,
      );
      expect(workspace.defaultBotId).toBe(cozy.id);

      await agent.post(`/bots/${pip.id}/archive`).expect(200);
      const response = await agent
        .post(`/bots/${pip.id}/make-default`)
        .expect(409);
      expect(errorOf(response.body).code).toBe('BOT_ARCHIVED');
    });
  });

  describe('duplicate', () => {
    it('copies as a draft named “copy”, within the limit', async () => {
      const agent = await signUp();
      const pip = resultOf<BotDto>(
        (await agent.post('/bots').send({ name: 'Pip' })).body,
      );
      await agent.post(`/bots/${pip.id}/duplicate`).expect(409);

      await setBotLimit(3);
      const copy = resultOf<BotDto>(
        (await agent.post(`/bots/${pip.id}/duplicate`).expect(201)).body,
      );
      const second = resultOf<BotDto>(
        (await agent.post(`/bots/${pip.id}/duplicate`).expect(201)).body,
      );

      expect(copy).toMatchObject({ name: 'Pip copy', status: 'draft' });
      expect(second.name).toBe('Pip copy 2');
      expect(copy.escalationRules).toHaveLength(3);
    });
  });

  describe('delete', () => {
    it('needs the exact name, then removes the bot and its default', async () => {
      const agent = await signUp();
      const pip = resultOf<BotDto>(
        (await agent.post('/bots').send({ name: 'Pip' })).body,
      );

      const mismatch = await agent
        .delete(`/bots/${pip.id}`)
        .send({ confirmName: 'pip' })
        .expect(400);
      expect(errorOf(mismatch.body).code).toBe('CONFIRM_NAME_MISMATCH');

      const deleted = await agent
        .delete(`/bots/${pip.id}`)
        .send({ confirmName: 'Pip' })
        .expect(200);
      expect(resultOf(deleted.body)).toBeNull();

      await agent.get(`/bots/${pip.id}`).expect(404);
      const workspace = resultOf<WorkspaceDto>(
        (await agent.get('/workspaces/current')).body,
      );
      expect(workspace.defaultBotId).toBeNull();
      expect(workspace.limits.bots.used).toBe(0);
    });
  });
});
