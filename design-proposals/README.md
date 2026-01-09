# Propositions de Design - Touraine Tech 2026

Design choisi : **Elegant Glass** avec plusieurs variantes selon le mode du site.

## Comment visualiser

Ouvre simplement les fichiers HTML dans ton navigateur :

```bash
# Design choisi - Elegant Glass (5 variantes)
open design-proposals/01b-elegant-glass-light.html      # Light + Billetterie
open design-proposals/01c-elegant-glass-light-cfp.html  # Light + CFP + Billetterie
open design-proposals/01d-elegant-glass-dark.html       # Dark + Billetterie
open design-proposals/01e-elegant-glass-dark-cfp.html   # Dark + CFP + Billetterie

# Autres propositions (pour reference)
open design-proposals/01-elegant-glass.html             # Dark original
open design-proposals/02-bold-geometric.html
open design-proposals/03-minimal-modern.html
```

Ou avec un serveur local :
```bash
npx serve design-proposals
```

---

## Les 4 modes du site

Le site a 4 modes selon le cycle de l'evenement :

| Mode | CFP | Billetterie | Fichiers |
|------|-----|-------------|----------|
| **CFP only** | Ouvert | Ferme | `01c` ou `01e` (sans billetterie) |
| **CFP + Billetterie** | Ouvert | Ouverte | `01c-*-cfp.html` / `01e-*-cfp.html` |
| **Billetterie** | Ferme | Ouverte | `01b-*-light.html` / `01d-*-dark.html` |
| **Billetterie + Programme** | Ferme | Ouverte | Meme + lien programme |

---

## Design choisi : Elegant Glass

### Variantes disponibles

#### Light (fond clair)

| Fichier | Mode | Description |
|---------|------|-------------|
| `01b-elegant-glass-light.html` | Billetterie | Fond blanc, glass morphism doux, CTAs turquoise |
| `01c-elegant-glass-light-cfp.html` | CFP + Billetterie | Idem + section CFP, deux CTAs egaux |

#### Dark (fond sombre)

| Fichier | Mode | Description |
|---------|------|-------------|
| `01d-elegant-glass-dark.html` | Billetterie | Fond bleu nuit, orbes ambiantes, glow effects |
| `01e-elegant-glass-dark-cfp.html` | CFP + Billetterie | Idem + section CFP, deux CTAs egaux |

### Caracteristiques communes

- **Navigation sticky** avec blur au scroll
- **Bandeau Date/Lieu** tres visible en haut
- **Hero** avec card billetterie ou CFP selon le mode
- **Section "Devenez Sponsor"** prominente avec avantages
- **Temoignages** de participants/speakers
- **Galerie photos** de l'edition precedente
- **Categories de talks** visuelles
- **Stats** (50+ talks, 800 participants, 60 speakers)
- **Newsletter** avec formulaire
- **Footer** complet

### Palette de couleurs

```css
/* Couleurs Touraine Tech */
--primary: #222333;    /* Bleu nuit */
--secondary: #6ABFAD;  /* Turquoise */

/* Light theme */
--bg-primary: #FFFFFF;
--bg-secondary: #F8FAFB;
--text-primary: #1C1D21;

/* Dark theme */
--bg-primary: #0f1019;
--text-primary: #ffffff;
```

---

## Autres propositions (reference)

### Bold Geometric (`02-bold-geometric.html`)
Formes geometriques audacieuses, contraste fort, style brutalist-lite.

### Minimal Modern (`03-minimal-modern.html`)
Elegance epuree, whitespace genereux, typographie raffinee.

---

## Prochaines etapes

1. **Valider** le design light ou dark comme base
2. **Migration Astro** avec composants reutilisables
3. **Integration** des vraies donnees (speakers, sponsors, photos Flickr)
