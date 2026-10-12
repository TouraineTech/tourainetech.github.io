import { parsePlanning, exportPlanning, getDaySlots, getBreaks, timeToMinutes, validatePlacements, proposePlacement } from './model.mjs';

const $ = selector => document.querySelector(selector);
const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const colors = ['#2563eb', '#ef6c00', '#8939e5', '#008f78', '#d52578', '#b78800', '#e34234', '#087da5'];
let data, placements, day = 'jeudi', filter = 'all', selectedId = null, dragId = null, dialogId;
let past = [], future = [], issueList = [], storageKey, announcementTimer;
let touchDrag = null;
const categoryColors = new Map();

function notify(message) {
  $('#announcement').textContent = message;
  $('#announcement').classList.add('visible');
  clearTimeout(announcementTimer);
  announcementTimer = setTimeout(() => $('#announcement').classList.remove('visible'), 5000);
}

function color(talk) { return categoryColors.get(talk?.category) || '#4a6670'; }
function talkById(id) { return data.talks.find(talk => talk.id === id); }
function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(exportPlanning(placements, data)));
    $('#save-status').textContent = 'Brouillon enregistré';
  } catch { $('#save-status').textContent = 'Sauvegarde indisponible · pensez à exporter'; }
}

function commit(next, message) {
  past.push(structuredClone(placements));
  if (past.length > 100) past.shift();
  future = [];
  placements = next;
  selectedId = null;
  save();
  render();
  notify(message);
}

function history(direction) {
  const from = direction === 'undo' ? past : future;
  const to = direction === 'undo' ? future : past;
  if (!from.length) return;
  to.push(structuredClone(placements));
  placements = from.pop();
  selectedId = null;
  save(); render();
  notify(direction === 'undo' ? 'Modification annulée.' : 'Modification rétablie.');
}

function cardContents(talk, placement = null, scheduled = false) {
  const speaker = talk.speakers.map(s => s.replaceAll('_', ' ')).join(', ');
  return `<div class="card-meta"><span>${escape(talk.category)}</span><button class="drag-handle" data-edit="${escape(talk.id)}" data-drag-handle="${escape(talk.id)}" aria-label="Placer ou déplacer ${escape(talk.title)}" title="Déplacer ou choisir un créneau">⠿</button></div>
    <button class="talk-title" data-${scheduled ? 'edit' : 'select'}="${escape(talk.id)}">${escape(talk.title)}</button>
    ${speaker ? `<p class="speakers">${escape(speaker)}</p>` : ''}
    <div class="card-bottom"><span>${escape(talk.format || 'Conférence')}</span>${placement && !scheduled ? `<span class="placed-label">${placement.day === 'jeudi' ? 'Jeu.' : 'Ven.'} ${escape(placement.time)} · ${escape(placement.rooms.join(' + '))}</span>` : ''}</div>`;
}

function renderLibrary() {
  const search = $('#search').value.trim().toLocaleLowerCase('fr');
  const category = $('#category').value;
  const format = $('#format').value;
  const placed = new Map(placements.map(p => [p.id, p]));
  const remaining = data.talks.filter(t => !placed.has(t.id));
  const talks = data.talks.filter(t => (!category || t.category === category) && (!format || t.format === format)
    && (filter !== 'unplaced' || !placed.has(t.id))
    && `${t.title} ${t.speakers.join(' ').replaceAll('_', ' ')}`.toLocaleLowerCase('fr').includes(search));
  $('#talk-count').textContent = data.talks.length;
  $('#remaining').textContent = remaining.length;
  $('#talk-list').innerHTML = talks.map(t => `<article class="talk-card library-card ${placed.has(t.id) ? 'is-placed' : ''} ${selectedId === t.id ? 'selected' : ''}" draggable="true" data-talk="${escape(t.id)}" style="--category-color:${color(t)}">${cardContents(t, placed.get(t.id))}</article>`).join('')
    || `<div class="empty-library"><span aria-hidden="true">${filter === 'unplaced' && !remaining.length ? '✓' : '⌕'}</span><h3>${filter === 'unplaced' && !remaining.length ? 'Tous les talks sont placés' : 'Aucun talk trouvé'}</h3><p>${filter === 'unplaced' && !remaining.length ? 'Vous pouvez encore les déplacer dans la grille.' : 'Essayez une autre recherche ou retirez un filtre.'}</p></div>`;
}

