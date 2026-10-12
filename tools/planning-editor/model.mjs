export const DAYS = [{ key: 'jeudi', label: 'Jeudi', number: 1 }, { key: 'vendredi', label: 'Vendredi', number: 2 }];

export function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

// Keep the site's historical 110-minute occupancy for 120-minute workshops.
export function getDurationFromFormat(format) {
  const duration = Number(format?.match(/\((\d+)min\)/)?.[1] || 50);
  return duration === 120 ? 110 : duration;
}

export function createCatalog(raw, keynotes, overrides) {
  const talks = raw.filter(t => t.deliberationStatus === 'ACCEPTED' || t.confirmationStatus === 'confirmed').map(t => ({
    id: t.id, title: t.title, formats: t.formats[0], categories: t.categories[0] || null,
    speakers: t.speakers.map(s => s.name.replace(/ /g, '_')),
    ...overrides[t.id],
  }));
  for (const keynote of keynotes) if (!talks.some(t => t.id === keynote.id)) talks.push(keynote);
  // Only the fields needed to prepare the programme leave the local server.
  return talks.map(t => ({
    id: t.id, title: t.title, format: t.formats, category: t.categories || 'Keynote',
    speakers: t.speakers || [], duration: getDurationFromFormat(t.formats),
  }));
}

export function parsePlanning(planning) {
  if (!planning || typeof planning !== 'object' || Array.isArray(planning)) throw new Error('Le fichier doit contenir un planning par jour.');
  const placements = [];
  for (const [day, slots] of Object.entries(planning)) {
    if (!DAYS.some(d => d.key === day)) throw new Error(`Jour inconnu : ${day}. Utilisez jeudi ou vendredi.`);
    if (!slots || typeof slots !== 'object' || Array.isArray(slots)) throw new Error(`Les créneaux de ${day} sont invalides.`);
    for (const [time, entries] of Object.entries(slots)) {
      if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time) || !Array.isArray(entries)) throw new Error(`Créneau invalide : ${time}.`);
      for (const entry of entries) {
        if (!entry || typeof entry.id !== 'string' || !entry.id || !Array.isArray(entry.rooms) || !entry.rooms.length || entry.rooms.some(r => typeof r !== 'string')) {
          throw new Error(`Chaque talk à ${time} doit avoir un identifiant et au moins une salle.`);
        }
        placements.push({ id: entry.id, day, time, rooms: [...entry.rooms], title: typeof entry.title === 'string' ? entry.title : entry.id });
      }
    }
  }
  return placements;
}

export function exportPlanning(placements, data) {
  const result = { jeudi: {}, vendredi: {} };
  const roomOrder = new Map(data.rooms.map((r, i) => [r.name, i]));
  const catalog = new Map(data.talks.map(t => [t.id, t]));
  const sorted = [...placements].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time) || roomOrder.get(a.rooms[0]) - roomOrder.get(b.rooms[0]) || a.id.localeCompare(b.id));
  for (const p of sorted) {
    const talk = catalog.get(p.id);
    const entry = { rooms: [...p.rooms].sort((a, b) => roomOrder.get(a) - roomOrder.get(b)), id: p.id, title: talk?.title || p.title || p.id };
    if (talk?.speakers.length) entry.speaker = talk.speakers.map(s => s.replaceAll('_', ' ')).join(', ');
    (result[p.day][p.time] ||= []).push(entry);
  }
  return result;
}

export function getDaySlots(data, day) {
  const number = DAYS.find(d => d.key === day)?.number;
  return data.times.filter(t => t.days.includes(number));
}

export function getBreaks(data, day) {
  const number = DAYS.find(d => d.key === day)?.number;
  return data.breaks.filter(b => b.days.includes(number)).flatMap(b => b.times.map(index => ({
    title: b.name.replace(/^[^\p{L}\p{N}]+/u, '').replace(/\s*\(.*\)\s*$/, '') || 'Pause',
    start: timeToMinutes(data.times[index].time),
    end: timeToMinutes(data.times[index + 1]?.time || '19:00'),
    rooms: b.rooms.map(index => data.rooms[index - 1]?.name).filter(Boolean),
  })));
}

export function validatePlacements(placements, data) {
  const issues = [];
  const catalog = new Map(data.talks.map(t => [t.id, t]));
  const seen = new Set();
  const overlap = (a, b) => a.start < b.end && b.start < a.end;
  const intervals = [];
  const add = (ids, message) => issues.push({ ids, message });
  for (const p of placements) {
    const talk = catalog.get(p.id);
    const title = talk?.title || p.title || p.id;
    if (seen.has(p.id)) add([p.id], `« ${title} » est placé plusieurs fois.`);
    seen.add(p.id);
    if (!talk) { add([p.id], `« ${title} » ne fait pas partie des talks acceptés.`); continue; }
    const slots = getDaySlots(data, p.day);
    if (!slots.some(s => s.time === p.time)) { add([p.id], `L'horaire ${p.time} n'est pas configuré pour ${p.day}.`); continue; }
    if (!p.rooms.length || p.rooms.some(r => !data.rooms.some(room => room.name === r)) || new Set(p.rooms).size !== p.rooms.length) {
      add([p.id], `Les salles de « ${title} » sont invalides.`); continue;
    }
    const indices = p.rooms.map(r => data.rooms.findIndex(room => room.name === r)).sort((a, b) => a - b);
    if (indices.some((n, i) => i > 0 && n !== indices[i - 1] + 1)) add([p.id], `Choisissez des salles adjacentes pour « ${title} » : le site les affiche comme un seul bloc.`);
    const interval = { ...p, talk, start: timeToMinutes(p.time), end: timeToMinutes(p.time) + talk.duration };
    const dayEnd = timeToMinutes(slots.at(-1).time);
    if (interval.end > dayEnd) add([p.id], `« ${title} » dépasse la fin de journée (${slots.at(-1).time}).`);
    const pause = getBreaks(data, p.day).find(b => b.rooms.some(r => p.rooms.includes(r)) && overlap(interval, b));
    if (pause) add([p.id], `« ${title} » chevauche une pause en ${p.rooms.join(', ')}.`);
    for (const other of intervals) {
      if (other.day !== p.day || !overlap(interval, other)) continue;
      const room = p.rooms.find(r => other.rooms.includes(r));
      if (room) add([p.id, other.id], `${room} est occupée par « ${other.talk.title} » à ${p.time}.`);
      const speaker = talk.speakers.find(s => other.talk.speakers.includes(s));
      if (speaker) add([p.id, other.id], `${speaker.replaceAll('_', ' ')} intervient déjà au même moment.`);
    }
    intervals.push(interval);
  }
  return issues;
}

export function proposePlacement(placements, id, day, time, rooms, data) {
  const remaining = placements.filter(p => p.id !== id);
  const next = [...remaining, { id, day, time, rooms: [...rooms] }];
  const issues = validatePlacements(next, data).filter(issue => issue.ids.includes(id));
  return { placements: next, issues };
}
