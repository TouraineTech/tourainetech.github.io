import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { createCatalog } from './model.mjs';

const directory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(directory, '../..');
const read = filename => JSON.parse(fs.readFileSync(path.join(root, 'src/data', filename), 'utf8'));

export function loadEditorData() {
  const data = {
    talks: createCatalog(read('source/conferenceHall.raw.json'), read('source/keynotes.json'), read('source/overrides.json')),
    planning: read('source/planning.json'), rooms: read('config/rooms.json'),
    times: read('config/times.json'), breaks: read('config/breaks.json'), edition: read('source/edition.json').year,
  };
  data.fingerprint = createHash('sha256').update(JSON.stringify(data)).digest('hex').slice(0, 16);
  return data;
}

const assets = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/app.mjs': ['app.mjs', 'text/javascript; charset=utf-8'],
  '/model.mjs': ['model.mjs', 'text/javascript; charset=utf-8'],
  '/styles.css': ['styles.css', 'text/css; charset=utf-8'],
  '/logo.svg': [path.join(root, 'public/img/logo.svg'), 'image/svg+xml'],
};

export function createEditorServer() {
  return http.createServer((request, response) => {
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; connect-src 'self'; object-src 'none'; frame-ancestors 'none'");
    if (!/^(127\.0\.0\.1|localhost)(:\d+)?$/.test(request.headers.host || '')) { response.writeHead(403).end(); return; }
    if (request.method !== 'GET') { response.writeHead(405).end(); return; }
    const pathname = new URL(request.url, 'http://localhost').pathname;
    try {
      if (pathname === '/data') {
        response.setHeader('Content-Type', 'application/json; charset=utf-8');
        response.end(JSON.stringify(loadEditorData()));
        return;
      }
      const asset = assets[pathname];
      if (!asset) { response.writeHead(404).end('Page introuvable'); return; }
      response.setHeader('Content-Type', asset[1]);
      response.end(fs.readFileSync(path.resolve(directory, asset[0])));
    } catch (error) {
      console.error(error.message);
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Impossible de charger les données. Vérifiez les fichiers source dans le repo.');
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PLANNING_PORT || 4322);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PLANNING_PORT doit être un port entre 1 et 65535.');
  const server = createEditorServer();
  server.on('error', error => {
    console.error(error.code === 'EADDRINUSE' ? `Le port ${port} est occupé. Lancez avec PLANNING_PORT=4323 pour en utiliser un autre.` : error.message);
    process.exitCode = 1;
  });
  server.listen(port, '127.0.0.1', () => console.log(`Éditeur de planning : http://127.0.0.1:${port}\nLes sources restent intactes. Exportez le planning depuis l'application.`));
}