function cellStyle(time, rooms, duration = null) {
  const slots = getDaySlots(data, day);
  const start = slots.findIndex(t => t.time === time);
  const indices = rooms.map(room => data.rooms.findIndex(r => r.name === room)).filter(i => i >= 0).sort((a, b) => a - b);
  if (start < 0 || !indices.length) return null;
  let last = start;
  if (duration) {
    for (let i = start; i < slots.length; i++) if (timeToMinutes(slots[i].time) < timeToMinutes(time) + duration) last = i;
  }
  return `grid-column:${indices[0] + 2}/${indices.at(-1) + 3};grid-row:${start + 2}/${last + 3}`;
}

function renderBoard() {
  const board = $('#board');
  const slots = getDaySlots(data, day);
  const rowHeights = slots.map((slot, i) => {
    const starts = [...(data.planning[day]?.[slot.time] || []), ...placements.filter(p => p.day === day && p.time === slot.time)];
    const duration = Math.max(0, ...starts.map(p => talkById(p.id)?.duration || 50));
    const minutes = (slots[i + 1] ? timeToMinutes(slots[i + 1].time) : timeToMinutes(slot.time) + 15) - timeToMinutes(slot.time);
    return `${duration ? duration <= 20 ? 96 : 128 : Math.max(32, minutes * .8)}px`;
  });
  board.style.gridTemplateColumns = `64px repeat(${data.rooms.length}, minmax(210px, 1fr))`;
  board.style.gridTemplateRows = `64px ${rowHeights.join(' ')}`;
  let html = '<div class="board-corner" style="grid-column:1;grid-row:1" aria-hidden="true">Heure</div>';
  html += data.rooms.map((room, i) => `<div class="room-heading" style="grid-column:${i + 2};grid-row:1"><strong>${escape(room.name)}</strong><span>${room.capacity} places</span></div>`).join('');
  html += slots.map((slot, i) => `<div class="time-label" style="grid-row:${i + 2};grid-column:1">${escape(slot.time)}</div>${data.rooms.map((room, r) => `<button class="slot" data-room="${escape(room.name)}" data-time="${escape(slot.time)}" style="grid-row:${i + 2};grid-column:${r + 2}" aria-label="Placer le talk sélectionné ${day} à ${slot.time}, salle ${escape(room.name)}" ${selectedId ? '' : 'tabindex="-1"'}><span aria-hidden="true">+</span></button>`).join('')}`).join('');
  for (const pause of getBreaks(data, day)) {
    const time = slots.find(s => timeToMinutes(s.time) === pause.start)?.time;
    const style = time && cellStyle(time, pause.rooms);
    if (style) html += `<div class="break-block" style="${style}"><span>${escape(pause.title)}</span></div>`;
  }
  for (const p of placements.filter(p => p.day === day)) {
    const talk = talkById(p.id) || { id: p.id, title: p.title || p.id, category: 'Talk inconnu', speakers: [], duration: 50 };
    const style = cellStyle(p.time, p.rooms, talk.duration);
    if (!style) continue;
    const conflict = issueList.some(issue => issue.ids.includes(p.id));
    html += `<article class="talk-card scheduled-card ${talk.duration <= 20 ? 'compact-card' : ''} ${conflict ? 'has-conflict' : ''} ${selectedId === p.id ? 'selected' : ''}" draggable="true" title="${escape(talk.title)}" data-talk="${escape(p.id)}" data-room="${escape(p.rooms[0])}" data-time="${escape(p.time)}" style="${style};--category-color:${color(talk)}">${cardContents(talk, p, true)}</article>`;
  }
  board.innerHTML = html;
}

