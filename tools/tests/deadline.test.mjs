import assert from 'node:assert/strict';
import test from 'node:test';
import { isDeadlineOpen } from '../../src/lib/publication.ts';

test('a campaign requires a configured deadline', () => {
  const now = new Date('2026-10-10T12:00:00Z');
  assert.equal(isDeadlineOpen(undefined, now), false);
  assert.equal(isDeadlineOpen('', now), false);
});

test('a campaign closes at midnight in Paris after its deadline', () => {
  const deadline = '2026-10-11';
  assert.equal(isDeadlineOpen(deadline, new Date('2026-10-10T12:00:00Z')), true);
  assert.equal(isDeadlineOpen(deadline, new Date('2026-10-11T21:59:59.999Z')), true);
  assert.equal(isDeadlineOpen(deadline, new Date('2026-10-11T22:00:00Z')), false);
  assert.equal(isDeadlineOpen(deadline, new Date('2026-10-12T12:00:00Z')), false);
});

test('moving the deadline reopens the campaign', () => {
  const now = new Date('2026-10-12T12:00:00Z');
  assert.equal(isDeadlineOpen('2026-10-11', now), false);
  assert.equal(isDeadlineOpen('2026-11-01', now), true);
});

test('the Paris midnight boundary also applies in winter', () => {
  assert.equal(isDeadlineOpen('2026-12-11', new Date('2026-12-11T22:59:59.999Z')), true);
  assert.equal(isDeadlineOpen('2026-12-11', new Date('2026-12-11T23:00:00Z')), false);
});
