# Documentation Fonctionnelle
## TOCHE & FILS International Trade Co., LTD — Site Vitrine + Backoffice

**Version :** 1.0  
**Date :** 2026-06-12  
**Client :** Franklin Kuate — TOCHE & FILS International Trade Co., LTD  
**Rédacteur :** Projet Kuate

---

## 1. Présentation du client et contexte métier

**TOCHE & FILS International Trade Co., LTD** est une société de commerce international spécialisée dans l'import/export d'engins de chantier, de machines industrielles et de véhicules lourds entre la Chine et l'Afrique (principalement le Cameroun).

| Information | Détail |
|---|---|
| Dénomination | TOCHE & FILS International Trade Co., LTD |
| Responsable | Franklin Kuate |
| Tél. Cameroun | +237 694 945 547 |
| Tél. Chine | +86 18333718710 |
| Email | franklin@gmail.com |
| Adresse opérationnelle | N° 411, Zone A, 4e étage, Ville de vêtements de Wufu, N° 499-523 Avenue Sanyuanli, District de Yuexiu, Guangzhou, Guangdong, Chine |
| Slogan | *Crossing borders and creating a new chapter in international trade* |

### 1.1 Domaines d'activité

| # | Domaine | Description |
|---|---|---|
| 1 | **Vente d'engins & machines** | Camions bennes, tracteurs, excavateurs, chargeuses, bulldozers, compacteurs, semi-remorques — marques : SINOTRUK HOWO, SHACMAN, SANY, SDLG, Hitachi, etc. |
| 2 | **Prestation de services** | Accompagnement à l'achat, contrôle qualité sur site en Chine, inspection avant expédition |
| 3 | **Cargo maritime & aérien** | Organisation et suivi du fret depuis la Chine vers l'Afrique |
| 4 | **Paiement des fournisseurs** | Service de paiement mandataire auprès des fournisseurs chinois pour le compte de clients africains |
| 5 | **Accompagnement & achats** | Sourcing, négociation, accompagnement physique dans les marchés et showrooms chinois |

---

## 2. Objectifs du projet web

### 2.1 Objectif principal
Créer un **site vitrine professionnel bilingue** (Français / Anglais) avec un **backoffice d'administration** permettant à Franklin Kuate de gérer lui-même le contenu du site sans compétences techniques.

### 2.2 Objectifs secondaires
- Renforcer la crédibilité internationale de la société
- Présenter le catalogue de produits (engins/véhicules) de façon attractive
- Générer des demandes de devis et de contact
- Faciliter la mise à jour autonome du catalogue et des actualités

---

## 3. Périmètre fonctionnel

### 3.1 Site vitrine (Front-office public)

#### 3.1.1 Pages principales

| Page | Contenu |
|---|---|
| **Accueil** | Hero banner avec slogan, résumé des services, chiffres clés, appel à l'action (CTA devis/contact) |
| **À propos** | Histoire de la société, présentation de Franklin Kuate, valeurs, implantation Cameroun–Chine |
| **Nos services** | Détail des 5 domaines d'activité avec icônes et descriptions |
| **Catalogue** | Grille de produits filtrables par catégorie (camions, engins de chantier, semi-remorques), fiches produit avec photos, caractéristiques techniques et bouton devis |
| **Contact** | Formulaire de contact, coordonnées Cameroun et Chine, carte intégrée, QR code WhatsApp |
| **Devis** | Formulaire de demande de devis (produit, quantité, destination, commentaire) |

#### 3.1.2 Fonctionnalités transversales

- Navigation responsive (mobile-first)
- Sélecteur de langue FR / EN
- Bandeau d'informations de contact fixe (téléphones + WhatsApp)
- SEO : balises meta, Open Graph, sitemap XML
- Cookie / mentions légales

#### 3.1.3 Catalogue produit — Règles métier

| Règle | Détail |
|---|---|
| Catégories | Camions bennes, Tracteurs routiers, Chargeuses sur pneus, Excavateurs, Bulldozers, Compacteurs, Semi-remorques, Autres machines |
| Fiche produit | Nom, marque, modèle, catégorie, photos (max 10), caractéristiques techniques (tableau clé/valeur libre), disponibilité, statut (actif/archivé) |
| Demande de devis | Un visiteur peut demander un devis sur n'importe quel produit ; le formulaire déclenche un email vers Franklin |
| Produits mis en avant | L'admin peut mettre jusqu'à 6 produits en vedette sur la page d'accueil |

---

### 3.2 Backoffice d'administration (Back-office privé)

Accessible uniquement par authentification, réservé à l'administrateur (Franklin Kuate) et à d'éventuels collaborateurs.

#### 3.2.1 Modules du backoffice

| Module | Fonctionnalités |
|---|---|
| **Tableau de bord** | Statistiques rapides : nombre de produits, demandes de devis reçues, messages de contact non lus, dernière mise à jour |
| **Gestion du catalogue** | Créer / modifier / archiver / supprimer un produit ; uploader des photos ; réordonner les images ; définir les produits mis en avant |
| **Gestion des catégories** | Créer / renommer / supprimer des catégories de produits |
| **Demandes de devis** | Lister toutes les demandes, les marquer comme traitées, voir le détail, exporter en CSV |
| **Messages de contact** | Lister les messages entrants, marquer comme lus/traités |
| **Gestion des pages** | Modifier les textes statiques des pages (À propos, Services, Accueil) via un éditeur riche |
| **Gestion des médias** | Bibliothèque centrale d'images uploadées |
| **Utilisateurs** | Créer des comptes collaborateurs, attribuer des rôles (admin, éditeur, comptable ou rôles personnalisés avec permissions configurables) |
| **Paramètres** | Modifier les coordonnées de contact, le slogan, les réseaux sociaux |

