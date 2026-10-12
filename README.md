# Touraine Tech Website

Site de la conférence [Touraine Tech](https://touraine.tech), en **Astro 5**.

## Prérequis

Recommandé — [mise](https://mise.jdx.dev) installe les bons outils d'un coup :

```sh
mise trust && mise install   # Node 22, pnpm, Task (voir mise.toml)
```

Sinon, manuellement : Node.js 24, [pnpm](https://pnpm.io), [Task](https://taskfile.dev) (`brew install go-task/tap/go-task`).

## Développement

Les commandes passent par le **Taskfile** (`task --list` pour la liste) :

| Commande | Description |
|---|---|
| `task dev` | Serveur de développement |
| `task build` | Build de production (régénère les données puis `astro build`) |
| `task check` | Typecheck (`astro check`) — aussi lancé en CI |
| `task data` | Régénère les données planning + timer depuis les sources |
| `task planning` | Lance l'éditeur local du planning avec glisser-déposer |

Installer les dépendances : `pnpm install`.

## Cycle de vie du site

Le site est piloté par une **phase** dans `src/data/config/site.ts` :
`intro → sponsoring → cfp → ticketing → programme → post-event`,
plus des toggles indépendants (`isCfpOpen`, `isTicketingOpen`, `isSponsoringOpen`).
La phase pilote le hero et l'ordre éditorial de la home.

## Données (Conference Hall)

1. Récupérer l'API key sur `https://conference-hall.io/organizer/event/${ID}/edit/integrations` (activer l'API HTTP).
2. `API_KEYS=${KEY} pnpm run planning:fetch` (télécharge les données brutes).
3. `task data` (génère `conferenceHall.json`, `schedule.json`, les fichiers timer, etc.).

Les sorties atterrissent dans `src/data/generated` et `public/timer`.

### Préparer le planning

`task planning` (ou `pnpm planning:edit`) lance l'éditeur sur `http://127.0.0.1:4322`.
Il charge les talks acceptés ou confirmés de Conference Hall, les keynotes et les
placements de `src/data/source/planning.json`. L'édition affichée correspond à
`src/data/source/edition.json` ; les données actuelles sont celles de 2026.

Glisser un talk de la liste vers une salle pour le placer, déplacer une carte dans
la grille ou la déposer dans la réserve pour la retirer. Le bouton de déplacement
ouvre aussi un formulaire pour choisir le jour, l'heure et plusieurs salles
adjacentes. Sur écran tactile, utiliser la poignée de la carte pour la faire glisser.
Les conflits de salles, d'intervenants et de pauses bloquent le placement et l'export.

Le brouillon est enregistré dans le navigateur et restauré au prochain lancement
avec les mêmes données source. L'éditeur ne modifie pas les fichiers du repo.
Utiliser **Exporter le planning**, remplacer `src/data/source/planning.json` par
le fichier téléchargé, puis lancer `task data`. Un planning incomplet peut être
exporté pour reprendre le travail plus tard ; **Importer** permet de le recharger.

Les salles, horaires et pauses restent configurés dans `src/data/config/rooms.json`,
`times.json` et `breaks.json`. Relancer l'éditeur après une modification des sources
pour charger ces changements. Si le port est occupé, utiliser
`PLANNING_PORT=4323 pnpm planning:edit`.

## Déploiement

- **Live (`touraine.tech`)** → Netlify (Deploy Previews par PR). Config : `netlify.toml`.
- **CI** → GitHub Actions (`.github/workflows/ci.yml`) : un simple `task check` sur les PR (le build est couvert par Netlify).

### Newsletter

Le formulaire HTML Brevo est intégré dans `src/components/home/NewsletterSection.astro`, avec le style du site. Les inscriptions sont envoyées directement à Brevo avec le consentement, le champ piège et reCAPTCHA v3 ; aucune fonction Netlify ni clé API Brevo n’est nécessaire.

Le double opt-in, les messages et les redirections se configurent dans Brevo. Si le formulaire change, reprendre son URL et sa clé publique reCAPTCHA depuis le code d’intégration fourni par Brevo. Conserver les identifiants et classes `sib-*` utilisés par son script de validation.

### Archiver une édition

En fin d'édition, on fige le site sur `<year>.touraine.tech` (repo dédié, GitHub Pages) et on redirige les anciennes URLs :

```sh
# 1. Publier le snapshot figé sur le repo d'archive
task archive YEAR=2026

# 2. Générer les redirections (touraine.tech/talk/* -> 2026.touraine.tech/talk/*)
task redirects YEAR=2026
# puis committer public/_redirects sur le site live et déployer
```

`task archive` accepte aussi `ARCHIVE_REPO` et `ARCHIVE_DOMAIN` si la convention diffère.
