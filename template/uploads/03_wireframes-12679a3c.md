# Wireframes Textuels (Low-Fidelity)
## TOCHE & FILS International Trade Co., LTD

**Version :** 1.0 | **Date :** 2026-06-12

> Ces wireframes décrivent la structure et le positionnement des éléments UI par page. Ils servent de base pour la phase de design (Figma).

---

## Conventions

```
[ COMPOSANT ]  = Bloc / section
[btn]          = Bouton
(img)          = Image / illustration
═══            = Séparateur horizontal
│              = Séparateur vertical
```

---

## WF-01 — Page d'Accueil (Home)

```
┌──────────────────────────────────────────────────────────────┐
│  HEADER                                                       │
│  Logo TOCHE & FILS     [FR|EN]   Accueil  Services  Catalogue│
│                                  À Propos  Contact  [Devis] │
├──────────────────────────────────────────────────────────────┤
│  📞 +237 694 945 547  /  +86 18333718710  [WhatsApp]         │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   HERO BANNER                          (img: flotte camions) │
│   ┌────────────────────────────────┐                         │
│   │  TOCHE & FILS                 │                         │
│   │  International Trade Co., LTD │                         │
│   │                               │                         │
│   │  "Crossing borders and        │                         │
│   │   creating a new chapter      │                         │
│   │   in international trade"     │                         │
│   │                               │                         │
│   │  [Voir le catalogue]  [Devis] │                         │
│   └────────────────────────────────┘                         │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  NOS SERVICES (titre section)                                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ 🏗️ Vente │ │ 🚢 Cargo │ │ 💳 Pmt  │ │ 🤝 Accpt │       │
│  │ Engins   │ │ Maritime │ │Fourniss. │ │ & Achats │       │
│  │ & Mach.  │ │ & Aérien │ │          │ │          │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│  [En savoir plus sur nos services]                           │
├──────────────────────────────────────────────────────────────┤
│  PRODUITS VEDETTES (titre)                                   │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │ (img)  │ │ (img)  │ │ (img)  │ │ (img)  │ │ (img)  │   │
│  │Produit1│ │Produit2│ │Produit3│ │Produit4│ │Produit5│   │
│  │[Devis] │ │[Devis] │ │[Devis] │ │[Devis] │ │[Devis] │   │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘   │
│                    [Voir tout le catalogue]                   │
├──────────────────────────────────────────────────────────────┤
│  POURQUOI NOUS CHOISIR ?                                     │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │ 🌍 Présence       │  │ ✅ Contrôle       │                 │
│  │ Cameroun–Chine   │  │ qualité sur site  │                 │
│  └──────────────────┘  └──────────────────┘                 │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │ 🚢 Logistique    │  │ 💼 Paiement      │                 │
│  │ complète         │  │ fournisseurs      │                 │
│  └──────────────────┘  └──────────────────┘                 │
├──────────────────────────────────────────────────────────────┤
│  CTA CONTACT                                                 │
│  Vous avez un projet ? Contactez-nous dès maintenant.        │
│                    [Nous contacter]                          │
├──────────────────────────────────────────────────────────────┤
│  FOOTER                                                      │
│  Logo  │ Liens rapides  │ Contact         │ Réseaux         │
│        │ Accueil        │ 📞 +237…        │ [WhatsApp]      │
│        │ Catalogue      │ 📞 +86…         │ [Facebook]      │
│        │ Services       │ ✉️ franklin@…   │                 │
│        │ Contact        │ 📍 Guangzhou    │                 │
│  © 2026 TOCHE & FILS International Trade Co., LTD            │
└──────────────────────────────────────────────────────────────┘
```

---

## WF-02 — Page Catalogue

