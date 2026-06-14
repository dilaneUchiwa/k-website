# Checklist de Livraison
## TOCHE & FILS International Trade Co., LTD

**Version :** 1.1 | **Date :** 2026-06-12

> Document de recette à valider conjointement avec le client avant la mise en production.

---

## 1. Site Vitrine — Front-office

### Pages & Contenu
- [ ] Page Accueil : hero banner, services, produits vedettes, CTA
- [ ] Page À propos : texte, photos
- [ ] Page Services : 5 domaines d'activité détaillés
- [ ] Page Catalogue : liste filtrable, pagination
- [ ] Fiche produit : galerie, specs, bouton devis
- [ ] Page Contact : formulaire, coordonnées, carte
- [ ] Page Devis : formulaire complet
- [ ] Mentions légales / Politique de confidentialité
- [ ] Page 404 personnalisée

### Fonctionnalités
- [ ] Changement de langue FR / EN / ES / ZH fonctionnel sur toutes les pages
- [ ] Filtre catalogue par catégorie fonctionnel
- [ ] Recherche produit fonctionnelle
- [ ] Formulaire de devis : validation, envoi email admin, accusé au demandeur
- [ ] Formulaire de contact : validation, envoi email admin
- [ ] Lien WhatsApp fonctionnel
- [ ] Produits vedettes affichés sur l'accueil

### Responsive
- [ ] Desktop (1280px+) : mise en page correcte
- [ ] Tablette (768px–1279px) : mise en page correcte
- [ ] Mobile (320px–767px) : mise en page correcte
- [ ] Menu hamburger mobile fonctionnel

### Performance & SEO
- [ ] Score Lighthouse Performance ≥ 80 (desktop)
- [ ] Score Lighthouse SEO ≥ 90
- [ ] Score Lighthouse Accessibilité ≥ 80
- [ ] Balises meta (title, description) présentes sur toutes les pages
- [ ] Open Graph (partage réseaux sociaux) configuré
- [ ] Sitemap XML généré et accessible
- [ ] Favicon configuré
- [ ] Images servies en WebP
- [ ] HTTPS actif

---

## 2. Backoffice — Administration

### Authentification
- [ ] Connexion email/mot de passe fonctionnelle
- [ ] Déconnexion fonctionnelle
- [ ] Routes admin inaccessibles sans authentification
- [ ] Mot de passe admin initial configuré et communiqué au client

### Module Catalogue
- [ ] Lister les produits (avec statut et catégorie)
- [ ] Créer un produit (nom, marque, modèle, catégorie, description)
- [ ] Upload et réordonnancement des photos produit
- [ ] Ajout/suppression de caractéristiques techniques (clé/valeur)
- [ ] Modifier un produit existant
- [ ] Archiver / réactiver un produit
- [ ] Supprimer un produit (avec confirmation)
- [ ] Marquer un produit comme vedette (max 6)

### Module Catégories
- [ ] Créer / renommer / supprimer une catégorie

### Module Demandes de devis
- [ ] Lister toutes les demandes avec filtres
- [ ] Voir le détail d'une demande
- [ ] Changer le statut (Nouveau / En cours / Traité)
- [ ] Export CSV des demandes

### Module Messages de contact
- [ ] Lister les messages avec statut
- [ ] Marquer comme lu / traité

### Module Pages
- [ ] Modifier les textes de l'accueil (hero, présentation)
- [ ] Modifier les textes À propos
- [ ] Modifier les textes Services

### Module Paramètres
- [ ] Modifier les numéros de téléphone
- [ ] Modifier l'adresse email de contact
- [ ] Modifier le slogan

### Module Facturation
- [ ] Créer un modèle de facture personnalisable (champs, couleurs, logo)
- [ ] Générer une facture depuis l'éditeur (articles, prix, remise, TVA)
- [ ] Sélectionner la devise (XAF, USD, EUR, CNY)
- [ ] Enregistrer et archiver les factures avec numérotation automatique
- [ ] Télécharger la facture en PDF
- [ ] Envoyer la facture par email au client

### Module Comptabilité
- [ ] Enregistrer une vente (revenu) avec catégorie et date
- [ ] Enregistrer une dépense avec catégorie et date
- [ ] Consulter un rapport bénéfices/pertes sur période choisie
- [ ] Exporter le rapport en CSV/PDF
- [ ] Enregistrer un crédit client et suivre son statut de remboursement
- [ ] Créer un objectif (CA ou ventes) avec date de début/fin
- [ ] Visualiser l'avancement d'un objectif (barre de progression + %)

### Module Utilisateurs & Rôles
- [ ] Créer un compte collaborateur
- [ ] Créer un rôle personnalisé avec permissions par module (lecture / écriture / suppression)
- [ ] Assigner un rôle à un utilisateur
- [ ] Désactiver un compte
- [ ] Modifier le rôle d'un utilisateur

---

## 3. Infrastructure & Déploiement

- [ ] Hébergement Vercel configuré et actif
- [ ] Base de données PostgreSQL en production configurée (hébergeur choisi par le client)
- [ ] Backups BDD configurés (script pg_dump ou backup natif de la plateforme)
- [ ] Variables d'environnement de production configurées dans Vercel
- [ ] Migrations Prisma appliquées en production
- [ ] Cloudinary configuré (cloud + API keys)
- [ ] Resend configuré (domaine expéditeur vérifié)
- [ ] Nom de domaine pointé vers Vercel (DNS propagé)
- [ ] SSL/HTTPS actif sur le domaine de production

---

## 4. Formation client

- [ ] Session de formation backoffice réalisée avec Franklin Kuate
- [ ] Tutoriel vidéo ou guide PDF d'utilisation du backoffice fourni
- [ ] Identifiants d'accès admin transmis de façon sécurisée
- [ ] Accès aux comptes Vercel, Cloudinary, hébergeur BDD transmis

---

## 5. Documentation livrée

- [ ] [01_documentation_fonctionnelle.md](01_documentation_fonctionnelle.md)
- [ ] [02_documentation_technique.md](02_documentation_technique.md)
- [ ] [03_wireframes.md](03_wireframes.md)
- [ ] [04_charte_graphique.md](04_charte_graphique.md)
- [ ] [05_checklist_livraison.md](05_checklist_livraison.md) (ce document)
- [ ] Code source livré sur dépôt Git privé
- [ ] README développeur (`README.md` à la racine du projet)

---

## 6. Validation finale

| Validé par | Rôle | Date | Signature |
|---|---|---|---|
| Franklin Kuate | Client | | |
| Développeur | Prestataire | | |

**Remarques client :**
> _(espace libre)_