#### 3.2.2 Rôles et permissions

| Rôle | Accès |
|---|---|
| **Administrateur** | Accès complet à tous les modules |
| **Éditeur** | Gestion catalogue, médias, pages — sans accès utilisateurs ni paramètres sensibles |
| **Comptable** | Accès au module de gestion comptable uniquement |
| *(Rôles personnalisables)* | L'administrateur peut créer des rôles sur mesure avec des permissions configurables |

---

## 4. User Stories

### Epic 1 — Visiteur (site public)

| ID | En tant que | Je veux | Afin de |
|---|---|---|---|
| US-01 | Visiteur | Voir la page d'accueil avec les services et un appel à l'action | Comprendre rapidement l'activité de TOCHE & FILS |
| US-02 | Visiteur | Parcourir le catalogue et filtrer par catégorie | Trouver le type d'engin qui m'intéresse |
| US-03 | Visiteur | Ouvrir la fiche d'un produit et voir ses photos et caractéristiques | Évaluer si le produit correspond à mes besoins |
| US-04 | Visiteur | Remplir un formulaire de demande de devis | Être contacté par Franklin Kuate avec une offre |
| US-05 | Visiteur | Utiliser le site en français, en anglais, en espagnol ou en chinois | Comprendre le contenu dans ma langue |
| US-06 | Visiteur | Trouver facilement les coordonnées (téléphone, WhatsApp, email) | Contacter directement l'entreprise |
| US-07 | Visiteur | Consulter le site sur mobile sans dégradation | Naviguer confortablement depuis mon smartphone |

### Epic 2 — Administrateur (backoffice)

| ID | En tant que | Je veux | Afin de |
|---|---|---|---|
| US-08 | Admin | Me connecter de façon sécurisée | Accéder au backoffice |
| US-09 | Admin | Ajouter un nouveau produit avec photos et specs | Enrichir le catalogue en ligne |
| US-10 | Admin | Modifier ou archiver un produit existant | Maintenir le catalogue à jour |
| US-11 | Admin | Voir la liste des demandes de devis et les marquer comme traitées | Suivre et gérer mes prospects |
| US-12 | Admin | Recevoir une notification email à chaque nouvelle demande de devis | Être alerté en temps réel |
| US-13 | Admin | Modifier les textes de présentation du site | Adapter le contenu sans développeur |
| US-14 | Admin | Créer un compte éditeur ou autre pour un collaborateur | Déléguer la gestion du catalogue |
| US-15 | Admin | Exporter les demandes de devis en CSV | Traiter les données dans Excel |
| US-16 | Admin | Configurer un modèle de facture personnalisable (logo, champs, mise en page) | Produire des factures à l'image de la société |
| US-17 | Admin | Générer et enregistrer des factures depuis l'éditeur avec choix de modèle | Archiver et retrouver facilement les factures émises |
| US-18 | Admin | Accéder à un module de gestion comptable manuelle complet (enregistrement des ventes et dépenses, rapports bénéfices/pertes, gestion des objectifs avec indicateurs d'avancement, gestion des crédits et remboursements) | Piloter la santé financière de l'activité sans outil externe |


---

## 5. Parcours utilisateurs clés

### Parcours 1 — Visiteur demande un devis
```
Accueil → Catalogue → Filtrer par catégorie → Fiche produit
→ Clic "Demander un devis" → Formulaire devis → Soumission
→ Email de confirmation au visiteur + notification à Franklin
```

### Parcours 2 — Administrateur ajoute un produit
```
Connexion backoffice → Module Catalogue → "Nouveau produit"
→ Remplir nom / marque / catégorie / specs → Upload photos
→ Définir statut (actif) → Enregistrer → Produit visible sur le site
```

### Parcours 3 — Administrateur traite une demande de devis
```
Connexion backoffice → Tableau de bord (badge nouvelles demandes)
→ Module Demandes de devis → Voir détail → Marquer "En traitement"
→ Répondre au prospect hors site (téléphone / email) → Marquer "Traité"
```

---

## 6. Critères d'acceptation globaux

- [ ] Toutes les pages du site sont accessibles et fonctionnelles sur Chrome, Firefox, Safari (desktop et mobile)
- [ ] Le formulaire de devis envoie bien un email à l'adresse de Franklin et un accusé au demandeur
- [ ] L'interface d'administration est accessible uniquement après authentification
- [ ] Le changement de langue (FR/EN) est instantané et persiste sur toute la navigation
- [ ] Les images produits sont compressées automatiquement à l'upload (max 2 Mo par image)
- [ ] Le score Lighthouse (Performance, SEO, Accessibilité) est ≥ 80 sur desktop
- [ ] Un administrateur peut ajouter/modifier/archiver un produit en moins de 5 minutes

---

## 7. Hors périmètre (V1)

- Paiement en ligne
- Espace client / suivi de commande
- Chat en direct
- Comparateur de produits
- Application mobile native
