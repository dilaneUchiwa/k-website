# Charte Graphique
## TOCHE & FILS International Trade Co., LTD

**Version :** 1.0 | **Date :** 2026-06-12

> Directives visuelles à transmettre au designer ou à appliquer directement en code (Tailwind CSS).

---

## 1. Identité visuelle existante

L'identité actuelle repose sur :
- Fond blanc / bleu profond
- Typographie sobre et internationale
- Carte de visite avec mappemonde bleue
- Imagerie de véhicules industriels (camions, engins de chantier)

---

## 2. Palette de couleurs

### Couleurs principales

| Rôle | Nom | Hex | Tailwind |
|---|---|---|---|
| Primaire | Bleu TOCHE | `#0A5FA8` | `blue-700` |
| Primaire foncé | Bleu marine | `#063D6E` | `blue-900` |
| Accent | Bleu ciel | `#2E9CDB` | `sky-500` |
| CTA / Bouton | Orange acier | `#E05A00` | `orange-600` |
| Fond clair | Blanc | `#FFFFFF` | `white` |
| Fond neutre | Gris très clair | `#F7F8FA` | `gray-50` |

### Couleurs secondaires / sémantiques

| Rôle | Hex | Tailwind |
|---|---|---|
| Succès | `#16A34A` | `green-600` |
| Avertissement | `#D97706` | `amber-600` |
| Erreur | `#DC2626` | `red-600` |
| Texte principal | `#1A1A2E` | `gray-900` |
| Texte secondaire | `#6B7280` | `gray-500` |
| Bordures | `#E5E7EB` | `gray-200` |

---

## 3. Typographie

### Polices recommandées (Google Fonts)

| Usage | Police | Poids | Taille indicative |
|---|---|---|---|
| Titres H1 | **Montserrat** | 700 (Bold) | 36–56px |
| Titres H2–H3 | **Montserrat** | 600 (SemiBold) | 24–32px |
| Corps de texte | **Inter** | 400 (Regular) | 16px |
| Labels / Nav | **Inter** | 500 (Medium) | 14px |
| Boutons | **Montserrat** | 600 (SemiBold) | 14–16px |

### Hiérarchie typographique (Tailwind)

```css
h1  → text-4xl md:text-5xl font-bold font-montserrat
h2  → text-2xl md:text-3xl font-semibold font-montserrat
h3  → text-xl font-semibold font-montserrat
p   → text-base font-inter text-gray-700
```

---

## 4. Composants UI clés

### Boutons

| Variante | Style |
|---|---|
| Primaire | Fond `#0A5FA8`, texte blanc, coins arrondis `rounded-lg`, hover fond `#063D6E` |
| CTA principal | Fond `#E05A00`, texte blanc, hover fond `#BF4D00` |
| Secondaire | Bordure `#0A5FA8`, texte `#0A5FA8`, fond transparent, hover fond bleu clair |
| Ghost | Fond transparent, texte gris, hover fond gris clair |

### Cartes produit

```
┌─────────────────────────────┐
│  (image produit — 4:3)      │
│  Badge catégorie (en haut)  │
├─────────────────────────────┤
│  Nom du produit (bold)      │
│  Marque — Modèle (gris)     │
│  [Voir détail] [Devis]      │
└─────────────────────────────┘
Ombre: shadow-md, hover: shadow-xl + légère translation Y
Coins: rounded-xl
```

### Navigation

- Header : fond blanc, ombre légère `shadow-sm`, sticky en haut
- Lien actif : couleur primaire `#0A5FA8` + soulignement
- Mobile : menu hamburger → drawer latéral

---

## 5. Iconographie

- **Bibliothèque :** [Lucide Icons](https://lucide.dev) (cohérence, léger, compatible React)
- Taille standard : 20px dans le corps, 24px dans les titres de section
- Couleur : hérite de la couleur de texte parent ou `#0A5FA8` pour les icônes d'accentuation

---

## 6. Images & médias

| Contexte | Format | Ratio |
|---|---|---|
| Hero banner | WebP (plein écran) | 16:9 ou libre |
| Card produit (vignette) | WebP | 4:3 |
| Galerie fiche produit (principale) | WebP | 4:3 ou 16:9 |
| Miniatures galerie | WebP | 1:1 (carré) |
| Logo | SVG (vectoriel) | Libre |

Toutes les images produit sont hébergées sur **Cloudinary** et servies en WebP avec qualité automatique.

---

## 7. Espacement & grille

- **Système de grille :** 12 colonnes, gouttière 24px (desktop), 16px (mobile)
- **Container max-width :** 1280px (`max-w-7xl` Tailwind)
- **Espacement sections :** `py-16` (desktop) / `py-10` (mobile)
- **Espacement composants :** multiples de 4px (système Tailwind par défaut)

---

## 8. Ton visuel global

- **Professionnel et international** : inspire confiance dans un contexte B2B
- **Industriel mais moderne** : reflet du secteur des engins de chantier
- **Épuré** : peu de décorations superflues, focus sur le contenu et les produits
- **Mobile-first** : expérience fluide sur smartphone (cible Afrique)
