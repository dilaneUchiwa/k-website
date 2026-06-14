/* ============================================================
   TOCHE & FILS — Site Vitrine — pages + router
   ============================================================ */
(function(){
"use strict";
const {CATS,PRODUCTS,ph,PHONE_CM,PHONE_CN,EMAIL} = window.__TF;
const icon = window.__icon;
const app = ()=>document.getElementById('app');

/* ---------- shared fragments ---------- */
function sectionHead(eyebrow,title,sub,left){
  return `<div class="section-head ${left?'left':''} reveal">
    <span class="eyebrow">${eyebrow}</span>
    <h2>${title}</h2>${sub?`<p>${sub}</p>`:''}</div>`;
}
function productCard(p){
  const media = p.img
    ? `<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;display:block">`
    : ph(p.cat,false,p.brand);
  return `<a class="card reveal" href="#/produit/${p.id}">
    <div class="media">${media}
      <span class="badge">${p.cat}</span>
      ${p.feat?`<span class="feat-flag">Vedette</span>`:''}
    </div>
    <div class="body">
      <h3>${p.name}</h3>
      <p class="meta">${p.model} · <b>${p.brand}</b></p>
      <div class="actions" onclick="event.preventDefault()">
        <span class="btn btn-secondary btn-sm" onclick="location.hash='#/produit/${p.id}'">Voir détail</span>
        <span class="btn btn-cta btn-sm" onclick="location.hash='#/devis?p=${p.id}'">Devis</span>
      </div>
    </div></a>`;
}
function crumb(items){
  return `<div class="crumb container">${items.map((it,i)=>{
    const last=i===items.length-1;
    return (last?`<span class="cur">${it.t}</span>`:`<a href="${it.h}">${it.t}</a>${icon('chevR')}`);
  }).join('')}</div>`;
}

/* =========================================================
   HOME
   ========================================================= */
function Home(){
  const services=[
    {ic:'truck',t:'Vente d\'engins & machines',d:'Camions bennes, tracteurs routiers, excavateurs, chargeuses, bulldozers, compacteurs et semi-remorques neufs des plus grandes marques chinoises et japonaises.',color:'blue'},
    {ic:'shield',t:'Prestation de services',d:'Contrôle qualité sur site en Chine, inspection avant expédition et rapport détaillé fourni avant tout paiement.',color:'navy'},
    {ic:'ship',t:'Cargo maritime & aérien',d:'Organisation et suivi du fret conteneurisé ou groupé depuis les ports chinois (Guangzhou, Shanghai, Tianjin) jusqu\'à votre port africain.',color:'sky'},
    {ic:'card',t:'Paiement des fournisseurs',d:'Service mandataire sécurisé : nous payons vos fournisseurs chinois en votre nom, avec traçabilité totale et protection acheteur.',color:'cta'},
    {ic:'handshake',t:'Accompagnement & achats',d:'Visite de showrooms et marchés à Guangzhou, sourcing personnalisé, négociation et interprétariat en mandarin pour vos achats sur place.',color:'green'},
    {ic:'file',t:'Gestion documentaire',d:'Constitution et vérification de tous les documents : facture commerciale, B/L, certificat d\'origine, liste de colisage, documents douaniers.',color:'amber'},
    {ic:'layers',t:'Sourcing & approvisionnement',d:'Recherche de fournisseurs fiables pour tout type de produit industriel ou commercial au-delà des engins : équipements, matériaux, consommables.',color:'purple'},
  ];
  const steps=[
    {n:'01',t:'Contactez-nous',d:'Envoyez votre demande par WhatsApp, email ou formulaire de devis. Réponse garantie sous 48h ouvrées.'},
    {n:'02',t:'Offre & sourcing',d:'Nous identifions le meilleur fournisseur, négocions le prix et vous soumettons une offre détaillée CIF.'},
    {n:'03',t:'Inspection & paiement',d:'Nous inspectons la marchandise en Chine avant expédition. Vous payez en toute sécurité via notre service mandataire.'},
    {n:'04',t:'Livraison à votre port',d:'Nous gérons le fret, le dédouanement et vous fournissons tous les documents nécessaires à la réception.'},
  ];
  const why=[
    {ic:'globe',t:'Présence Cameroun – Chine',d:'Une équipe sur place à Guangzhou et au Cameroun pour un pont commercial direct et sans intermédiaire.'},
    {ic:'shield',t:'Contrôle qualité sur site',d:'Inspection rigoureuse de chaque engin en Chine avant toute expédition. Rapport photo fourni.'},
    {ic:'ship',t:'Logistique complète',d:'Du showroom chinois jusqu\'à votre port, nous gérons toute la chaîne logistique.'},
    {ic:'wallet',t:'Paiement sécurisé',d:'Nous payons vos fournisseurs pour vous, sans risque ni intermédiaire douteux.'},
  ];
  const feat = PRODUCTS.filter(p=>p.feat).slice(0,4);
  return `<div class="page">
  <section class="hero">
    <div class="container">
      <div>
        <span class="hero-kicker">${icon('globe')} Import / Export · Chine → Afrique</span>
        <h1>TOCHE &amp; FILS <span class="accent">International Trade Co., LTD</span></h1>
        <p class="slogan">« Crossing borders and creating a new chapter in international trade »</p>
        <div class="hero-actions">
          <a class="btn btn-cta btn-lg" href="#/catalogue">${icon('package')} Voir le catalogue</a>
          <a class="btn btn-white btn-lg" href="#/devis">Demander un devis ${icon('arrow')}</a>
        </div>
        <div class="hero-trust">
          <div class="ht"><b data-count="500">500+</b><span>Engins livrés</span></div>
          <div class="ht"><b data-count="12">12</b><span>Pays desservis</span></div>
          <div class="ht"><b data-count="48">48h</b><span>Réponse devis</span></div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-card big"><img src="assets/img/hero.png" alt="Flotte TOCHE &amp; FILS" style="width:100%;height:100%;object-fit:cover"></div>
        <div class="hero-card small"><img src="assets/img/p-excav2.png" alt="Excavateur" style="width:100%;height:100%;object-fit:cover"></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${sectionHead('Nos services','Une chaîne complète, de la Chine à votre chantier','Cinq domaines d\'expertise pour sécuriser et simplifier vos importations.')}
      <div class="svc-grid" style="grid-template-columns:repeat(4,1fr)">
        ${services.slice(0,4).map(s=>`<div class="svc reveal"><div class="ic">${icon(s.ic)}</div><h3>${s.t}</h3><p>${s.d}</p></div>`).join('')}
      </div>
      <div class="svc-grid" style="grid-template-columns:repeat(3,1fr);margin-top:22px">
        ${services.slice(4).map(s=>`<div class="svc reveal"><div class="ic">${icon(s.ic)}</div><h3>${s.t}</h3><p>${s.d}</p></div>`).join('')}
      </div>
      <div style="text-align:center;margin-top:36px" class="reveal">
        <a class="btn btn-secondary btn-lg" href="#/services">Découvrir tous nos services en détail ${icon('arrow')}</a>
      </div>
    </div>
  </section>

  <section class="section soft">
    <div class="container">
      ${sectionHead('Produits vedettes','Notre sélection d\'engins disponibles','Des machines fiables, contrôlées et prêtes à l\'expédition.')}
      <div class="prod-grid feat">${feat.map(productCard).join('')}</div>
      <div style="text-align:center;margin-top:38px" class="reveal">
        <a class="btn btn-primary btn-lg" href="#/catalogue">Voir tout le catalogue ${icon('arrow')}</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${sectionHead('Comment ça marche','4 étapes pour recevoir votre engin','Un processus transparent, du premier contact à la livraison sur votre chantier.')}
      <div class="steps-grid reveal">
        ${steps.map((s,i)=>`<div class="step">
          <div class="step-num">${s.n}</div>
          ${i<steps.length-1?'<div class="step-line"></div>':''}
          <h3>${s.t}</h3><p>${s.d}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section soft">
    <div class="container">
      ${sectionHead('Pourquoi nous choisir','Votre partenaire de confiance entre deux continents')}
      <div class="why-grid">
        ${why.map(w=>`<div class="why reveal"><div class="ic">${icon(w.ic)}</div><div><h3>${w.t}</h3><p>${w.d}</p></div></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section soft">
    <div class="container">
      <div class="stats reveal">
        <div class="stat"><b data-count="500">500+</b><span>Engins importés</span></div>
        <div class="stat"><b data-count="12">12</b><span>Pays africains</span></div>
        <div class="stat"><b data-count="8">8</b><span>Catégories d'engins</span></div>
        <div class="stat"><b data-count="98">98%</b><span>Clients satisfaits</span></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="cta-band reveal">
        <h2>Vous avez un projet ?</h2>
        <p>Parlons-en dès maintenant. Notre équipe vous accompagne du sourcing à la livraison.</p>
        <div class="row">
          <a class="btn btn-white btn-lg" href="#/devis">Demander un devis</a>
          <a class="btn btn-lg" style="background:rgba(255,255,255,.16);color:#fff;border:1.5px solid rgba(255,255,255,.4)" href="#/contact">Nous contacter</a>
        </div>
      </div>
    </div>
  </section>
  </div>`;
}

/* =========================================================
   SERVICES
   ========================================================= */
function Services(){
  const items=[
    {ic:'truck',t:'Vente d\'engins & machines',num:'01',
     d:'Nous fournissons une large gamme d\'engins de chantier et de véhicules lourds neufs depuis la Chine : camions bennes, tracteurs routiers, excavateurs, chargeuses, bulldozers, compacteurs, semi-remorques et bien plus.',
     subs:['Camions bennes SINOTRUK HOWO, SHACMAN, BEIBEN (6×4, 8×4, 10×4)','Tracteurs routiers longue distance 340–550 CV','Excavateurs hydrauliques 6T à 116T (SANY, XCMG, Hitachi)','Chargeuses sur pneus 0,8 à 10 Tonnes','Bulldozers sur chenilles 140–280 kW','Compacteurs vibrants 0,8 à 40 Tonnes','Semi-remorques bennes, citernes, porte-engins','Graders, niveleuses et engins de terrassement'],
     tags:['SINOTRUK HOWO','SHACMAN','SANY','SDLG','XCMG','Hitachi','BEIBEN','LIUGONG'],note:'Devis personnalisé sous 48h'},
    {ic:'shield',t:'Prestation de services & contrôle qualité',num:'02',
     d:'Avant toute expédition, nous inspectons physiquement chaque machine dans les usines ou entrepôts chinois. Un rapport détaillé avec photos et vidéos vous est remis avant que vous confirmiez le paiement.',
     subs:['Visite physique en usine ou entrepôt à Guangzhou, Zhengzhou, Shanghai','Vérification de conformité : modèle, motorisation, équipements','Contrôle état général : carrosserie, moteur, hydraulique, cabine','Rapport d\'inspection illustré (photos + vidéo)','Contre-expertise sur demande avec technicien partenaire','Suivi de production pour commandes spéciales'],
     tags:['Inspection usine','Rapport photo','Contre-expertise','Vidéo 360°'],note:'Inclus dans toute commande'},
    {ic:'ship',t:'Cargo maritime & aérien',num:'03',
     d:'Nous organisons l\'intégralité de la chaîne logistique depuis les ports chinois jusqu\'à votre port de destination en Afrique. Fret conteneurisé (FCL) ou groupage (LCL), nous optimisons coûts et délais.',
     subs:['Chargement FCL (conteneur complet) ou LCL (groupage)','Ports de départ : Guangzhou Nansha, Tianjin, Shanghai, Ningbo','Ports de destination : Douala, Abidjan, Dakar, Libreville, Pointe-Noire…','Fret aérien express pour petites marchandises urgentes','Suivi en temps réel du conteneur (tracking)','Assurance maritime à la demande','Coordination avec transitaires locaux'],
     tags:['FCL / LCL','Ports africains','Tracking','Assurance'],note:'Délai moyen 28–45 jours'},
    {ic:'card',t:'Paiement des fournisseurs',num:'04',
     d:'Vous n\'avez pas de compte en Chine ? Nous agissons comme mandataire de paiement pour régler vos fournisseurs chinois en votre nom, avec une traçabilité totale et une protection acheteur intégrée.',
     subs:['Paiement par virement bancaire ou TT international','Gestion des dépôts (acomptes) et soldes','Émission d\'un reçu officiel après chaque transaction','Protection : paiement libéré uniquement après inspection','Gestion multi-devises : CNY, USD, EUR, XAF','Relevé de compte mensuel fourni','Pas de frais cachés — tarification transparente'],
     tags:['Virement TT','Multi-devises','Protection acheteur','Sans risque'],note:'Commission transparente'},
    {ic:'handshake',t:'Accompagnement & achats sur place',num:'05',
     d:'Nos représentants à Guangzhou vous accueillent, vous accompagnent dans les marchés et showrooms, assurent la traduction en mandarin et négocient les meilleurs prix en votre nom.',
     subs:['Accueil à l\'aéroport de Guangzhou et prise en charge','Visite des showrooms : Wufu, Guangda, Tianhe…','Interprétariat mandarin – français – anglais','Négociation directe avec les fournisseurs','Conseils sur les prix du marché et les fournisseurs fiables','Aide à la rédaction des contrats en mandarin','Organisation hôtel, transport, restauration sur demande'],
     tags:['Guangzhou','Interprétariat','Négociation','Visa commercial'],note:'Sur rendez-vous'},
    {ic:'file',t:'Gestion documentaire & douanes',num:'06',
     d:'Nous préparons et vérifions l\'intégralité des documents nécessaires à l\'exportation depuis la Chine et à l\'importation dans votre pays, minimisant les risques de blocage en douane.',
     subs:['Facture commerciale conforme','Bordereau d\'expédition (Packing List)','Connaissement maritime (Bill of Lading)','Certificat d\'origine FORM A / CO','Certificat de conformité (COC) ou d\'inspection','Documents phytosanitaires si requis','Coordination avec votre transitaire local'],
     tags:['B/L','Certificat d\'origine','COC','Douanes'],note:'Documents vérifiés'},
    {ic:'layers',t:'Sourcing & approvisionnement général',num:'07',
     d:'Au-delà des engins, nous pouvons sourcer tout type de produit commercial ou industriel en Chine : électronique, textile, matériaux de construction, équipements médicaux, alimentaire…',
     subs:['Recherche de fournisseurs qualifiés sur Alibaba, 1688 et marchés physiques','Demande de devis auprès de plusieurs fournisseurs','Comparaison et recommandation objective','Échantillons avant commande de masse','Gestion de la commande et suivi de production','Logistique jusqu\'à destination'],
     tags:['Alibaba','1688','Marchés Guangzhou','Tous produits'],note:'Sur demande'},
  ];
  const faq=[
    {q:'Quel est le délai moyen de livraison depuis la Chine ?',r:'Pour le fret maritime vers Douala, comptez 28 à 45 jours après expédition. Le délai total depuis la commande dépend du délai de production (5–15 jours pour stock disponible, 30–60 jours pour commandes spéciales).'},
    {q:'Puis-je visiter les usines avant de commander ?',r:'Oui. Notre équipe à Guangzhou organise des visites d\'usines sur rendez-vous. Nous recommandons fortement cette démarche pour les commandes importantes (5 engins et plus).'},
    {q:'Comment fonctionne le paiement sécurisé ?',r:'Vous versez un acompte à TOCHE & FILS. Nous inspectons la machine. Vous validez le rapport. Nous réglons le fournisseur et programmons l\'expédition. Le solde est dû avant départ du port.'},
    {q:'Livrez-vous dans d\'autres pays que le Cameroun ?',r:'Oui, nous livrons dans toute l\'Afrique subsaharienne : Sénégal, Gabon, Côte d\'Ivoire, Congo, Tchad, RDC, Mali, Burkina Faso et bien d\'autres. Contactez-nous pour un devis CIF vers votre port.'},
    {q:'Proposez-vous des garanties sur les engins ?',r:'Les engins neufs sont livrés avec la garantie constructeur (généralement 12 mois ou 1 000 heures). Nous facilitons le suivi de garantie et la recherche de pièces détachées depuis la Chine.'},
  ];
  return `<div class="page">
    ${crumb([{t:'Accueil',h:'#/'},{t:'Nos services'}])}

    <!-- HERO SERVICES -->
    <section style="background-color:var(--navy);background-image:linear-gradient(120deg,#04223f,#0A5FA8 70%);padding:60px 0;color:#fff;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1.4px);background-size:26px 26px;pointer-events:none"></div>
      <div class="container" style="position:relative;z-index:1;display:grid;grid-template-columns:1fr auto;align-items:center;gap:30px">
        <div>
          <span class="eyebrow" style="color:#7cc6f3">Nos services</span>
          <h1 style="font-size:clamp(28px,4vw,46px);font-weight:800;color:#fff;margin:14px 0 0">7 expertises pour sécuriser<br>vos importations depuis la Chine</h1>
          <p style="color:#bfdcf3;font-size:17px;margin:16px 0 0;max-width:52ch">De la recherche du fournisseur à la livraison sur votre chantier, TOCHE &amp; FILS est votre interlocuteur unique.</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;min-width:200px">
          <a class="btn btn-cta btn-lg" href="#/devis">${icon('send')} Demander un devis</a>
          <a class="btn btn-lg" style="background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.3)" href="#/contact">${icon('phone')} Nous appeler</a>
        </div>
      </div>
    </section>

    <!-- SERVICES DÉTAILLÉS -->
    <section class="section">
      <div class="container">
        ${sectionHead('Détail des services','Ce que nous faisons concrètement pour vous','Cliquez sur un service pour voir toutes les prestations incluses.')}
        <div style="display:grid;gap:26px" id="svcList">
          ${items.map((s,i)=>`
          <div class="reveal svc-detail" id="svc-${i}" style="background:#fff;border:1px solid var(--line);border-radius:var(--r-card);overflow:hidden;box-shadow:var(--shadow-sm)">
            <div class="svc-detail-head" data-idx="${i}" style="display:grid;grid-template-columns:80px 1fr auto;gap:20px;align-items:center;padding:24px 28px;cursor:pointer">
              <div style="width:64px;height:64px;border-radius:16px;display:grid;place-items:center;background:linear-gradient(135deg,rgba(10,95,168,.12),rgba(46,156,219,.18));color:var(--blue)"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${window.__icon_raw(s.ic)}</svg></div>
              <div>
                <div style="font-family:var(--ff-head);font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:6px">Service ${s.num}</div>
                <h3 style="font-size:20px;font-weight:700;color:var(--navy)">${s.t}</h3>
                <p style="color:var(--muted);font-size:14.5px;margin:6px 0 0;max-width:60ch">${s.d}</p>
              </div>
              <div style="display:flex;flex-direction:column;align-items:flex-end;gap:10px">
                <span style="display:inline-flex;align-items:center;gap:6px;background:rgba(22,163,74,.1);color:#15803d;font-family:var(--ff-head);font-weight:600;font-size:12px;padding:5px 11px;border-radius:999px">${icon('checkCircle')} ${s.note}</span>
                <span class="svc-toggle" style="display:inline-flex;align-items:center;gap:6px;color:var(--blue);font-size:13px;font-weight:600;font-family:var(--ff-head)">${icon('chevD')} Voir le détail</span>
              </div>
            </div>
            <div class="svc-body" style="display:none;border-top:1px solid var(--line)">
              <div style="display:grid;grid-template-columns:1fr 240px;gap:0">
                <div style="padding:24px 28px">
                  <div style="font-family:var(--ff-head);font-weight:700;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:var(--navy);margin-bottom:16px">Prestations incluses</div>
                  <ul style="list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:10px">
                    ${s.subs.map(sub=>`<li style="display:flex;align-items:flex-start;gap:10px;font-size:14.5px;color:#2a3342"><span style="flex:none;width:20px;height:20px;border-radius:6px;background:rgba(10,95,168,.1);display:grid;place-items:center;color:var(--blue);margin-top:1px">${icon('check')}</span>${sub}</li>`).join('')}
                  </ul>
                  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:20px">
                    ${s.tags.map(t=>`<span class="chip" style="pointer-events:none;font-size:12.5px;padding:6px 13px">${t}</span>`).join('')}
                  </div>
                </div>
                <div style="background:var(--bg-soft);border-left:1px solid var(--line);padding:24px 22px;display:flex;flex-direction:column;gap:14px">
                  <a class="btn btn-cta" style="font-size:13.5px" href="#/devis">${icon('send')} Demander un devis</a>
                  <a class="btn btn-secondary" style="font-size:13.5px" href="#/contact">${icon('phone')} Nous contacter</a>
                  <div style="font-size:13px;color:var(--muted);line-height:1.6;margin-top:6px">${icon('info')} Réponse garantie sous <b>48h</b> ouvrées.</div>
                </div>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- PROCESSUS -->
    <section class="section soft">
      <div class="container">
        ${sectionHead('Notre processus','De la commande à la livraison','Un accompagnement clair et transparent à chaque étape.')}
        <div class="steps-grid reveal">
          <div class="step"><div class="step-num">01</div><div class="step-line"></div><h3>Demande & devis</h3><p>Envoyez votre besoin par WhatsApp, email ou formulaire. Offre CIF détaillée sous 48h.</p></div>
          <div class="step"><div class="step-num">02</div><div class="step-line"></div><h3>Sourcing & négociation</h3><p>Nous identifions le meilleur fournisseur, négocions le prix et vous soumettons un contrat clair.</p></div>
          <div class="step"><div class="step-num">03</div><div class="step-line"></div><h3>Inspection & paiement</h3><p>Inspection physique en Chine avec rapport photo. Paiement sécurisé via notre service mandataire.</p></div>
          <div class="step"><div class="step-num">04</div><div class="step-line"></div><h3>Expédition & suivi</h3><p>Chargement du conteneur, booking fret, tracking en temps réel depuis le port chinois.</p></div>
          <div class="step"><div class="step-num">05</div><h3>Livraison & documents</h3><p>Arrivée au port, remise de tous les documents douaniers pour un dédouanement sans accroc.</p></div>
        </div>
      </div>
    </section>

    <!-- SECTEURS -->
    <section class="section">
      <div class="container">
        ${sectionHead('Secteurs desservis','Nous travaillons avec tous les secteurs','Nos engins équipent les chantiers de toute l\'Afrique subsaharienne.')}
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px">
          ${[['BTP & Construction','Terrassement, fondations, gros œuvre et TP','excavator'],['Mines & Carrières','Transport de minerais, extraction et décapage','layers'],['Agriculture & Agro','Défrichage, pistes rurales, irrigation','package'],['Transport & Logistique','Flotte de camions longue distance et semi-remorques','truck'],['Routes & Travaux publics','Nivellement, compactage et revêtement','layers'],['Industries & Ports','Manutention lourde et équipements portuaires','ship'],['Énergie & Pétrole','Engins spéciaux pour sites pétroliers et mines','shield'],['Collectivités locales','Bennes à ordures, véhicules de voirie','truck']].map(([t,d,ic])=>`<div class="svc reveal" style="cursor:default"><div class="ic">${icon(ic)}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section soft">
      <div class="container">
        ${sectionHead('Questions fréquentes','Tout ce que vous devez savoir avant de commander','')}
        <div style="max-width:820px;margin:0 auto" id="faqList">
          ${faq.map((f,i)=>`<div class="reveal faq-item" style="background:#fff;border:1px solid var(--line);border-radius:var(--r-card);overflow:hidden;margin-bottom:12px">
            <div class="faq-q" data-fi="${i}" style="display:flex;justify-content:space-between;align-items:center;padding:20px 24px;cursor:pointer;font-family:var(--ff-head);font-weight:700;font-size:16px;color:var(--navy)">
              <span>${f.q}</span><span class="faq-ic" style="width:28px;height:28px;border-radius:8px;background:var(--bg-soft);display:grid;place-items:center;flex:none;color:var(--blue)">${icon('chevD')}</span>
            </div>
            <div class="faq-a" style="display:none;padding:0 24px 20px;font-size:15px;color:var(--muted);line-height:1.7">${f.r}</div>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container">
        <div class="cta-band reveal">
          <h2>Prêt à lancer votre importation ?</h2>
          <p>Notre équipe vous accompagne de A à Z. Contactez-nous aujourd'hui pour un devis gratuit sous 48h.</p>
          <div class="row">
            <a class="btn btn-white btn-lg" href="#/devis">${icon('send')} Demander un devis gratuit</a>
            <a class="btn btn-lg" style="background:rgba(255,255,255,.16);color:#fff;border:1.5px solid rgba(255,255,255,.4)" href="#/contact">${icon('phone')} Parler à un expert</a>
          </div>
        </div>
      </div>
    </section>
  </div>`;
}
function bindServices(){
  document.querySelectorAll('.svc-detail-head').forEach(h=>{
    h.addEventListener('click',()=>{
      const body=h.closest('.svc-detail').querySelector('.svc-body');
      const tog=h.querySelector('.svc-toggle');
      const open=body.style.display==='block';
      body.style.display=open?'none':'block';
      tog.innerHTML=open?icon('chevD')+' Voir le d\u00e9tail':icon('chevU')+' Masquer';
    });
  });
  document.querySelectorAll('.faq-q').forEach(q=>{
    q.addEventListener('click',()=>{
      const ans=q.nextElementSibling;
      const ic=q.querySelector('.faq-ic');
      const open=ans.style.display==='block';
      ans.style.display=open?'none':'block';
      ic.innerHTML=open?icon('chevD'):icon('chevU');
    });
  });
}

/* =========================================================
   CATALOGUE
   ========================================================= */
let CAT_STATE={cat:'Tous',q:'',page:1};
function Catalogue(){
  return `<div class="page">
    ${crumb([{t:'Accueil',h:'#/'},{t:'Catalogue'}])}
    <section class="section" style="padding-top:18px">
      <div class="container">
        ${sectionHead('Notre catalogue','Engins & véhicules disponibles','Filtrez par catégorie et trouvez la machine adaptée à votre chantier.',true)}
        <div class="cat-toolbar">
          <div class="filters" id="filters">
            ${['Tous',...CATS].map(c=>`<button class="chip ${c===CAT_STATE.cat?'on':''}" data-cat="${c}">${c}</button>`).join('')}
          </div>
          <div class="search">${icon('search')}<input id="catSearch" placeholder="Rechercher un produit, une marque…" value="${CAT_STATE.q}"></div>
        </div>
        <div class="cat-count" id="catCount"></div>
        <div class="prod-grid" id="catGrid"></div>
        <div class="pagination" id="catPager"></div>
      </div>
    </section>
  </div>`;
}
function renderCatGrid(){
  const grid=document.getElementById('catGrid'); if(!grid) return;
  let list=PRODUCTS.filter(p=>CAT_STATE.cat==='Tous'||p.cat===CAT_STATE.cat);
  const q=CAT_STATE.q.trim().toLowerCase();
  if(q) list=list.filter(p=>(p.name+p.brand+p.model+p.cat).toLowerCase().includes(q));
  const per=6, pages=Math.max(1,Math.ceil(list.length/per));
  if(CAT_STATE.page>pages) CAT_STATE.page=1;
  const slice=list.slice((CAT_STATE.page-1)*per,CAT_STATE.page*per);
  document.getElementById('catCount').innerHTML=`<b>${list.length}</b> produit${list.length>1?'s':''} ${CAT_STATE.cat!=='Tous'?`dans « ${CAT_STATE.cat} »`:''}`;
  grid.innerHTML=slice.length?slice.map(productCard).join(''):`<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--muted)">${icon('search')}<p>Aucun produit ne correspond à votre recherche.</p></div>`;
  const pager=document.getElementById('catPager');
  pager.innerHTML = pages>1 ? (
    `<button ${CAT_STATE.page===1?'disabled style="opacity:.4"':''} data-pg="${CAT_STATE.page-1}">${icon('chevR')==''?'':''}‹ Précédent</button>`+
    Array.from({length:pages},(_,i)=>`<button class="${CAT_STATE.page===i+1?'on':''}" data-pg="${i+1}">${i+1}</button>`).join('')+
    `<button ${CAT_STATE.page===pages?'disabled style="opacity:.4"':''} data-pg="${CAT_STATE.page+1}">Suivant ›</button>`
  ):'';
  revealScan();
}
function bindCatalogue(){
  const f=document.getElementById('filters');
  if(f) f.addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;CAT_STATE.cat=b.dataset.cat;CAT_STATE.page=1;f.querySelectorAll('.chip').forEach(c=>c.classList.toggle('on',c===b));renderCatGrid();});
  const s=document.getElementById('catSearch');
  if(s) s.addEventListener('input',()=>{CAT_STATE.q=s.value;CAT_STATE.page=1;renderCatGrid();});
  const pg=document.getElementById('catPager');
  if(pg) pg.addEventListener('click',e=>{const b=e.target.closest('[data-pg]');if(!b||b.disabled)return;CAT_STATE.page=+b.dataset.pg;renderCatGrid();window.scrollTo({top:300,behavior:'smooth'});});
  renderCatGrid();
}

/* =========================================================
   PRODUCT DETAIL
   ========================================================= */
function Product(id){
  const p=PRODUCTS.find(x=>x.id===id);
  if(!p) return `<div class="page"><div class="container" style="padding:80px 0;text-align:center"><h2>Produit introuvable</h2><a class="btn btn-primary" href="#/catalogue" style="margin-top:20px">Retour au catalogue</a></div></div>`;
  const sim=PRODUCTS.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,3);
  const simFill = sim.length?sim:PRODUCTS.filter(x=>x.id!==p.id).slice(0,3);
  return `<div class="page">
    ${crumb([{t:'Accueil',h:'#/'},{t:'Catalogue',h:'#/catalogue'},{t:p.cat,h:'#/catalogue'},{t:p.name}])}
    <section class="section" style="padding-top:14px">
      <div class="container">
        <div class="pd">
          <div class="pd-gallery reveal">
            <div class="main" id="pdMain">${p.img?`<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover">`:ph(p.cat,false,p.brand)}</div>
            <div class="pd-thumbs">
              ${[0,1,2,3].map(i=>`<div class="t ${i===0?'on':''}">${p.img?`<img src="${p.img}" alt="" style="width:100%;height:100%;object-fit:cover">`:ph(p.cat,true,'')}</div>`).join('')}
            </div>
          </div>
          <div class="pd-info reveal">
            <span class="cat-pill">${p.cat}</span>
            <h1>${p.name}</h1>
            <p class="sub">${p.model} · Marque <b style="color:var(--blue)">${p.brand}</b></p>
            <div class="price-note">${icon('info')}<span>Prix sur demande — chaque devis est personnalisé selon la destination, la quantité et les options.</span></div>
            <div class="pd-actions">
              <a class="btn btn-cta btn-lg" href="#/devis?p=${p.id}">${icon('send')} Demander un devis</a>
              <a class="btn btn-secondary btn-lg" href="#/contact">Nous contacter</a>
            </div>
            <div class="call-box">
              <div class="ic">${icon('phone')}</div>
              <div><small>Appeler directement (Cameroun)</small><b>${PHONE_CM}</b></div>
            </div>
          </div>
        </div>

        <div style="margin-top:60px" class="reveal">
          <h2 style="font-size:24px">Description</h2>
          <p class="muted" style="margin:14px 0 0;font-size:16px;max-width:80ch">${p.desc}</p>
        </div>

        <div style="margin-top:46px" class="reveal">
          <h2 style="font-size:24px;margin-bottom:18px">Caractéristiques techniques</h2>
          <table class="spec-table"><tbody>
            ${Object.entries(p.specs).map(([k,v])=>`<tr><td>${k}</td><td>${v}</td></tr>`).join('')}
          </tbody></table>
        </div>

        <div style="margin-top:60px">
          ${sectionHead('À découvrir aussi','Produits similaires','',true)}
          <div class="prod-grid">${simFill.map(productCard).join('')}</div>
        </div>
      </div>
    </section>
  </div>`;
}
function bindProduct(){
  const thumbs=document.querySelectorAll('.pd-thumbs .t');
  thumbs.forEach(t=>t.addEventListener('click',()=>{thumbs.forEach(x=>x.classList.remove('on'));t.classList.add('on');}));
}

/* =========================================================
   DEVIS
   ========================================================= */
function Devis(){
  const pre=new URLSearchParams((location.hash.split('?')[1]||'')).get('p');
  return `<div class="page">
    ${crumb([{t:'Accueil',h:'#/'},{t:'Demander un devis'}])}
    <section class="section" style="padding-top:14px">
      <div class="container">
        <div class="form-wrap">
          ${sectionHead('Devis gratuit','Demander un devis','Remplissez ce formulaire, notre équipe vous répond sous 48h ouvrées.')}
          <form class="form-card reveal" id="devisForm">
            <div class="form-legend">Vos informations</div>
            <div class="frow">
              <div class="fgroup"><label>Nom complet <span class="req">*</span></label><input class="fctrl" required placeholder="Jean Mbarga"></div>
              <div class="fgroup"><label>Email <span class="req">*</span></label><input class="fctrl" type="email" required placeholder="vous@email.com"></div>
            </div>
            <div class="frow">
              <div class="fgroup"><label>Téléphone / WhatsApp</label><input class="fctrl" placeholder="+237 …"></div>
              <div class="fgroup"><label>Pays <span class="req">*</span></label>
                <select class="fctrl" required><option value="">Sélectionner…</option>${['Cameroun','Sénégal','Gabon','Côte d\'Ivoire','Congo','Tchad','RDC','Autre'].map(c=>`<option>${c}</option>`).join('')}</select></div>
            </div>
            <div class="form-legend" style="margin-top:10px">Votre besoin</div>
            <div class="fgroup"><label>Produit souhaité <span class="req">*</span></label>
              <select class="fctrl" required id="devisProduct"><option value="">Sélectionner un produit…</option>${PRODUCTS.map(p=>`<option value="${p.id}" ${p.id===pre?'selected':''}>${p.name} — ${p.cat}</option>`).join('')}</select></div>
            <div class="frow">
              <div class="fgroup"><label>Quantité</label><input class="fctrl" type="number" min="1" value="1"> </div>
              <div class="fgroup"><label>Destination / port</label><input class="fctrl" placeholder="Douala, Cameroun"></div>
            </div>
            <div class="fgroup"><label>Message</label><textarea class="fctrl" placeholder="Précisez vos besoins, délais, options souhaitées…"></textarea></div>
            <div style="display:flex;justify-content:flex-end"><button type="submit" class="btn btn-cta btn-lg">${icon('send')} Envoyer ma demande</button></div>
            <div class="form-note">${icon('info')}<span>Vous recevrez une confirmation par email. Notre équipe vous contacte sous <b>48h ouvrées</b>.</span></div>
          </form>
        </div>
      </div>
    </section>
  </div>`;
}

/* =========================================================
   CONTACT
   ========================================================= */
function Contact(){
  return `<div class="page">
    ${crumb([{t:'Accueil',h:'#/'},{t:'Contact'}])}
    <section class="section" style="padding-top:14px">
      <div class="container">
        ${sectionHead('Contact','Parlons de votre projet','Nos équipes au Cameroun et en Chine sont à votre écoute.')}
        <div class="contact-grid">
          <div class="contact-info reveal">
            <div class="ci"><div class="ic">${icon('phone')}</div><div><h4>Téléphone Cameroun</h4><p>${PHONE_CM}</p></div></div>
            <div class="ci"><div class="ic">${icon('phone')}</div><div><h4>Téléphone Chine</h4><p>${PHONE_CN}</p></div></div>
            <div class="ci"><div class="ic">${icon('mail')}</div><div><h4>Email</h4><p>${EMAIL}</p></div></div>
            <div class="ci"><div class="ic">${icon('pin')}</div><div><h4>Adresse (Chine)</h4><p>N° 411, Zone A, 4e étage, Ville de vêtements de Wufu,<br>N° 499-523 Avenue Sanyuanli, District de Yuexiu,<br>Guangzhou, Guangdong, Chine</p></div></div>
            <div class="ci"><div class="ic" style="background:#1faf54;color:#fff">${icon('wa')}</div><div><h4>WhatsApp</h4><p>Échangez avec nous instantanément.<br><a class="btn btn-sm" style="margin-top:8px;background:#1faf54;color:#fff" href="https://wa.me/237694945547" target="_blank">${icon('wa')} Ouvrir WhatsApp</a></p></div></div>
            <div class="map-embed">${ph('Autres machines',true,'Guangzhou · Chine')}<div style="position:absolute;inset:0;display:grid;place-items:center;z-index:2;color:var(--blue)">${icon('pin')}</div></div>
          </div>
          <form class="form-card reveal" id="contactForm">
            <div class="form-legend">Envoyez-nous un message</div>
            <div class="frow">
              <div class="fgroup"><label>Nom <span class="req">*</span></label><input class="fctrl" required></div>
              <div class="fgroup"><label>Email <span class="req">*</span></label><input class="fctrl" type="email" required></div>
            </div>
            <div class="fgroup"><label>Sujet</label><input class="fctrl" placeholder="Demande d'information"></div>
            <div class="fgroup"><label>Message <span class="req">*</span></label><textarea class="fctrl" required></textarea></div>
            <div style="display:flex;justify-content:flex-end"><button type="submit" class="btn btn-cta btn-lg">${icon('send')} Envoyer</button></div>
          </form>
        </div>
      </div>
    </section>
  </div>`;
}

/* =========================================================
   À PROPOS
   ========================================================= */
function About(){
  const values=[
    {ic:'shield',t:'Confiance',d:'Transparence totale sur les prix, la qualité et la logistique. Pas de mauvaise surprise.'},
    {ic:'award',t:'Qualité',d:'Chaque engin est inspecté en Chine avant expédition pour garantir sa conformité.'},
    {ic:'globe',t:'Proximité',d:'Une présence physique au Cameroun et en Chine pour un accompagnement réel.'},
  ];
  return `<div class="page">
    ${crumb([{t:'Accueil',h:'#/'},{t:'À propos'}])}
    <section class="section" style="padding-top:18px">
      <div class="container">
        <div class="about-hero">
          <div class="reveal">
            <span class="eyebrow">À propos</span>
            <h2 style="font-size:clamp(26px,3.4vw,40px);margin:12px 0 0">Un pont commercial entre la Chine et l'Afrique</h2>
            <p class="muted" style="font-size:16.5px;margin:18px 0 0">TOCHE &amp; FILS International Trade Co., LTD est une société de commerce international spécialisée dans l'import/export d'engins de chantier, de machines industrielles et de véhicules lourds entre la Chine et l'Afrique, principalement le Cameroun.</p>
            <p class="muted" style="font-size:16.5px;margin:14px 0 0">Fondée et dirigée par <b style="color:var(--navy)">Franklin Kuate</b>, l'entreprise s'appuie sur une présence sur le terrain à Guangzhou pour sourcer, contrôler et expédier des machines fiables, au juste prix, vers les chantiers africains.</p>
            <div style="display:flex;gap:14px;margin-top:26px;flex-wrap:wrap">
              <a class="btn btn-cta btn-lg" href="#/catalogue">Voir le catalogue</a>
              <a class="btn btn-secondary btn-lg" href="#/contact">Rencontrer l'équipe</a>
            </div>
          </div>
          <div class="reveal"><img src="assets/img/p-howo-clean.png" alt="TOCHE &amp; FILS — Flotte" style="width:100%;border-radius:var(--r-card);aspect-ratio:4/3;object-fit:cover"></div>
        </div>

        <div style="margin-top:70px">
          ${sectionHead('Nos valeurs','Ce qui nous guide au quotidien')}
          <div class="values">
            ${values.map(v=>`<div class="value reveal"><div class="ic">${icon(v.ic)}</div><h3>${v.t}</h3><p>${v.d}</p></div>`).join('')}
          </div>
        </div>

        <div style="margin-top:70px" class="reveal">
          <div class="stats">
            <div class="stat"><b data-count="2">2</b><span>Continents reliés</span></div>
            <div class="stat"><b data-count="500">500+</b><span>Engins livrés</span></div>
            <div class="stat"><b data-count="12">12</b><span>Pays desservis</span></div>
            <div class="stat"><b data-count="5">5</b><span>Services intégrés</span></div>
          </div>
        </div>
      </div>
    </section>
  </div>`;
}

/* =========================================================
   ROUTER
   ========================================================= */
const ROUTES={
  '/':{f:Home,t:'Accueil',nav:'#/'},
  '/services':{f:Services,t:'Nos services',nav:'#/services',after:bindServices},
  '/catalogue':{f:Catalogue,t:'Catalogue',nav:'#/catalogue',after:bindCatalogue},
  '/devis':{f:Devis,t:'Devis',nav:'#/devis'},
  '/contact':{f:Contact,t:'Contact',nav:'#/contact'},
  '/apropos':{f:About,t:'À propos',nav:'#/apropos'},
};
function parseHash(){
  let h=location.hash.replace(/^#/,'')||'/';
  h=h.split('?')[0];
  const m=h.match(/^\/produit\/(.+)$/);
  if(m) return {key:'/produit',render:()=>Product(m[1]),nav:'#/catalogue',after:bindProduct,t:'Produit'};
  const r=ROUTES[h]||ROUTES['/'];
  return {key:h,render:r.f,nav:r.nav,after:r.after,t:r.t};
}
function setActiveNav(nav){
  document.querySelectorAll('[data-navlink]').forEach(a=>{
    a.classList.toggle('active',a.getAttribute('href')===nav);
  });
}
function render(){
  const route=parseHash();
  const root=app();
  root.innerHTML=route.render();
  document.title='TOCHE & FILS — '+route.t;
  setActiveNav(route.nav);
  closeDrawer();
  window.scrollTo({top:0,behavior:'instant'});
  if(route.after) route.after();
  revealScan();
  countUp();
  bindForms();
}

/* ---------- reveal on scroll ---------- */
let io;
function revealScan(){
  if(!io){
    io=new IntersectionObserver((ents)=>{
      ents.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
    },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  }
  document.querySelectorAll('.reveal:not(.in)').forEach((el,i)=>{el.style.transitionDelay=(Math.min(i,6)*55)+'ms';io.observe(el);});
}
/* ---------- count up ---------- */
function countUp(){
  document.querySelectorAll('[data-count]').forEach(el=>{
    if(el.__done)return;
    const obs=new IntersectionObserver((e)=>{
      if(e[0].isIntersecting){
        el.__done=true;obs.disconnect();
        const raw=el.textContent.trim();const suffix=raw.replace(/[0-9.,]/g,'');
        const target=+el.getAttribute('data-count');const dur=1100;const t0=performance.now();
        (function step(t){const k=Math.min(1,(t-t0)/dur);const v=Math.round(target*(1-Math.pow(1-k,3)));el.textContent=v+suffix;if(k<1)requestAnimationFrame(step);})(t0);
      }
    },{threshold:.6});
    obs.observe(el);
  });
}
/* ---------- forms ---------- */
function bindForms(){
  ['devisForm','contactForm'].forEach(id=>{
    const f=document.getElementById(id);
    if(f) f.addEventListener('submit',e=>{e.preventDefault();showToast(id==='devisForm'?'Demande de devis envoyée ! Réponse sous 48h.':'Message envoyé ! Nous vous répondrons vite.');f.reset();});
  });
}
function showToast(msg){
  const t=document.getElementById('toast');
  t.querySelector('span').textContent=msg;
  t.classList.add('show');
  clearTimeout(t.__tm);t.__tm=setTimeout(()=>t.classList.remove('show'),3600);
}

/* ---------- drawer ---------- */
function openDrawer(){document.getElementById('drawer').classList.add('open');document.getElementById('drawerBackdrop').classList.add('open');}
function closeDrawer(){const d=document.getElementById('drawer');if(d)d.classList.remove('open');const b=document.getElementById('drawerBackdrop');if(b)b.classList.remove('open');}

/* ---------- header scroll ---------- */
function onScroll(){const h=document.getElementById('siteHeader');if(h)h.classList.toggle('scrolled',window.scrollY>10);}

/* ---------- boot ---------- */
window.__icon_raw=(n)=>{const I=window.__ICONS||{};return I[n]||'';};
window.addEventListener('hashchange',render);
window.addEventListener('scroll',onScroll,{passive:true});
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('burger').addEventListener('click',openDrawer);
  document.getElementById('drawerClose').addEventListener('click',closeDrawer);
  document.getElementById('drawerBackdrop').addEventListener('click',closeDrawer);
  // sync both lang switchers
  function syncLang(lang){
    ['#langSwitch','#langSwitchMobile'].forEach(sel=>{
      document.querySelectorAll(sel+' button').forEach(b=>{
        b.classList.toggle('on', b.dataset.lang===lang);
      });
    });
    localStorage.setItem('tf_lang', lang);
  }
  ['#langSwitch','#langSwitchMobile'].forEach(sel=>{
    document.querySelectorAll(sel+' button').forEach(b=>b.addEventListener('click',()=>syncLang(b.dataset.lang)));
  });
  const savedLang=localStorage.getItem('tf_lang')||'fr';
  syncLang(savedLang);
  // apply saved variant
  const v=localStorage.getItem('tf_variant');if(v)document.documentElement.dataset.variant=v;
  render();onScroll();
});
})();