function render() {
  issueList = validatePlacements(placements, data);
  renderLibrary(); renderBoard();
  $('#undo').disabled = !past.length;
  $('#redo').disabled = !future.length;
  const count = new Set(placements.map(p => p.id).filter(id => talkById(id))).size;
  $('#progress').innerHTML = `<strong>${count} / ${data.talks.length}</strong> talks placés <span class="progress-track"><span style="width:${data.talks.length ? count / data.talks.length * 100 : 0}%"></span></span>`;
  $('#show-issues').textContent = issueList.length ? `${issueList.length} conflit${issueList.length > 1 ? 's' : ''} à corriger` : '✓ Aucun conflit';
  $('#show-issues').classList.toggle('invalid', issueList.length > 0);
  $('#issues').innerHTML = issueList.length ? `<div class="issues-heading"><strong>À corriger avant l’export</strong><span>Choisissez un talk pour modifier son placement.</span></div>${issueList.map(issue => `<button data-edit="${escape(issue.ids[0])}">${escape(issue.message)}</button>`).join('')}` : '<p>Aucun conflit de salle, d’intervenant ou de pause.</p>';
  $('#export').disabled = issueList.length > 0;
  $('#export').title = issueList.length ? 'Corrigez les conflits avant d’exporter.' : 'Télécharger planning.json';
}

function selectTalk(id) {
  selectedId = selectedId === id ? null : id;
  render();
  if (selectedId) notify('Choisissez un créneau dans la grille, ou glissez le talk vers une salle.');
}

function candidate(id, time, room) {
  const current = placements.find(p => p.id === id);
  const width = current?.rooms.length || 1;
  const index = data.rooms.findIndex(r => r.name === room);
  if (index + width > data.rooms.length) return { issues: [{ message: `Ce talk occupe ${width} salles. Choisissez une salle plus à gauche ou modifiez ses salles.` }] };
  return proposePlacement(placements, id, day, time, data.rooms.slice(index, index + width).map(r => r.name), data);
}

function placeAt(id, time, room) {
  const result = candidate(id, time, room);
  if (result.issues.length) { notify(result.issues[0].message); return; }
  commit(result.placements, `Talk placé ${day} à ${time}, en ${room}.`);
}

function removeTalk(id) {
  if (!placements.some(p => p.id === id)) return;
  commit(placements.filter(p => p.id !== id), 'Talk remis dans la réserve.');
}

function updateDialogTimes() {
  const previous = $('#placement-time').value;
  $('#placement-time').innerHTML = getDaySlots(data, $('#placement-day').value).map(t => `<option value="${t.time}">${t.time}</option>`).join('');
  if (getDaySlots(data, $('#placement-day').value).some(t => t.time === previous)) $('#placement-time').value = previous;
}

function openPlacement(id) {
  dialogId = id;
  const p = placements.find(p => p.id === id);
  $('#placement-title').textContent = talkById(id)?.title || p?.title || id;
  $('#placement-day').value = p?.day || day;
  updateDialogTimes();
  $('#placement-time').value = p?.time || '10:10';
  $('#placement-rooms').innerHTML = data.rooms.map((room, i) => `<label><input type="checkbox" value="${escape(room.name)}" ${p ? p.rooms.includes(room.name) ? 'checked' : '' : i === 0 ? 'checked' : ''}><span>${escape(room.name)}</span></label>`).join('');
  $('#placement-error').textContent = '';
  $('#unplace').hidden = !p;
  $('#placement-dialog').showModal();
}

async function confirm(title, description) {
  const dialog = $('#confirm-dialog');
  $('#confirm-title').textContent = title;
  $('#confirm-description').textContent = description;
  dialog.returnValue = 'cancel';
  dialog.showModal();
  return new Promise(resolve => dialog.addEventListener('close', () => resolve(dialog.returnValue === 'confirm'), { once: true }));
}

function clearDrag() {
  dragId = null;
  $('#board').querySelector('.drop-preview')?.remove();
  document.querySelectorAll('.dragging, .drop-target').forEach(el => el.classList.remove('dragging', 'drop-target'));
  document.body.classList.remove('is-dragging');
}