```
┌──────────────────────────────────────────────────────────────┐
│  HEADER (identique)                                           │
├──────────────────────────────────────────────────────────────┤
│  BREADCRUMB : Accueil > Catalogue                            │
│  Titre : Notre Catalogue d'Engins & Véhicules                │
├──────────────────────────────────────────────────────────────┤
│  FILTRES                                                     │
│  [Tous] [Camions bennes] [Tracteurs] [Chargeuses]            │
│  [Excavateurs] [Bulldozers] [Compacteurs] [Semi-remorques]   │
│                                                              │
│  🔍 [Rechercher un produit…________________]                 │
├──────────────────────────────────────────────────────────────┤
│  GRILLE PRODUITS (3 colonnes desktop / 2 tablette / 1 mobile)│
│                                                              │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐│
│  │   (img produit) │ │   (img produit) │ │   (img produit) ││
│  │─────────────────│ │─────────────────│ │─────────────────││
│  │ SINOTRUK HOWO   │ │ SHACMAN         │ │ SANY SY215C     ││
│  │ Camion Benne 8x4│ │ Dump Truck 6x4  │ │ Excavateur      ││
│  │ ★ Marque: HOWO  │ │                 │ │                 ││
│  │ [Voir détail]   │ │ [Voir détail]   │ │ [Voir détail]   ││
│  │ [Demander devis]│ │ [Demander devis]│ │ [Demander devis]││
│  └─────────────────┘ └─────────────────┘ └─────────────────┘│
│                                                              │
│  … (grille continue)                                         │
│                                                              │
│            [< Précédent]  1  2  3  [Suivant >]              │
├──────────────────────────────────────────────────────────────┤
│  FOOTER (identique)                                          │
└──────────────────────────────────────────────────────────────┘
```

---

## WF-03 — Fiche Produit

```
┌──────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
├──────────────────────────────────────────────────────────────┤
│  BREADCRUMB: Accueil > Catalogue > Camions bennes > HOWO 8x4 │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────────────────┐  ┌──────────────────────────────┐ │
│  │                       │  │ SINOTRUK HOWO                │ │
│  │   (img principale)    │  │ Camion Benne 8x4             │ │
│  │                       │  │                              │ │
│  │                       │  │ Catégorie : Camions bennes   │ │
│  │                       │  │                              │ │
│  │ [img1][img2][img3]... │  │ [Demander un devis]          │ │
│  │  (miniatures)         │  │                              │ │
│  │                       │  │ 📞 Appeler directement       │ │
│  │                       │  │ +237 694 945 547             │ │
│  └───────────────────────┘  └──────────────────────────────┘ │
│                                                              │
│  DESCRIPTION                                                 │
│  ─────────────────────────────────────────────────────────  │
│  Texte de description du produit…                            │
│                                                              │
│  CARACTÉRISTIQUES TECHNIQUES                                 │
│  ─────────────────────────────────────────────────────────  │
│  ┌─────────────────────────┬─────────────────────────────┐  │
│  │ Charge utile            │ 25 - 30 Tonnes              │  │
│  │ Moteur                  │ HOWO D12 380CV              │  │
│  │ Boîte de vitesses       │ HW19710 / 10 rapports       │  │
│  │ Essieux                 │ 8x4                         │  │
│  └─────────────────────────┴─────────────────────────────┘  │
│                                                              │
│  PRODUITS SIMILAIRES                                         │
│  [produit] [produit] [produit]                               │
├──────────────────────────────────────────────────────────────┤
│  FOOTER                                                      │
└──────────────────────────────────────────────────────────────┘
```

---

## WF-04 — Formulaire de Devis

```
┌──────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
├──────────────────────────────────────────────────────────────┤
│  Demander un Devis                                           │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  Vos informations                                            │
│  Nom complet *   [_________________________________]         │
│  Email *         [_________________________________]         │
│  Téléphone       [_________________________________]         │
│  Pays *          [_________________________________]         │
│                                                              │
│  Votre besoin                                                │
│  Produit *       [▼ Sélectionner un produit ________]        │
│  Quantité        [___] unités                                │
│  Message         [                                  ]        │
│                  [                                  ]        │
│                  [                                  ]        │
│                                                              │
│                           [Envoyer ma demande]               │
│                                                              │
│  ℹ️ Vous recevrez une confirmation par email.                │
│  Notre équipe vous contacte sous 48h ouvrées.               │
├──────────────────────────────────────────────────────────────┤
│  FOOTER                                                      │
└──────────────────────────────────────────────────────────────┘
```

---

## WF-05 — Backoffice : Dashboard

