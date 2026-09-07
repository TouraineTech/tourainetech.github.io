import assert from 'node:assert/strict';
import test from 'node:test';
import { canPublishProgramme, isProgrammePath } from '../../src/lib/publication.ts';

test('a current programme stays private before publication', () => {
  for (const phase of ['intro', 'sponsoring', 'cfp', 'ticketing']) {
    assert.equal(canPublishProgramme(phase, 2027, 2027), false, phase);
  }
});

test('a previous edition cannot be published as the current programme', () => {
  for (const phase of ['programme', 'post-event']) {
    assert.equal(canPublishProgramme(phase, 2027, 2026), false, phase);
    assert.equal(canPublishProgramme(phase, 2027, 2027), true, phase);
  }
});

test('programme URLs are excluded without excluding public campaign pages', () => {
  for (const path of ['/schedule', '/schedule/', '/speakers/', '/speaker/alice/', '/talk/example/']) {
    assert.equal(isProgrammePath(path), true, path);
  }
  for (const path of ['/', '/sponsors/', '/photos/', '/team/', '/talking/']) {
    assert.equal(isProgrammePath(path), false, path);
  }
});