function previewTarget(target) {
  $('#board').querySelector('.drop-preview')?.remove();
  $('#return-zone').classList.remove('drop-target');
  if (target?.closest('#return-zone')) { $('#return-zone').classList.add('drop-target'); return; }
  const slot = target?.closest('[data-room][data-time]');
  if (!slot || !dragId) return;
  const result = candidate(dragId, slot.dataset.time, slot.dataset.room);
  const preview = document.createElement('div');
  preview.className = `drop-preview ${result.issues.length ? 'invalid' : ''}`;
  const p = result.placements?.find(p => p.id === dragId);
  preview.style.cssText = cellStyle(slot.dataset.time, p?.rooms || [slot.dataset.room], talkById(dragId)?.duration);
  preview.textContent = result.issues[0]?.message || `${slot.dataset.time} · ${p.rooms.join(' + ')}`;
  $('#board').append(preview);
}

function dropAt(target, id) {
  if (target?.closest('#return-zone')) removeTalk(id);
  else {
    const slot = target?.closest('[data-room][data-time]');
    if (slot) placeAt(id, slot.dataset.time, slot.dataset.room);
  }
  clearDrag();
}

function bindEvents() {
  $('#search').addEventListener('input', renderLibrary);
  $('#category').addEventListener('change', renderLibrary);
  $('#format').addEventListener('change', renderLibrary);
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    renderLibrary();
  }));
  document.querySelectorAll('[data-day]').forEach(button => button.addEventListener('click', () => {
    day = button.dataset.day;
    document.querySelectorAll('[data-day]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    renderBoard();
  }));
  document.addEventListener('click', event => {
    const edit = event.target.closest('[data-edit]');
    const select = event.target.closest('[data-select]');
    const slot = event.target.closest('.slot');
    if (edit) openPlacement(edit.dataset.edit);
    else if (select) selectTalk(select.dataset.select);
    else if (slot && selectedId) placeAt(selectedId, slot.dataset.time, slot.dataset.room);
  });
  document.addEventListener('dragstart', event => {
    const card = event.target.closest('[data-talk]');
    if (!card) return;
    dragId = card.dataset.talk;
    event.dataTransfer.setData('text/plain', dragId);
    event.dataTransfer.effectAllowed = 'move';
    card.classList.add('dragging');
    document.body.classList.add('is-dragging');
  });
  document.addEventListener('dragover', event => {
    if (!dragId || !event.target.closest('#board, #return-zone')) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    previewTarget(event.target);
  });
  document.addEventListener('drop', event => {
    if (!dragId) return;
    event.preventDefault();
    dropAt(event.target, dragId);
  });
  document.addEventListener('dragend', clearDrag);
  // Touch uses the grip; desktop can drag the entire card with native DnD.
  document.addEventListener('pointerdown', event => {
    const grip = event.target.closest('[data-drag-handle]');
    if (!grip || event.pointerType === 'mouse') return;
    touchDrag = { id: grip.dataset.dragHandle, x: event.clientX, y: event.clientY, pointer: event.pointerId, grip, started: false };
    grip.setPointerCapture(event.pointerId);
  });
  document.addEventListener('pointermove', event => {
    if (!touchDrag || touchDrag.pointer !== event.pointerId) return;
    if (!touchDrag.started && Math.hypot(event.clientX - touchDrag.x, event.clientY - touchDrag.y) < 8) return;
    touchDrag.started = true;
    dragId = touchDrag.id;
    document.body.classList.add('is-dragging');
    previewTarget(document.elementFromPoint(event.clientX, event.clientY));
  });
  document.addEventListener('pointerup', event => {
    if (!touchDrag || touchDrag.pointer !== event.pointerId) return;
    const started = touchDrag.started;
    const id = touchDrag.id;
    touchDrag = null;
    if (started) {
      const suppressClick = click => { click.preventDefault(); click.stopPropagation(); };
      document.addEventListener('click', suppressClick, { once: true, capture: true });
      setTimeout(() => document.removeEventListener('click', suppressClick, true), 0);
      dropAt(document.elementFromPoint(event.clientX, event.clientY), id);
    }
  });
  document.addEventListener('pointercancel', () => { if (touchDrag) { touchDrag = null; clearDrag(); } });
  document.addEventListener('keydown', event => {
    if (event.target.closest('input, select, textarea, dialog')) return;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') { event.preventDefault(); history(event.shiftKey ? 'redo' : 'undo'); }
    if (event.key === 'Escape') { selectedId = null; render(); }
  });
  $('#undo').addEventListener('click', () => history('undo'));
  $('#redo').addEventListener('click', () => history('redo'));
  $('#show-issues').addEventListener('click', () => { $('#issues').hidden = !$('#issues').hidden; $('#show-issues').setAttribute('aria-expanded', String(!$('#issues').hidden)); });
  $('#return-zone').addEventListener('click', () => { if (selectedId) removeTalk(selectedId); });
  $('#return-zone').addEventListener('keydown', event => { if (['Enter', ' '].includes(event.key) && selectedId) { event.preventDefault(); removeTalk(selectedId); } });
  $('#placement-day').addEventListener('change', updateDialogTimes);
  $('#close-placement').addEventListener('click', () => $('#placement-dialog').close());
  $('#unplace').addEventListener('click', () => { removeTalk(dialogId); $('#placement-dialog').close(); });
  $('#placement-form').addEventListener('submit', event => {
    event.preventDefault();
    const rooms = [...document.querySelectorAll('#placement-rooms input:checked')].map(input => input.value);
    if (!rooms.length) { $('#placement-error').textContent = 'Choisissez au moins une salle.'; return; }
    const result = proposePlacement(placements, dialogId, $('#placement-day').value, $('#placement-time').value, rooms, data);
    if (result.issues.length) { $('#placement-error').textContent = result.issues[0].message; return; }
    commit(result.placements, 'Placement enregistré.');
    $('#placement-dialog').close();
  });
  $('#new-planning').addEventListener('click', async () => {
    if (await confirm('Vider le planning ?', 'Les talks retourneront dans la réserve. Vous pourrez annuler cette action.')) commit([], 'Planning vidé. Les talks sont prêts à être placés.');
  });
  $('#import').addEventListener('click', () => $('#import-file').click());
  $('#import-file').addEventListener('change', async event => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const next = parsePlanning(JSON.parse(await file.text()));
      if (await confirm('Importer ce planning ?', `${next.length} placements remplaceront votre brouillon. Vous pourrez annuler cette action.`)) commit(next, `Planning importé : ${next.length} placements.`);
    } catch (error) { notify(`Import impossible : ${error.message}`); }
    finally { event.target.value = ''; }
  });
  $('#export').addEventListener('click', () => {
    if (validatePlacements(placements, data).length) return;
    const url = URL.createObjectURL(new Blob([JSON.stringify(exportPlanning(placements, data), null, 2) + '\n'], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url; link.download = 'planning.json'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify('Planning exporté. Remplacez src/data/source/planning.json avec ce fichier, puis lancez task data.');
  });
}

async function init() {
  try {
    const response = await fetch('/data');
    if (!response.ok) throw new Error(await response.text());
    data = await response.json();
    storageKey = `touraine-tech-planning:${data.edition}:${data.fingerprint}`;
    placements = parsePlanning(data.planning);
    let restored = false;
    try {
      const draft = localStorage.getItem(storageKey);
      if (draft) { placements = parsePlanning(JSON.parse(draft)); restored = true; }
    } catch { notify('Le brouillon est indisponible. Le planning du repo a été chargé.'); }
    [...new Set(data.talks.map(t => t.category))].sort().forEach((category, i) => {
      categoryColors.set(category, colors[i % colors.length]);
      $('#category').insertAdjacentHTML('beforeend', `<option value="${escape(category)}">${escape(category)}</option>`);
    });
    [...new Set(data.talks.map(t => t.format).filter(Boolean))].sort().forEach(format => $('#format').insertAdjacentHTML('beforeend', `<option value="${escape(format)}">${escape(format)}</option>`));
    $('#edition').textContent = `Données ${data.edition}`;
    $('#workspace').setAttribute('aria-busy', 'false');
    bindEvents(); render(); save();
    if (restored) notify('Votre brouillon a été restauré.');
  } catch (error) {
    $('#workspace').setAttribute('aria-busy', 'false');
    $('#board').innerHTML = `<div class="load-error"><h2>Impossible d’ouvrir le planning</h2><p>${escape(error.message)}</p><button class="button primary" id="retry">Réessayer</button></div>`;
    $('#progress').textContent = 'Données indisponibles';
    $('#export').disabled = true;
    $('#import').disabled = true;
    $('#retry').addEventListener('click', () => location.reload());
  }
}

init();
