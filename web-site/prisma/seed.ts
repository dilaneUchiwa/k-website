import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Roles
  const adminRole = await prisma.userRole.upsert({
    where: { name: 'Administrateur' },
    update: {},
    create: {
      name: 'Administrateur',
      permissions: {
        create: [
          { module: 'products', canRead: true, canWrite: true, canDelete: true },
          { module: 'categories', canRead: true, canWrite: true, canDelete: true },
          { module: 'quotes', canRead: true, canWrite: true, canDelete: true },
          { module: 'messages', canRead: true, canWrite: true, canDelete: true },
          { module: 'invoices', canRead: true, canWrite: true, canDelete: true },
          { module: 'accounting', canRead: true, canWrite: true, canDelete: true },
          { module: 'users', canRead: true, canWrite: true, canDelete: true },
          { module: 'settings', canRead: true, canWrite: true, canDelete: true },
        ],
      },
    },
  });

  const editorRole = await prisma.userRole.upsert({
    where: { name: 'Éditeur' },
    update: {},
    create: {
      name: 'Éditeur',
      permissions: {
        create: [
          { module: 'products', canRead: true, canWrite: true, canDelete: false },
          { module: 'categories', canRead: true, canWrite: true, canDelete: false },
          { module: 'quotes', canRead: true, canWrite: false, canDelete: false },
          { module: 'messages', canRead: true, canWrite: false, canDelete: false },
        ],
      },
    },
  });

  await prisma.userRole.upsert({
    where: { name: 'Comptable' },
    update: {},
    create: {
      name: 'Comptable',
      permissions: {
        create: [
          { module: 'invoices', canRead: true, canWrite: true, canDelete: false },
          { module: 'accounting', canRead: true, canWrite: true, canDelete: false },
          { module: 'quotes', canRead: true, canWrite: false, canDelete: false },
        ],
      },
    },
  });

  // Admin user
  const hashedPassword = await bcrypt.hash('Admin@2026!', 12);
  await prisma.user.upsert({
    where: { email: 'franklin@gmail.com' },
    update: {},
    create: {
      name: 'Franklin Kuate',
      email: 'franklin@gmail.com',
      password: hashedPassword,
      roleId: adminRole.id,
      active: true,
    },
  });

  // Categories
  const categoryData = [
    { name: 'Camions', slug: 'camions', order: 1 },
    { name: 'Pelleteuses', slug: 'pelleteuses', order: 2 },
    { name: 'Chargeuses', slug: 'chargeuses', order: 3 },
    { name: 'Niveleuses', slug: 'niveleuses', order: 4 },
    { name: 'Compacteurs', slug: 'compacteurs', order: 5 },
    { name: 'Grues', slug: 'grues', order: 6 },
    { name: 'Équipements Miniers', slug: 'equipements-miniers', order: 7 },
    { name: 'Pièces Détachées', slug: 'pieces-detachees', order: 8 },
  ];

  const categories: Record<string, string> = {};
  for (const cat of categoryData) {
    const c = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categories[cat.slug] = c.id;
  }

  // Products
  const products = [
    {
      name: 'SINOTRUK HOWO 8x4',
      slug: 'sinotruk-howo-8x4',
      brand: 'SINOTRUK',
      model: 'HOWO 380',
      categorySlug: 'camions',
      featured: true,
      description: "Camion benne robuste 8x4 conçu pour les chantiers exigeants et le transport de matériaux lourds. Châssis renforcé, benne haute résistance et moteur fiable adapté aux conditions africaines.",
      descriptionEn: "Robust 8x4 dump truck designed for demanding construction sites and heavy material transport. Reinforced chassis, high-resistance dump body and reliable engine adapted to African conditions.",
      img: '/images/p-howo-clean.png',
      specs: [
        { key: 'Charge utile', value: '25 – 30 Tonnes', order: 1 },
        { key: 'Moteur', value: 'HOWO D12 380CV', order: 2 },
        { key: 'Boîte de vitesses', value: 'HW19710 / 10 rapports', order: 3 },
        { key: 'Configuration', value: '8x4', order: 4 },
        { key: 'Capacité benne', value: '18 – 22 m³', order: 5 },
        { key: 'Cabine', value: 'HW76, climatisée', order: 6 },
      ],
    },
    {
      name: 'SHACMAN F3000',
      slug: 'shacman-f3000',
      brand: 'SHACMAN',
      model: 'Dump Truck 6x4',
      categorySlug: 'camions',
      featured: true,
      description: "Le SHACMAN F3000 allie puissance et économie de carburant. Une référence pour le transport minier et de chantier sur longues distances.",
      descriptionEn: "The SHACMAN F3000 combines power and fuel efficiency. A benchmark for mining and long-distance construction transport.",
      img: '/images/p-shacman-cl.png',
      specs: [
        { key: 'Charge utile', value: '20 – 25 Tonnes', order: 1 },
        { key: 'Moteur', value: 'Weichai 340CV', order: 2 },
        { key: 'Boîte de vitesses', value: 'Fast 10 rapports', order: 3 },
        { key: 'Configuration', value: '6x4', order: 4 },
        { key: 'Capacité benne', value: '16 m³', order: 5 },
        { key: 'Réservoir', value: '300 L', order: 6 },
      ],
    },
    {
      name: 'SANY SY215C',
      slug: 'sany-sy215c',
      brand: 'SANY',
      model: 'Excavateur 21.5T',
      categorySlug: 'pelleteuses',
      featured: true,
      description: "Excavateur hydraulique polyvalent de 21,5 tonnes. Précision, faible consommation et grande fiabilité pour terrassement et travaux publics.",
      descriptionEn: "Versatile 21.5-tonne hydraulic excavator. Precision, low consumption and high reliability for earthmoving and public works.",
      img: '/images/p-excav2.png',
      specs: [
        { key: 'Poids opérationnel', value: '21.5 Tonnes', order: 1 },
        { key: 'Moteur', value: 'Isuzu 4HK1 164CV', order: 2 },
        { key: 'Godet', value: '1.0 m³', order: 3 },
        { key: 'Profondeur de creusement', value: '6.66 m', order: 4 },
        { key: 'Force de pénétration', value: '150 kN', order: 5 },
        { key: 'Vitesse déplacement', value: '5.5 km/h', order: 6 },
      ],
    },
    {
      name: 'SDLG LG956L',
      slug: 'sdlg-lg956l',
      brand: 'SDLG',
      model: 'Chargeuse 5T',
      categorySlug: 'chargeuses',
      featured: true,
      description: "Chargeuse sur pneus de 5 tonnes, idéale pour la manutention, le chargement de camions et les carrières. Excellent rapport robustesse / coût.",
      descriptionEn: "5-tonne wheeled loader, ideal for material handling, truck loading and quarries. Excellent robustness/cost ratio.",
      img: '/images/p-loader2.png',
      specs: [
        { key: 'Charge nominale', value: '5 Tonnes', order: 1 },
        { key: 'Moteur', value: 'Deutz / Weichai 162kW', order: 2 },
        { key: 'Capacité godet', value: '3.0 m³', order: 3 },
        { key: 'Hauteur de déversement', value: '3.1 m', order: 4 },
        { key: 'Poids', value: '16.7 Tonnes', order: 5 },
        { key: 'Transmission', value: 'Powershift', order: 6 },
      ],
    },
    {
      name: 'SHACMAN X3000',
      slug: 'shacman-x3000',
      brand: 'SHACMAN',
      model: 'Tracteur routier 6x4',
      categorySlug: 'camions',
      featured: false,
      description: "Tracteur routier 420CV pour le transport longue distance et le remorquage de semi-remorques lourdes.",
      descriptionEn: "420HP road tractor for long-distance transport and heavy semi-trailer towing.",
      img: '/images/p-tractor-red.png',
      specs: [
        { key: 'Puissance', value: '420 CV', order: 1 },
        { key: 'Moteur', value: 'Weichai WP12', order: 2 },
        { key: 'Configuration', value: '6x4', order: 3 },
        { key: 'Boîte', value: 'Fast 12 rapports', order: 4 },
        { key: 'Cabine', value: 'Couchette double', order: 5 },
        { key: 'Sellette', value: '90#', order: 6 },
      ],
    },
    {
      name: 'SANY SD22',
      slug: 'sany-sd22',
      brand: 'SANY',
      model: 'Bulldozer 220CV',
      categorySlug: 'equipements-miniers',
      featured: false,
      description: "Bulldozer sur chenilles de 220CV pour le nivellement, le décapage et les gros travaux de terrassement.",
      descriptionEn: "220HP tracked bulldozer for leveling, stripping and heavy earthmoving.",
      img: '/images/p-bulldozer2.png',
      specs: [
        { key: 'Puissance', value: '220 CV', order: 1 },
        { key: 'Poids', value: '23.6 Tonnes', order: 2 },
        { key: 'Lame', value: '3.9 m³', order: 3 },
        { key: 'Type', value: 'Chenilles', order: 4 },
        { key: 'Moteur', value: 'Cummins NTA855', order: 5 },
        { key: 'Pression au sol', value: '0.78 kg/cm²', order: 6 },
      ],
    },
    {
      name: 'XCMG XS123',
      slug: 'xcmg-xs123',
      brand: 'XCMG',
      model: 'Compacteur 12T',
      categorySlug: 'compacteurs',
      featured: false,
      description: "Compacteur vibrant monocylindre de 12 tonnes pour le compactage de remblais, routes et plateformes.",
      descriptionEn: "12-tonne single-cylinder vibratory compactor for compacting embankments, roads and platforms.",
      img: '/images/p-roller2.png',
      specs: [
        { key: 'Poids opérationnel', value: '12 Tonnes', order: 1 },
        { key: 'Largeur cylindre', value: '2130 mm', order: 2 },
        { key: 'Force centrifuge', value: '250 / 140 kN', order: 3 },
        { key: 'Moteur', value: 'Shangchai 130kW', order: 4 },
        { key: 'Vitesse', value: '0–11 km/h', order: 5 },
        { key: 'Pente franchissable', value: '30%', order: 6 },
      ],
    },
    {
      name: 'Hitachi ZX350',
      slug: 'hitachi-zx350',
      brand: 'Hitachi',
      model: 'Excavateur 35T',
      categorySlug: 'pelleteuses',
      featured: false,
      description: "Excavateur lourd de 35 tonnes pour mines et grands chantiers. Hydraulique haute performance et confort opérateur.",
      descriptionEn: "35-tonne heavy excavator for mines and large construction sites. High-performance hydraulics and operator comfort.",
      img: '/images/p-dump6b.png',
      specs: [
        { key: 'Poids opérationnel', value: '35 Tonnes', order: 1 },
        { key: 'Moteur', value: 'Isuzu 271CV', order: 2 },
        { key: 'Godet', value: '1.4 m³', order: 3 },
        { key: 'Profondeur', value: '7.4 m', order: 4 },
        { key: 'Force de pénétration', value: '230 kN', order: 5 },
        { key: 'Réservoir', value: '480 L', order: 6 },
      ],
    },
  ];

  for (const p of products) {
    const { categorySlug, img, specs, ...productData } = p;
    const existing = await prisma.product.findUnique({ where: { slug: productData.slug } });
    if (!existing) {
      await prisma.product.create({
        data: {
          ...productData,
          status: 'ACTIVE',
          categoryId: categories[categorySlug],
          images: {
            create: [{ url: img, alt: productData.name, order: 0 }],
          },
          specs: {
            create: specs,
          },
        },
      });
    }
  }

  // Demo quote requests
  const quoteProduct = await prisma.product.findFirst({ where: { slug: 'sinotruk-howo-8x4' } });
  const quotesData = [
    { fullName: 'Jean Mbarga', email: 'jmbarga@email.cm', phone: '+237 677 11 22 33', country: 'Cameroun', productName: 'SINOTRUK HOWO 8x4', quantity: 2, message: 'Bonjour, je souhaite 2 camions bennes pour un chantier à Douala. Quel délai de livraison ?', status: 'NEW' },
    { fullName: 'Ali Hassan', email: 'ali.h@email.sn', phone: '+221 77 88 99 00', country: 'Sénégal', productName: 'SANY SY215C', quantity: 1, message: "Besoin d'un excavateur 21T pour terrassement. Merci de m'envoyer une offre.", status: 'IN_PROGRESS' },
    { fullName: 'Paul Essono', email: 'p.essono@email.ga', phone: '+241 06 12 34 56', country: 'Gabon', productName: 'SDLG LG956L', quantity: 1, message: 'Demande de devis pour chargeuse sur pneus. Livraison Libreville.', status: 'DONE' },
    { fullName: 'Aminata Diallo', email: 'a.diallo@email.ci', phone: '+225 07 00 11 22', country: "Côte d'Ivoire", productName: 'SHACMAN F3000', quantity: 3, message: 'Flotte de 3 dump trucks pour société minière. Urgent.', status: 'NEW' },
    { fullName: 'Joseph Nkomo', email: 'j.nkomo@email.cm', phone: '+237 699 44 55 66', country: 'Cameroun', productName: 'SANY SD22', quantity: 1, message: 'Bulldozer pour ouverture de piste. Quel est le prix CIF Douala ?', status: 'IN_PROGRESS' },
  ];

  for (const q of quotesData) {
    const count = await prisma.quoteRequest.count({ where: { email: q.email } });
    if (count === 0) {
      await prisma.quoteRequest.create({
        data: {
          ...q,
          productId: quoteProduct?.id,
        },
      });
    }
  }

  // Demo contact messages
  const messagesData = [
    { fullName: 'Marc Ondoa', email: 'marc.o@email.cm', subject: 'Partenariat distribution', message: "Bonjour, je représente une société de BTP et souhaiterais discuter d'un partenariat de distribution d'équipements lourds au Cameroun.", status: 'NEW' },
    { fullName: 'Grace Kamga', email: 'g.kamga@email.cm', subject: 'Pièces détachées SINOTRUK', message: 'Fournissez-vous également les pièces détachées pour les camions HOWO ?', status: 'NEW' },
    { fullName: 'Ibrahim Touré', email: 'i.toure@email.ml', subject: 'Délais de livraison Mali', message: 'Quels sont vos délais pour une livraison à Bamako via le port de Dakar ?', status: 'NEW' },
    { fullName: 'Sandra Eyenga', email: 's.eyenga@email.cm', subject: 'Visite showroom Chine', message: "Est-il possible d'organiser une visite de vos showrooms à Guangzhou ?", status: 'DONE' },
  ];

  for (const m of messagesData) {
    const count = await prisma.contactMessage.count({ where: { email: m.email } });
    if (count === 0) {
      await prisma.contactMessage.create({ data: m });
    }
  }

  // Site settings
  const settings = [
    { key: 'phone_cm', value: '+237 694 945 547' },
    { key: 'phone_cn', value: '+86 18333718710' },
    { key: 'email', value: 'franklin@gmail.com' },
    { key: 'address', value: 'Douala, Cameroun / Guangzhou, Chine' },
    { key: 'whatsapp', value: '+237 694 945 547' },
    { key: 'company_name', value: 'TOCHE & FILS International Trade Co., LTD' },
    { key: 'facebook', value: '' },
    { key: 'linkedin', value: '' },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }

  // Default invoice template
  const templateCount = await prisma.invoiceTemplate.count();
  if (templateCount === 0) {
    await prisma.invoiceTemplate.create({
      data: {
        name: 'Modèle Standard',
        config: JSON.stringify({
          logo: true,
          color: '#0A5FA8',
          font: 'Inter',
          showTax: true,
          showDiscount: true,
          currency: 'XAF',
          paymentTerms: 'Paiement à 30 jours',
        }),
      },
    });
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
