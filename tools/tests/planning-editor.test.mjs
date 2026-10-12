import test from 'node:test';
import assert from 'node:assert/strict';
import { loadEditorData } from '../planning-editor/server.mjs';
import { createCatalog, parsePlanning, exportPlanning, validatePlacements, proposePlacement } from '../planning-editor/model.mjs';

const data = {
  rooms: [{ name: 'F21', capacity: 200 }, { name: 'F22', capacity: 200 }, { name: 'F23', capacity: 30 }],
  times: ['10:10', '11:00', '11:10', '12:00', '12:10', '12:25', '12:35', '13:00'].map(time => ({ time, days: [1, 2] })),
  breaks: [{ name: 'Pause café', rooms: [1, 2], times: [1], days: [1, 2] }],
  talks: [
    { id: 'a', title: 'Conférence A', format: 'Conférence (50min)', category: 'Architecture', speakers: ['Alice'], duration: 50 },
    { id: 'b', title: 'Conférence B', format: 'Conférence (50min)', category: 'Web', speakers: ['Alice'], duration: 50 },
    { id: 'c', title: 'Atelier C', format: 'Hands-on (120min)', category: 'Web', speakers: ['Bob'], duration: 110 },
    { id: 'd', title: 'Lightning D', format: 'Lightning (15min)', category: 'Web', speakers: ['Charlie'], duration: 15 },
  ],
};
const placement = (id, time = '10:10', rooms = ['F21'], day = 'jeudi') => ({ id, time, rooms, day });

test('the existing programme survives import/export with all its multi-room placements', () => {
  const realData = loadEditorData();
  const original = parsePlanning(realData.planning);
  assert.deepEqual(validatePlacements(original, realData), []);
  const restored = parsePlanning(exportPlanning(original, realData));
  const positions = placements => placements.map(({ id, day, time, rooms }) => ({ id, day, time, rooms })).sort((a, b) => a.id.localeCompare(b.id));
  assert.deepEqual(positions(restored), positions(original));
});

test('a workshop occupies the following conference slot and may cross a break in its own room', () => {
  const workshop = placement('c', '10:10', ['F23']);
  assert.deepEqual(validatePlacements([workshop], data), []);
  const occupied = proposePlacement([workshop], 'a', 'jeudi', '11:10', ['F23'], data);
  assert.match(occupied.issues[0].message, /F23 est occupée/);
  const paused = proposePlacement([], 'c', 'jeudi', '10:10', ['F21'], data);
  assert.match(paused.issues[0].message, /pause/);
});

test('speaker conflicts are detected across different rooms but not across days', () => {
  const first = placement('a');
  const conflict = proposePlacement([first], 'b', 'jeudi', '10:10', ['F22'], data);
  assert.match(conflict.issues[0].message, /Alice intervient déjà/);
  assert.deepEqual(proposePlacement([first], 'b', 'vendredi', '10:10', ['F22'], data).issues, []);
});

test('moving an existing talk removes its previous placement before checking collisions', () => {
  const original = [placement('a')];
  const moved = proposePlacement(original, 'a', 'jeudi', '10:10', ['F22'], data);
  assert.deepEqual(moved.issues, []);
  assert.equal(moved.placements.length, 1);
  assert.deepEqual(moved.placements[0].rooms, ['F22']);
  assert.deepEqual(original[0].rooms, ['F21']);
});

test('adjacent talks can touch without overlapping', () => {
  assert.deepEqual(validatePlacements([placement('a', '11:10'), placement('d', '12:00')], data), []);
});

test('invalid identifiers, duplicate talks, bad times and unsupported room spans remain visible as errors', () => {
  assert.match(validatePlacements([placement('missing')], data)[0].message, /talks acceptés/);
  assert.ok(validatePlacements([placement('a'), placement('a', '11:10')], data).some(issue => /plusieurs fois/.test(issue.message)));
  assert.match(validatePlacements([placement('a', '10:15')], data)[0].message, /n'est pas configuré/);
  assert.match(validatePlacements([placement('a', '10:10', ['F21', 'F23'])], data)[0].message, /adjacentes/);
  assert.match(validatePlacements([placement('a', '10:10', ['inconnue'])], data)[0].message, /invalides/);
  assert.match(validatePlacements([placement('a', '12:35')], data)[0].message, /fin de journée/);
});

test('import rejects malformed files and accepts an empty draft', () => {
  for (const input of [null, [], { lundi: {} }, { jeudi: [] }, { jeudi: { '25:00': [] } }, { jeudi: { '10:10': [{ id: 'a', rooms: [] }] } }]) {
    assert.throws(() => parsePlanning(input));
  }
  assert.deepEqual(parsePlanning({ jeudi: {}, vendredi: {} }), []);
});

test('export uses authoritative titles and speaker names in the source planning format', () => {
  const exported = exportPlanning([placement('a', '11:10', ['F22', 'F21']), placement('d', '10:10')], data);
  assert.deepEqual(Object.keys(exported.jeudi), ['10:10', '11:10']);
  assert.deepEqual(exported.jeudi['11:10'][0], { rooms: ['F21', 'F22'], id: 'a', title: 'Conférence A', speaker: 'Alice' });
});

test('the catalog filters proposals, applies overrides and excludes private proposal and speaker fields', () => {
  const raw = [
    { id: 'accepted', title: 'Original', formats: ['Hands-on (120min)'], categories: ['Web'], deliberationStatus: 'ACCEPTED', speakers: [{ name: 'Alice Martin', email: 'private@example.test' }], review: 'private' },
    { id: 'confirmed', title: 'Confirmed', formats: ['Lightning (15min)'], categories: [], confirmationStatus: 'confirmed', speakers: [] },
    { id: 'pending', deliberationStatus: 'PENDING' },
  ];
  const catalog = createCatalog(raw, [{ id: 'keynote', title: 'Keynote', formats: 'Conférence (20min)', speakers: [] }], { accepted: { title: 'Corrected', abstract: 'Not needed' } });
  assert.deepEqual(catalog.map(t => t.id), ['accepted', 'confirmed', 'keynote']);
  assert.equal(catalog[0].duration, 110);
  assert.equal(catalog[0].title, 'Corrected');
  assert.deepEqual(catalog[0].speakers, ['Alice_Martin']);
  assert.equal(catalog[0].abstract, undefined);
  assert.ok(!JSON.stringify(catalog).includes('private'));
});
