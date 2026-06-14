# Documentation Technique
## TOCHE & FILS International Trade Co., LTD — Site Vitrine + Backoffice

**Version :** 1.1  
**Date :** 2026-06-12  
**Client :** Franklin Kuate — TOCHE & FILS International Trade Co., LTD

---

## 1. Stack technologique recommandée

### 1.1 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────┐
│                     FRONT-OFFICE                        │
│              Next.js 14+ (App Router)                   │
│         React 18 · TypeScript · Tailwind CSS            │
└──────────────────────┬──────────────────────────────────┘
                       │ API REST / Server Actions
┌──────────────────────▼──────────────────────────────────┐
│                    BACK-OFFICE                          │
│           Next.js Admin (same monorepo)                 │
│         NextAuth.js · React Hook Form · Zustand         │
└──────────────────────┬──────────────────────────────────┘
                       │ Prisma ORM
┌──────────────────────▼──────────────────────────────────┐
│                     BASE DE DONNÉES                     │
│                      PostgreSQL                         │
│          (hébergement à définir par le client)          │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                     SERVICES TIERS                      │
│  Cloudinary (médias) · Resend (emails) · Vercel (héb.)  │
└─────────────────────────────────────────────────────────┘
```

### 1.2 Justification des choix

| Technologie | Rôle | Justification |
|---|---|---|
| **Next.js 14** | Framework full-stack | SSR/SSG natif (SEO), API Routes intégrées, déploiement Vercel simple |
| **TypeScript** | Langage | Sécurité de typage, maintenabilité long terme |
| **Tailwind CSS** | Styles | Développement rapide, responsive sans sur-ingénierie |
| **Prisma ORM** | Accès BDD | Schéma typé, migrations versionnées, requêtes sûres |
| **PostgreSQL** | Base de données | Robuste, open-source, compatible tout hébergeur (Railway, Neon, VPS, etc.) |
| **NextAuth.js** | Authentification | Intégration native Next.js, sessions sécurisées |
| **Cloudinary** | Stockage médias | Upload, resize, optimisation automatique des images |
| **Resend** | Emails transactionnels | API simple, deliverability élevée, tier gratuit suffisant |
| **Vercel** | Hébergement | Déploiement 0-config pour Next.js, CDN mondial, SSL auto |
| **next-intl** | Internationalisation | i18n FR/EN/ES/ZH avec routing par locale |

> **Note BDD :** Le choix du fournisseur PostgreSQL est laissé au client. Options compatibles : Railway, Neon, Render, un VPS (Ubuntu + PostgreSQL), ou tout autre hébergeur PostgreSQL standard. Prisma s'adapte à n'importe lequel via la `DATABASE_URL`.

---

## 2. Architecture du projet

### 2.1 Structure des dossiers (monorepo)

```
toche-fils/
├── src/
│   ├── app/
│   │   ├── [locale]/               # Routes publiques (fr / en / es / zh)
│   │   │   ├── page.tsx            # Accueil
│   │   │   ├── about/page.tsx
│   │   │   ├── services/page.tsx
│   │   │   ├── catalog/
│   │   │   │   ├── page.tsx        # Liste catalogue
│   │   │   │   └── [slug]/page.tsx # Fiche produit
│   │   │   ├── contact/page.tsx
│   │   │   └── quote/page.tsx
│   │   ├── admin/                  # Routes backoffice (protégées)
│   │   │   ├── layout.tsx          # Layout admin (sidebar)
│   │   │   ├── page.tsx            # Dashboard
│   │   │   ├── products/
│   │   │   │   ├── page.tsx        # Liste produits
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/page.tsx   # Édition produit
│   │   │   ├── categories/page.tsx
│   │   │   ├── quotes/page.tsx
│   │   │   ├── messages/page.tsx
│   │   │   ├── pages/page.tsx
│   │   │   ├── media/page.tsx
│   │   │   ├── invoices/           # Facturation
│   │   │   │   ├── page.tsx        # Liste factures
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── templates/page.tsx
│   │   │   ├── accounting/         # Module comptable
│   │   │   │   ├── page.tsx        # Tableau de bord comptable
│   │   │   │   ├── sales/page.tsx
│   │   │   │   ├── expenses/page.tsx
│   │   │   │   ├── credits/page.tsx
│   │   │   │   └── goals/page.tsx
│   │   │   ├── users/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── api/
│   │       ├── auth/[...nextauth]/  # NextAuth endpoints
│   │       ├── products/
│   │       ├── categories/
│   │       ├── quotes/
│   │       ├── messages/
│   │       ├── invoices/
│   │       ├── accounting/
│   │       └── upload/
│   ├── components/
│   │   ├── ui/                     # Composants atomiques (Button, Input…)
│   │   ├── front/                  # Composants vitrine
│   │   └── admin/                  # Composants backoffice
│   ├── lib/
│   │   ├── prisma.ts               # Client Prisma singleton
│   │   ├── auth.ts                 # Config NextAuth
│   │   ├── cloudinary.ts           # Helper upload
│   │   ├── email.ts                # Helper Resend
│   │   ├── pdf.ts                  # Génération PDF factures (react-pdf)
│   │   └── validations.ts          # Schémas Zod
│   ├── messages/
│   │   ├── fr.json                 # Traductions françaises
│   │   ├── en.json                 # Traductions anglaises
│   │   ├── es.json                 # Traductions espagnoles
│   │   └── zh.json                 # Traductions chinoises
│   └── types/
│       └── index.ts
├── prisma/
│   ├── schema.prisma               # Schéma BDD
│   └── migrations/
├── public/
│   ├── images/                     # Assets statiques
│   └── locales/
├── .env.local                      # Variables d'environnement
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 3. Modèle de données (schéma Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Utilisateurs & Rôles (backoffice) ──────────────────

model User {
  id           String        @id @default(cuid())
  name         String
  email        String        @unique
  password     String        // bcrypt hash
  roleId       String
  role         UserRole      @relation(fields: [roleId], references: [id])
  active       Boolean       @default(true)
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  invoices     Invoice[]
  transactions Transaction[]
}

model UserRole {
  id          String           @id @default(cuid())
  name        String           @unique  // ex: "admin", "editor", "accountant"
  permissions RolePermission[]
  users       User[]
}

model RolePermission {
  id       String   @id @default(cuid())
  roleId   String
  role     UserRole @relation(fields: [roleId], references: [id], onDelete: Cascade)
  module   String   // ex: "catalog", "invoices", "accounting", "users", "settings"
  canRead  Boolean  @default(true)
  canWrite Boolean  @default(false)
  canDelete Boolean @default(false)
}

// ─── Catalogue ──────────────────────────────────────────

model Category {
  id        String    @id @default(cuid())
  name      String    @unique
  slug      String    @unique
  order     Int       @default(0)
  products  Product[]
  createdAt DateTime  @default(now())
}

model Product {
  id             String          @id @default(cuid())
  name           String
  slug           String          @unique
  brand          String
  model          String
  description    String?         @db.Text
  descriptionEn  String?         @db.Text
  descriptionEs  String?         @db.Text
  descriptionZh  String?         @db.Text
  categoryId     String
  category       Category        @relation(fields: [categoryId], references: [id])
  specs          ProductSpec[]
  images         ProductImage[]
  featured       Boolean         @default(false)
  status         ProductStatus   @default(ACTIVE)
  quotes         QuoteRequest[]
  invoiceItems   InvoiceItem[]
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
}

enum ProductStatus {
  ACTIVE
  ARCHIVED
}

model ProductSpec {
  id        String  @id @default(cuid())
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  key       String
  value     String
  order     Int     @default(0)
}

model ProductImage {
  id        String  @id @default(cuid())
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  url       String  // URL Cloudinary
  publicId  String  // Cloudinary public_id
  alt       String?
  order     Int     @default(0)
}

// ─── Demandes & Contacts ────────────────────────────────

model QuoteRequest {
  id          String        @id @default(cuid())
  fullName    String
  email       String
  phone       String?
  country     String
  productId   String?
  product     Product?      @relation(fields: [productId], references: [id])
  productName String?
  quantity    Int?
  message     String?       @db.Text
  status      RequestStatus @default(NEW)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model ContactMessage {
  id        String        @id @default(cuid())
  fullName  String
  email     String
  phone     String?
  subject   String?
  message   String        @db.Text
  status    RequestStatus @default(NEW)
  createdAt DateTime      @default(now())
}

enum RequestStatus {
  NEW
  IN_PROGRESS
  DONE
}

// ─── Facturation ─────────────────────────────────────────

model InvoiceTemplate {
  id        String    @id @default(cuid())
  name      String    @unique  // ex: "Standard", "Export", "Proforma"
  config    Json      // champs, mise en page, couleurs, logo — entièrement flexible
  invoices  Invoice[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Invoice {
  id           String          @id @default(cuid())
  number       String          @unique  // ex: "FAC-2026-0001"
  templateId   String
  template     InvoiceTemplate @relation(fields: [templateId], references: [id])
  issuedById   String
  issuedBy     User            @relation(fields: [issuedById], references: [id])
  clientName   String
  clientEmail  String?
  clientPhone  String?
  clientAddr   String?
  items        InvoiceItem[]
  currency     String          @default("XAF")  // FCFA, USD, EUR, CNY
  taxRate      Float           @default(0)
  discount     Float           @default(0)
  notes        String?         @db.Text
  status       InvoiceStatus   @default(DRAFT)
  pdfUrl       String?         // URL Cloudinary du PDF généré
  issuedAt     DateTime        @default(now())
  dueAt        DateTime?
  createdAt    DateTime        @default(now())
  updatedAt    DateTime        @updatedAt
}

model InvoiceItem {
  id          String   @id @default(cuid())
  invoiceId   String
  invoice     Invoice  @relation(fields: [invoiceId], references: [id], onDelete: Cascade)
  productId   String?
  product     Product? @relation(fields: [productId], references: [id])
  description String
  quantity    Float
  unitPrice   Float
  unit        String?  // ex: "unité", "lot", "conteneur"
}

enum InvoiceStatus {
  DRAFT
  SENT
  PAID
  CANCELLED
}

// ─── Comptabilité ────────────────────────────────────────

model Transaction {
  id          String          @id @default(cuid())
  type        TransactionType
  category    String          // ex: "Vente engin", "Cargo", "Salaire", "Loyer"
  amount      Float
  currency    String          @default("XAF")
  description String?         @db.Text
  date        DateTime
  reference   String?         // N° facture ou ref externe
  createdById String
  createdBy   User            @relation(fields: [createdById], references: [id])
  creditId    String?
  credit      Credit?         @relation(fields: [creditId], references: [id])
  createdAt   DateTime        @default(now())
}

enum TransactionType {
  INCOME    // Vente
  EXPENSE   // Dépense
}

model Credit {
  id           String        @id @default(cuid())
  clientName   String
  clientPhone  String?
  amount       Float
  currency     String        @default("XAF")
  description  String?       @db.Text
  status       CreditStatus  @default(PENDING)
  dueDate      DateTime?
  transactions Transaction[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

enum CreditStatus {
  PENDING
  PARTIAL
  REPAID
}

model Goal {
  id          String     @id @default(cuid())
  title       String
  targetAmount Float
  currency    String     @default("XAF")
  startDate   DateTime
  endDate     DateTime
  type        GoalType
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

enum GoalType {
  REVENUE   // Objectif de chiffre d'affaires
  SALES     // Objectif nombre de ventes
  CUSTOM
}

// ─── Contenu statique des pages ─────────────────────────

model PageContent {
  id        String   @id @default(cuid())
  pageKey   String
  locale    String   @default("fr")  // fr, en, es, zh
  title     String?
  body      String?  @db.Text
  updatedAt DateTime @updatedAt

  @@unique([pageKey, locale])
}

// ─── Paramètres globaux ──────────────────────────────────

model SiteSetting {
  id    String @id @default(cuid())
  key   String @unique
  value String
}
```

---

## 4. API Routes

### 4.1 Endpoints publics

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/products` | Liste paginée des produits actifs, filtres: `categorySlug`, `featured`, `search` |
| GET | `/api/products/[slug]` | Détail d'un produit |
| GET | `/api/categories` | Liste des catégories |
| POST | `/api/quotes` | Soumettre une demande de devis |
| POST | `/api/messages` | Soumettre un message de contact |

### 4.2 Endpoints admin (authentifiés)

| Méthode | Route | Description |
|---|---|---|
| GET/POST | `/api/admin/products` | Lister / créer un produit |
| GET/PUT/DELETE | `/api/admin/products/[id]` | Lire / modifier / supprimer |
| POST | `/api/admin/upload` | Upload image vers Cloudinary |
| GET/PUT | `/api/admin/quotes/[id]` | Voir / changer le statut d'une demande |
| GET | `/api/admin/quotes/export` | Export CSV |
| GET/PUT | `/api/admin/messages/[id]` | Voir / changer le statut d'un message |
| GET/POST | `/api/admin/invoices` | Lister / créer une facture |
| GET/PUT/DELETE | `/api/admin/invoices/[id]` | Gérer une facture |
| POST | `/api/admin/invoices/[id]/pdf` | Générer le PDF d'une facture |
| GET/POST | `/api/admin/invoices/templates` | Gérer les modèles de facture |
| GET/POST | `/api/admin/accounting/transactions` | Lister / créer une transaction |
| GET | `/api/admin/accounting/report` | Rapport bénéfices/pertes (filtres: période, catégorie) |
| GET/POST | `/api/admin/accounting/credits` | Gérer les crédits/remboursements |
| GET/POST | `/api/admin/accounting/goals` | Gérer les objectifs |
| GET/PUT | `/api/admin/settings` | Lire / modifier les paramètres |
| GET/POST | `/api/admin/users` | Gérer les utilisateurs (admin only) |
| GET/POST | `/api/admin/roles` | Gérer les rôles et permissions (admin only) |

---

## 5. Authentification & Sécurité

### 5.1 Authentification
- **Provider :** Credentials (email + mot de passe haché bcrypt, rounds = 12)
- **Session :** JWT (stateless), durée 8h, refresh à chaque navigation
- **Protection des routes admin :** Middleware Next.js (`middleware.ts`) vérifie le token JWT sur `/admin/*` et `/api/admin/*`
- **Contrôle d'accès par module :** Le middleware vérifie les permissions du rôle de l'utilisateur (`RolePermission`) avant d'autoriser l'accès à chaque module
- **CSRF :** Géré nativement par NextAuth

### 5.2 Sécurité générale

| Mesure | Implémentation |
|---|---|
| Validation des entrées | Zod sur tous les endpoints (body + query params) |
| Rate limiting | Middleware custom sur les routes formulaires publics |
| Sanitisation HTML | DOMPurify côté serveur pour les champs texte riches |
| Uploads | Validation MIME type + taille (max 5 Mo) avant envoi à Cloudinary |
| Variables sensibles | `.env.local` — jamais commitées |
| Headers HTTP | `next-safe-headers` (CSP, X-Frame-Options, HSTS) |
| HTTPS | Forcé via Vercel |

---

## 6. Gestion des médias (Cloudinary)

```
Upload flow :
1. Admin sélectionne image(s) dans le backoffice
2. Fichier envoyé à /api/admin/upload (authentifié)
3. Serveur valide type (image/jpeg, image/png, image/webp) et taille
4. Upload vers Cloudinary avec transformation auto :
   - Resize max 1920px largeur
   - Format WebP
   - Qualité auto
5. Cloudinary retourne url + public_id
6. url & public_id stockés en base (ProductImage)

Suppression :
- Lors de la suppression d'une image produit → appel Cloudinary destroy(public_id)
```

---

## 7. Internationalisation (i18n)

- **Bibliothèque :** `next-intl`
- **Locales supportées :** `fr` (défaut), `en`, `es`, `zh`
- **Routing :** `/fr/...`, `/en/...`, `/es/...`, `/zh/...` (préfixe locale dans l'URL)
- **Fichiers de traduction :** `src/messages/{fr,en,es,zh}.json`
- **Contenu dynamique :** Les produits ont des colonnes de description par locale (`description`, `descriptionEn`, `descriptionEs`, `descriptionZh`) — la description française sert de fallback si les autres ne sont pas renseignées
- **Interface backoffice :** Français uniquement (V1)

---

## 8. Module Facturation

- **Génération PDF :** `@react-pdf/renderer` — rendu côté serveur, stockage du PDF sur Cloudinary
- **Modèles de facture :** Entièrement configurables via un objet JSON (`config`) — champs affichés, couleurs, logo, mentions légales
- **Numérotation automatique :** Format `FAC-{ANNÉE}-{SÉQUENCE}` (ex: `FAC-2026-0001`)
- **Devises :** XAF (FCFA), USD, EUR, CNY — sélectionnable par facture
- **Export :** PDF téléchargeable + envoi par email via Resend

---

## 9. Module Comptabilité

| Sous-module | Fonctionnalités |
|---|---|
| **Transactions** | Saisie manuelle des ventes (revenus) et dépenses, catégorisées librement, avec date et référence optionnelle |
| **Rapports** | Bilan bénéfices/pertes sur période choisie, ventilé par catégorie, exportable CSV/PDF |
| **Crédits & remboursements** | Enregistrement des créances clients, suivi du statut (en attente / partiel / remboursé), lien avec les transactions de remboursement |
| **Objectifs** | Définition d'objectifs chiffrés (CA, nombre de ventes) avec période, visualisation de l'avancement (barre de progression + % atteint) |

---

## 10. Emails transactionnels (Resend)

| Déclencheur | Destinataire(s) | Template |
|---|---|---|
| Nouvelle demande de devis | Franklin Kuate | `quote-admin.tsx` — détail complet de la demande |
| Confirmation de devis | Demandeur | `quote-confirm.tsx` — accusé de réception + coordonnées |
| Nouveau message de contact | Franklin Kuate | `contact-admin.tsx` — détail du message |
| Envoi d'une facture | Client | `invoice.tsx` — facture en pièce jointe PDF |

Templates HTML gérés avec **React Email**.

---

## 11. Déploiement & Environnements

### 11.1 Environnements

| Env | URL | Branche Git | BDD |
|---|---|---|---|
| Développement | `localhost:3000` | `main` (local) | PostgreSQL local |
| Staging | `toche-staging.vercel.app` | `develop` | PostgreSQL staging (à définir) |
| Production | `tochefils.com` (exemple) | `main` | PostgreSQL production (à définir) |

### 11.2 Variables d'environnement requises

```env
# Base de données PostgreSQL (tout hébergeur compatible)
DATABASE_URL=postgresql://user:password@host:5432/tochefils

# Authentification
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://...

# Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Resend (emails)
RESEND_API_KEY=...
RESEND_FROM_EMAIL=noreply@tochefils.com
ADMIN_EMAIL=franklin@gmail.com

# App
NEXT_PUBLIC_SITE_URL=https://tochefils.com
```

### 11.3 Pipeline CI/CD (GitHub Actions)

```yaml
# .github/workflows/deploy.yml (schéma)
on:
  push:
    branches: [main, develop]

jobs:
  lint-and-type-check:
    - npm run lint
    - npm run type-check

  test:
    - npm run test (Vitest + Testing Library)

  deploy:
    - Vercel CLI deploy (auto via intégration Vercel/GitHub)
    - npx prisma migrate deploy (migrations BDD)
```

---

## 12. Performance & SEO

| Optimisation | Technique |
|---|---|
| Images | `next/image` (lazy loading, formats modernes, responsive srcset) |
| Fonts | `next/font` (Google Fonts auto-hébergées) |
| SSG catalogue | Pages statiques générées à la build, revalidation ISR (toutes les 10 min) |
| Meta SEO | `generateMetadata()` Next.js par page avec titres, descriptions, OG |
| Sitemap | `next-sitemap` généré automatiquement |
| Cache API | `revalidateTag` sur modification produit en backoffice |

---

## 13. Tests

| Type | Outil | Cible |
|---|---|---|
| Unitaires | Vitest + Testing Library | Composants UI, helpers, validations Zod |
| Intégration API | Vitest + Prisma (BDD de test) | Endpoints API Routes |
| E2E | Playwright | Parcours critiques : demande devis, connexion admin, ajout produit, génération facture |

---

## 14. Estimation de charge (ordre de grandeur)

| Phase | Tâches | Durée estimée |
|---|---|---|
| **Setup** | Initialisation projet, BDD, CI/CD | 2 jours |
| **Design** | Maquettes (Figma) validées client | 3 jours |
| **Front-office** | 6 pages + composants + i18n 4 langues | 10 jours |
| **Backoffice core** | Catalogue, catégories, devis, messages, pages, médias, auth | 7 jours |
| **Module Facturation** | Configurateur modèles, éditeur, génération PDF | 4 jours |
| **Module Comptabilité** | Transactions, rapports, crédits, objectifs | 5 jours |
| **Intégrations** | Cloudinary, Resend, SEO | 2 jours |
| **Tests & QA** | Tests, corrections, Lighthouse | 3 jours |
| **Mise en prod** | Déploiement, DNS, formation client | 2 jours |
| **Total** | | **~38 jours ouvrés** |

---

## 15. Contraintes et points d'attention

- **BDD :** Le client choisit son hébergeur PostgreSQL — la `DATABASE_URL` suffit pour connecter Prisma. Options recommandées sans inactivité forcée : Railway (tier hobby ~5$/mois), Neon (tier free avec activité maintenue), ou VPS propre
- **Connexion internet client :** Franklin opère entre Cameroun et Chine — le site doit fonctionner sur connexion mobile lente (images optimisées, bundle JS minimal)
- **4 langues :** Les traductions ES et ZH devront être validées par le client ou un traducteur avant mise en production
- **Interface backoffice :** Français uniquement (V1)
- **Nom de domaine :** À acquérir par le client (`tochefils.com` ou variante) — prévoir 1 semaine avant mise en prod pour propagation DNS
- **Sauvegardes BDD :** À configurer selon l'hébergeur retenu (script pg_dump quotidien ou backup natif de la plateforme)