```
┌──────────────────────────────────────────────────────────────┐
│  🔷 TOCHE & FILS Admin     [Franklin Kuate ▼]  [Déconnexion] │
├──────────────────┬───────────────────────────────────────────┤
│  SIDEBAR         │  TABLEAU DE BORD                          │
│  ─────────────── │  ─────────────────────────────────────── │
│  📊 Dashboard    │                                           │
│  📦 Catalogue    │  ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  🗂️ Catégories  │  │    47    │ │    12    │ │     3    │  │
│  📋 Devis        │  │ Produits │ │  Devis   │ │ Messages │  │
│  ✉️ Messages     │  │  actifs  │ │  en att. │ │ non lus  │  │
│  📝 Pages        │  └──────────┘ └──────────┘ └──────────┘  │
│   🖼️ Médias      │                                           │
│  👥 Utilisateurs │  DERNIÈRES DEMANDES DE DEVIS              │
│  ⚙️ Paramètres  │  ┌────────────────────────────────────┐   │
│                  │  │ Jean Mbarga  | Camion benne | NEW  │   │
│                  │  │ Ali Hassan   | Excavateur   | NEW  │   │
│                  │  │ Paul Essono  | Chargeuse    | DONE │   │
│                  │  │             [Voir toutes les demandes]│ │
│                  │  └────────────────────────────────────┘  │
│                  │                                           │
│                  │  ACTIONS RAPIDES                          │
│                  │  [+ Nouveau produit]  [Voir les messages] │
└──────────────────┴───────────────────────────────────────────┘
```

---

## WF-06 — Backoffice : Formulaire Produit (Ajout/Édition)

```
┌──────────────────────────────────────────────────────────────┐
│  SIDEBAR  │  NOUVEAU PRODUIT                   [Annuler]     │
│           │  ─────────────────────────────────────────────  │
│           │                                                  │
│           │  INFORMATIONS GÉNÉRALES                          │
│           │  Nom du produit *   [______________________]     │
│           │  Marque *           [______________________]     │
│           │  Modèle *           [______________________]     │
│           │  Catégorie *        [▼ Sélectionner ________]    │
│           │  Description        [                      ]     │
│           │                     [                      ]     │
│           │                                                  │
│           │  PHOTOS (max 10)                                 │
│           │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────────────┐   │
│           │  │(img1)│ │(img2)│ │(img3)│ │  + Ajouter   │   │
│           │  │  [x] │ │  [x] │ │  [x] │ │  des photos  │   │
│           │  └──────┘ └──────┘ └──────┘ └──────────────┘   │
│           │  ← Glisser pour réordonner                       │
│           │                                                  │
│           │  CARACTÉRISTIQUES TECHNIQUES                     │
│           │  [Clé ___________] [Valeur _____________] [+]   │
│           │  [Clé ___________] [Valeur _____________] [x]   │
│           │  [+ Ajouter une caractéristique]                 │
│           │                                                  │
│           │  PARAMÈTRES                                      │
│           │  Statut   (●) Actif  ( ) Archivé                │
│           │  Produit vedette  [ ] Mettre en avant            │
│           │                                                  │
│           │                  [Enregistrer le produit]        │
└───────────┴──────────────────────────────────────────────────┘
```

---

## WF-07 — Backoffice : Liste des Demandes de Devis

```
┌──────────────────────────────────────────────────────────────┐
│  SIDEBAR  │  DEMANDES DE DEVIS               [Export CSV]   │
│           │  ─────────────────────────────────────────────  │
│           │                                                  │
│           │  Filtres: [Tous ▼]  [Statut ▼]  [🔍 Rechercher] │
│           │                                                  │
│           │  ┌──────┬──────────┬──────────┬──────┬────────┐ │
│           │  │ Date │ Client   │ Produit  │ Pays │ Statut │ │
│           │  ├──────┼──────────┼──────────┼──────┼────────┤ │
│           │  │12/06 │Jean Mba. │Benne 8x4 │ CMR  │ 🟡 NEW │ │
│           │  │11/06 │Ali H.    │Excavat.  │ SEN  │ 🔵 EN C│ │
│           │  │10/06 │Paul E.   │Chargeuse │ GAB  │ ✅ DONE│ │
│           │  └──────┴──────────┴──────────┴──────┴────────┘ │
│           │                                                  │
│           │  [< Préc.]  Page 1 sur 4  [Suiv. >]             │
└───────────┴──────────────────────────────────────────────────┘
```
