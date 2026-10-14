import { api, closeDatabase, errorOf, resultOf } from './helpers';

describe('Response envelope (e2e)', () => {
  afterAll(async () => {
    await closeDatabase();
  });

  it('wraps a successful response', async () => {
    const response = await api().get('/health').expect(200);

    expect(resultOf(response.body)).toEqual({ ok: true, service: 'kibo-api' });
  });

  it('wraps a missing session as 401 UNAUTHENTICATED', async () => {
    const response = await api().get('/bots').expect(401);

    expect(errorOf(response.body).code).toBe('UNAUTHENTICATED');
  });

  it('wraps an unknown route as 404 NOT_FOUND with a readable message', async () => {
    const response = await api().get('/no-such-route').expect(404);

    expect(errorOf(response.body)).toEqual({
      code: 'NOT_FOUND',
      message: 'That page or item doesn’t exist.',
      details: null,
    });
  });

  it('returns a null session as a success with a null result', async () => {
    const response = await api().get('/auth/session').expect(200);

    expect(resultOf(response.body)).toBeNull();
  });

  it('rejects malformed JSON with 400', async () => {
    const response = await api()
      .post('/bots')
      .set('Content-Type', 'application/json')
      .send('{"name":')
      .expect(400);

    expect(errorOf(response.body).code).toBe('REQUEST_FAILED');
  });
});
