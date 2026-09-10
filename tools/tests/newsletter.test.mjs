import assert from 'node:assert/strict';
import test from 'node:test';
import { handler } from '../../netlify/functions/newsletter.cjs';

test('newsletter handles preflight and rejects unsupported methods', async () => {
  assert.equal((await handler({ httpMethod: 'OPTIONS' })).statusCode, 204);
  assert.equal((await handler({ httpMethod: 'GET' })).statusCode, 405);
});

test('newsletter rejects an invalid email without contacting Brevo', async (t) => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => {
    throw new Error('Unexpected network request');
  });

  const response = await handler({ httpMethod: 'POST', body: '{"email":"invalid"}' });

  assert.equal(response.statusCode, 400);
  assert.equal(JSON.parse(response.body).success, false);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test('newsletter subscribes an email through Brevo', async (t) => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 201 }));

  const response = await handler({
    httpMethod: 'POST',
    body: JSON.stringify({ email: 'newsletter-test@example.com' }),
  });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(JSON.parse(response.body), { success: true });
  assert.equal(fetchMock.mock.callCount(), 1);
  const [url, options] = fetchMock.mock.calls[0].arguments;
  assert.equal(url, 'https://api.brevo.com/v3/contacts');
  assert.equal(options.method, 'POST');
  assert.deepEqual(JSON.parse(options.body), {
    email: 'newsletter-test@example.com',
    listIds: [27],
    updateEnabled: true,
  });
});
