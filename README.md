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

## Déploiement

- **Live (`touraine.tech`)** → Netlify (Deploy Previews par PR + la fonction newsletter). Config : `netlify.toml`.
- **CI** → GitHub Actions (`.github/workflows/ci.yml`) : un simple `task check` sur les PR (le build est couvert par Netlify).

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
